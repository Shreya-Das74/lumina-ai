import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, ResponseSchema, SchemaType } from "@google/generative-ai";

import { validatePayload } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body
    const parseResult = validatePayload(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { prospectName, company, context } = parseResult.data;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable is not set." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // --- GOOGLE SERVICES: Advanced Structured Outputs ---
    // We explicitly define the expected schema so Gemini returns flawless JSON.
    const emailOptionsSchema: ResponseSchema = {
      type: SchemaType.OBJECT,
      properties: {
        options: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              angle: { 
                type: SchemaType.STRING, 
                description: "The core angle or theme of the email (e.g., Congratulate, Pain Point)." 
              },
              subject: { 
                type: SchemaType.STRING, 
                description: "A short, catchy, non-spammy subject line." 
              },
              body: { 
                type: SchemaType.STRING, 
                description: "The email body. Max 75 words. 6th grade reading level." 
              },
              citation: { 
                type: SchemaType.STRING, 
                description: "A short sentence explaining what specific piece of context was used to generate this angle." 
              },
            },
            required: ["angle", "subject", "body", "citation"],
          },
        },
      },
      required: ["options"],
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: `You are Lumina, an elite, highly-empathetic B2B Enterprise Account Executive. 
Your goal is to write cold outreach emails that are strictly non-spammy, hyper-personalized, and insightful. 
Rules:
1. Max length: 75 words per email.
2. Tone: Professional, peer-to-peer, empathetic. No buzzwords. Lower the reading grade level to 6th grade for clarity.
3. You must use the provided context to find a specific "Why Now" trigger.
4. Do NOT use fake variables like {{First_Name}}. Use the actual names.
5. Create exactly 3 distinct angles/options for the outreach email.`,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: emailOptionsSchema,
        maxOutputTokens: 1000, // EFFICIENCY: Limit tokens for faster response
      }
    });

    const prompt = `Prospect Name: ${prospectName}\nProspect Company: ${company}\nUnstructured Context (LinkedIn/Podcasts/News):\n${context}\n\nDraft the 3 email options.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Because we used responseSchema and responseMimeType, we know `text` is valid JSON.
    const parsedData = JSON.parse(text);

    return NextResponse.json(parsedData);
  } catch (error: unknown) {
    console.error("Lumina Generation Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
