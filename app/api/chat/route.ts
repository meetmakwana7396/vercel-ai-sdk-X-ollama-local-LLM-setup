import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";


const ollama = createOllama({
  baseURL: "http://localhost:11434/api",
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export function errorHandler(error: unknown) {
  console.log(error, "BRUH");
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: ollama("deepseek-r1:8b"),
    messages,
  });

  return result.toDataStreamResponse({
    getErrorMessage: errorHandler,
  });
}
