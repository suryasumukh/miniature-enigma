import type { MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useChat } from "@ai-sdk/react";
import { cx } from "~/utils/cx";
import {
  CircleMinus,
  MinusIcon,
  RotateCw,
  SendHorizonal,
  Trash,
} from "lucide-react";
import * as React from "react";

export const meta: MetaFunction = () => {
  return [{ title: "LLM Client" }];
};

export default function Index() {
  const {
    messages,
    input,
    status,
    handleInputChange,
    handleSubmit,
    reload,
    stop,
    setMessages,
  } = useChat();
  const eomRef = React.useRef<HTMLDivElement | null>(null);
  const fetcher = useFetcher();

  const clearMessages = () => {
    setMessages([]);
  };

  const handleResend = () => reload();
  const handleStop = () => stop();

  const isStreaming = status === "streaming";

  return (
    <main className="mx-auto flex h-dvh max-w-screen-md flex-col items-center bg-neutral-50">
      <header className="my-2 text-center">
        <h1 className="text-xl font-bold">LLM Chat Client</h1>
      </header>
      <div
        id="chat-container"
        className="flex w-full grow flex-col space-y-2 rounded-md border bg-white p-2"
      >
        <div
          id="chat-thread"
          className="flex grow basis-0 flex-col space-y-2 overflow-auto text-sm"
          ref={eomRef}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={cx("break-words rounded-md p-2 text-sm", {
                "max-w-[80%] self-end bg-neutral-100 text-right":
                  message.role === "user",
                "text-left": message.role === "assistant",
              })}
            >
              {message.content}
            </div>
          ))}
        </div>
        <p className="text-sm font-light">{status}</p>
        <fetcher.Form method="POST" onSubmit={handleSubmit}>
          <div className="relative">
            <textarea
              rows={3}
              className="relative w-full resize-none overflow-y-scroll text-wrap rounded-md border p-2 text-sm"
              id="query"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSubmit(event);
                }
              }}
            ></textarea>
            <div className="absolute bottom-2 right-0 flex w-full items-center justify-end rounded-b-md p-2">
              <button
                type="button"
                className="p-1"
                onClick={handleResend}
                disabled={isStreaming}
              >
                <RotateCw className="size-4" />
              </button>
              <button
                type="button"
                className="p-1"
                onClick={clearMessages}
                disabled={isStreaming}
              >
                <Trash className="size-4" />
              </button>
              <MinusIcon className="size-5 rotate-90" />
              <button
                type="submit"
                className={cx("p-1", {
                  hidden: isStreaming,
                })}
              >
                <SendHorizonal className="size-4" />
              </button>
              <button
                type="button"
                className={cx("p-1", {
                  hidden: !isStreaming,
                })}
                onClick={handleStop}
              >
                <CircleMinus className="size-4" />
              </button>
            </div>
          </div>
        </fetcher.Form>
      </div>
    </main>
  );
}
