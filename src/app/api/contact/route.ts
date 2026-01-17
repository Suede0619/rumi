import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    // TODO: Add your backend logic here
    // - Send email notification
    // - Store in database
    // - Send to external service
    console.log("Received contact form submission:", validatedData);

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully"
    });
  } catch (error) {
    console.error("Error processing contact form:", error);

    return NextResponse.json(
      { error: "Failed to process form submission" },
      { status: 400 }
    );
  }
}
