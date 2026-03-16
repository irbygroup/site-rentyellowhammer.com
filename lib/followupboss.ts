const FUB_API_BASE =
  process.env.FUB_API_BASE_URL || "https://api.followupboss.com/v1";

function getHeaders(): HeadersInit {
  const apiKey = process.env.FUB_API_KEY!;
  const token = Buffer.from(`${apiKey}:`).toString("base64");
  return {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
    "X-System": process.env.FUB_SYSTEM_HEADER || "IRBY-GROUP-FUB-API",
    "X-System-Key": process.env.FUB_SYSTEM_KEY || "",
  };
}

async function fubRequest(
  method: string,
  path: string,
  body?: Record<string, unknown>,
): Promise<Response> {
  const url = `${FUB_API_BASE}${path}`;
  for (let attempt = 0; attempt < 5; attempt++) {
    const resp = await fetch(url, {
      method,
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (resp.status === 429) {
      const retryAfter = parseFloat(resp.headers.get("Retry-After") || "2");
      console.log(
        `[fub] rate limited, waiting ${retryAfter}s (attempt ${attempt + 1})`,
      );
      await new Promise((r) => setTimeout(r, retryAfter * 1000));
      continue;
    }

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`FUB API ${method} ${path} failed: ${resp.status} ${text}`);
    }

    return resp;
  }
  throw new Error(`FUB API ${method} ${path} failed after 5 retries`);
}

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  venue: string;
  eventType: string;
  eventDetail?: string;
  message?: string;
  source?: string;
  tags?: string[];
}

export async function createFubLead(
  lead: LeadData,
): Promise<{ personId: number | null }> {
  const venueDisplay =
    lead.venue === "courtyard"
      ? "The Courtyard on Dauphin"
      : lead.venue === "oak-fountain"
        ? "Oak & Fountain"
        : lead.venue === "hallett-irby"
          ? "The Hallett-Irby House"
          : lead.venue;

  const person: Record<string, unknown> = {
    firstName: lead.firstName,
    lastName: lead.lastName,
    emails: lead.email ? [{ value: lead.email }] : [],
    phones: lead.phone ? [{ value: lead.phone }] : [],
    tags: lead.tags || ["Website"],
    stage: "YH | Hot Lead",
    source: lead.source || "RentYellowhammer.com",
    customPrimaryVenueInterest: venueDisplay,
  };

  const eventBody = {
    source: lead.source || "RentYellowhammer.com",
    system: process.env.FUB_SYSTEM_HEADER || "IRBY-GROUP-FUB-API",
    type: "Inquiry",
    message: `${lead.eventType} inquiry for ${venueDisplay}`,
    person,
  };

  const resp = await fubRequest("POST", "/events", eventBody);
  const result = await resp.json();
  const personId =
    result.id || result.person?.id || null;

  if (personId) {
    const noteBody = [
      `[Website Inquiry]`,
      `Venue: ${venueDisplay}`,
      `Event Type: ${lead.eventType}`,
      lead.eventDetail ? `Event Detail: ${lead.eventDetail}` : "",
      lead.message ? `Message: ${lead.message}` : "",
      `Source: rentyellowhammer.com`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await fubRequest("POST", "/notes", {
        personId,
        subject: "Website Inquiry Details",
        body: noteBody,
      });
    } catch (err) {
      console.error("[fub] Failed to create note:", err);
    }
  }

  return { personId };
}
