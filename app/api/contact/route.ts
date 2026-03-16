import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { sendNotificationEmail } from "@/lib/sendgrid";
import { createFubLead } from "@/lib/followupboss";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      venue,
      eventType,
      eventDetail,
      message,
      turnstileToken,
      sourcePage,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !venue || !eventType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Verify Turnstile token
    if (turnstileToken) {
      const valid = await verifyTurnstileToken(turnstileToken);
      if (!valid) {
        return NextResponse.json(
          { error: "Spam check failed. Please try again." },
          { status: 422 },
        );
      }
    }

    const sql = getDb();

    // Get client info
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      null;
    const userAgent = request.headers.get("user-agent") || null;

    // 1. INSERT into Neon DB (hard failure if this fails)
    const result = await sql`
      INSERT INTO leads (
        first_name, last_name, email, phone, venue, event_type,
        event_detail, message, source_page, utm_source, utm_medium,
        utm_campaign, ip_address, user_agent
      ) VALUES (
        ${firstName}, ${lastName}, ${email}, ${phone || null}, ${venue},
        ${eventType}, ${eventDetail || null}, ${message || null},
        ${sourcePage || null}, ${utmSource || null}, ${utmMedium || null},
        ${utmCampaign || null}, ${ip}, ${userAgent}
      ) RETURNING id
    `;

    const leadId = result[0]?.id;

    // 2. Send email via SendGrid (catch errors, don't fail request)
    try {
      await sendNotificationEmail({
        firstName,
        lastName,
        email,
        phone: phone || "",
        venue,
        eventType,
        eventDetail,
        message,
      });

      if (leadId) {
        await sql`
          UPDATE leads SET email_sent = true, email_sent_at = NOW()
          WHERE id = ${leadId}
        `;
      }
    } catch (emailErr) {
      console.error("[contact] SendGrid error:", emailErr);
    }

    // 3. Create FUB lead (catch errors, log to fub_error column)
    try {
      const fubResult = await createFubLead({
        firstName,
        lastName,
        email,
        phone: phone || "",
        venue,
        eventType,
        eventDetail,
        message,
      });

      if (leadId) {
        await sql`
          UPDATE leads SET
            fub_person_id = ${fubResult.personId ? String(fubResult.personId) : null},
            fub_synced = true,
            fub_synced_at = NOW()
          WHERE id = ${leadId}
        `;
      }
    } catch (fubErr) {
      console.error("[contact] FUB error:", fubErr);
      if (leadId) {
        const errMsg =
          fubErr instanceof Error ? fubErr.message : String(fubErr);
        await sql`
          UPDATE leads SET fub_error = ${errMsg}
          WHERE id = ${leadId}
        `;
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unhandled error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
