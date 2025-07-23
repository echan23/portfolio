import { createOpenAI, openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "./prompt";

export const maxDuration = 30;

function errorHandler(error: unknown) {
  if (error == null) {
    return "Unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
const client = createOpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log("[CHAT-API] Incoming messages:", messages);

    messages.unshift(SYSTEM_PROMPT);

    const tools = {};

    const result = streamText({
      model: client("gpt-4o-mini"),
      messages,
      toolCallStreaming: true,
      tools,
      maxSteps: 2,
    });

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (err) {
    console.error("Global error:", err);
    const errorMessage = errorHandler(err);
    return new Response(errorMessage, { status: 500 });
  }
}
