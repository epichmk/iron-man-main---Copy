import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, service, message } = body;

    // Validate required fields
    if (!name || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.EXTERNAL_CONTACT_WEBHOOK_URL;

    // If webhook is configured, forward the data
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            service,
            message,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          console.error("Failed to forward to webhook", await response.text());
          // We still return success to the user, as the WhatsApp message is the primary goal
          // But in a strict production environment, we might want to return an error here.
        }
      } catch (err) {
        console.error("Error communicating with webhook:", err);
      }
    } else {
      // Just log it if no webhook is configured
      console.log("Contact form submitted (no webhook configured):", {
        name,
        phone,
        service,
        message,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
