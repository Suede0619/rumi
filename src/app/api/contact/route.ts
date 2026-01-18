import { NextResponse } from "next/server";
import { betaSignupSchema } from "@/lib/betaValidation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = betaSignupSchema.parse(body);

    // Send to Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Email: validatedData.email,
              },
            },
          ],
        }),
      },
    );

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json();
      console.error("Airtable error:", errorData);
      throw new Error("Failed to save to Airtable");
    }

    return NextResponse.json({
      success: true,
      message: "Successfully signed up for beta",
    });
  } catch (error) {
    console.error("Error processing signup:", error);

    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 400 },
    );
  }
}
