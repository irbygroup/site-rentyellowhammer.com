import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { createFubLead } from "@/lib/followupboss";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Only process new conversations
    if (body.event !== "conversation_created") {
      return NextResponse.json({ ok: true });
    }

    const contact = body.conversation?.meta?.sender;
    if (!contact?.email && !contact?.phone_number) {
      return NextResponse.json({ ok: true });
    }

    // Parse name
    const nameParts = (contact.name || "Chat Visitor").split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    const sql = getDb();

    // 1. Save to Neon
    await sql`
      INSERT INTO leads (
        first_name, last_name, email, phone, venue, event_type, source_page
      ) VALUES (
        ${firstName}, ${lastName}, ${contact.email || null},
        ${contact.phone_number || null}, 'unknown', 'chat', 'chatwoot'
      )
    `;

    // 2. Create FUB lead
    try {
      await createFubLead({
        firstName,
        lastName,
        email: contact.email || "",
        phone: contact.phone_number || "",
        venue: "Unknown",
        eventType: "Chat Inquiry",
        source: "RentYellowhammer.com (Chat)",
        tags: ["Website", "Chatwoot"],
      });
    } catch (fubErr) {
      console.error("[chatwoot-webhook] FUB error:", fubErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[chatwoot-webhook] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
