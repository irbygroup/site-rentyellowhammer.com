import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface LeadEmail {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  venue: string;
  eventType: string;
  eventDetail?: string;
  message?: string;
}

export async function sendNotificationEmail(lead: LeadEmail) {
  const venueDisplay =
    lead.venue === "courtyard"
      ? "The Courtyard on Dauphin"
      : lead.venue === "oak-fountain"
        ? "Oak & Fountain"
        : lead.venue === "hallett-irby"
          ? "The Hallett-Irby House"
          : lead.venue;

  await sgMail.send({
    to: process.env.NOTIFICATION_EMAIL || "info@rentyellowhammer.com",
    from: "noreply@rentyellowhammer.com",
    subject: `New ${lead.eventType} inquiry — ${venueDisplay}`,
    text: [
      `New inquiry from rentyellowhammer.com`,
      ``,
      `Name: ${lead.firstName} ${lead.lastName}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone}`,
      `Venue: ${venueDisplay}`,
      `Event Type: ${lead.eventType}`,
      lead.eventDetail ? `Event Detail: ${lead.eventDetail}` : "",
      ``,
      `Message:`,
      lead.message || "(no message)",
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a2e; padding: 20px; text-align: center;">
          <h1 style="color: #f9d342; margin: 0; font-size: 24px;">New Inquiry</h1>
          <p style="color: #ffffff; margin: 5px 0 0;">${venueDisplay}</p>
        </div>
        <div style="padding: 20px; background: #f5f5f5;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${lead.firstName} ${lead.lastName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Venue</td><td style="padding: 8px;">${venueDisplay}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Event Type</td><td style="padding: 8px;">${lead.eventType}</td></tr>
            ${lead.eventDetail ? `<tr><td style="padding: 8px; font-weight: bold;">Event Detail</td><td style="padding: 8px;">${lead.eventDetail}</td></tr>` : ""}
          </table>
          ${lead.message ? `<div style="margin-top: 15px; padding: 15px; background: white; border-radius: 5px;"><strong>Message:</strong><br/>${lead.message}</div>` : ""}
        </div>
        <div style="padding: 10px; text-align: center; color: #6b7280; font-size: 12px;">
          Yellowhammer Hospitality &bull; 751 Dauphin St, Mobile, AL 36602
        </div>
      </div>
    `,
  });
}
