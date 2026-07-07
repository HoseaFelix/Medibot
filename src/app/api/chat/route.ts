import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { medibotSystemPrompt } from "@/lib/medibot";

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("Missing GROQ_API_KEY. Add it to your .env.local file.");
    }

    const { messages }: { messages: UIMessage[] } = await request.json();
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      system: medibotSystemPrompt,
      messages: modelMessages,
      temperature: 0.4,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process chat request.";

    return Response.json({ error: message }, { status: 500 });
  }
}
