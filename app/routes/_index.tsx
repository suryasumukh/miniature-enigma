import type { MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useChat } from "@ai-sdk/react";
import * as React from "react";
import { cx } from "~/utils/cx";

export const meta: MetaFunction = () => {
  return [{ title: "LLM Client" }];
};

export default function Index() {
  const { messages, input, status, handleInputChange, handleSubmit } =
    useChat();
  const eomRef = React.useRef<HTMLDivElement | null>(null);
  const fetcher = useFetcher();

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
          className="flex grow basis-0 flex-col space-y-2 text-sm"
          ref={eomRef}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={cx("space-y-2 rounded-md p-2 text-sm", {
                "max-w-[80%] self-end overflow-hidden text-wrap bg-neutral-100 text-right":
                  message.role === "user",
                "text-left": message.role === "assistant",
              })}
            >
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <p className="text-sm font-light">{status}</p>
        <fetcher.Form method="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            id="query"
            className="w-full rounded-md border p-2 text-sm"
            name="query"
            placeholder="send a query ..."
            value={input}
            onChange={handleInputChange}
          ></input>
        </fetcher.Form>
      </div>
    </main>
  );
}
