import { ActionFunctionArgs } from "@remix-run/node";
import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";

const ollama = createOllama({});
const ollamaModel = ollama("llama3.2");

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json();
  const textStream = streamText({
    model: ollamaModel,
    messages: data.messages,
  });
  return textStream.toDataStreamResponse();
}
