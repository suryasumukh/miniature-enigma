import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import ChatBubble from "~/components/ui/Chat/ChatBubble";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "Document Chat" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const formData = await request.formData();
  console.log("Received ==>", formData);
  return {
    completion: "hello from Ollama" + ` at ${new Date().toISOString()}`,
  };
};

export default function Index() {
  // const queryCompletion = useActionData<typeof action>();
  const [messages, setMessages] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);

  const eomRef = useRef<HTMLDivElement | null>(null);

  const fetcher = useFetcher<typeof action>();
  const queryCompletion = fetcher.data?.completion;
  const query = fetcher.formData?.get("query");
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (queryCompletion) {
      setMessages((prev) => [...prev, queryCompletion]);
    }
  }, [queryCompletion]);

  useEffect(() => {
    if (isSubmitting) {
      formRef.current?.reset();
    }
    if (query) {
      setMessages((prev) => [...prev, query.toString()]);
    }
  }, [isSubmitting]);

  useEffect(() => {
    eomRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <main className="mx-auto flex h-dvh max-w-screen-md flex-col items-center bg-neutral-50">
      <header className="my-4 space-y-2 text-center">
        <h1 className="text-3xl font-bold">Document QA</h1>
        <p>document question answering with OLlama</p>
      </header>
      <div
        id="chat-container"
        className="flex w-full grow flex-col space-y-2 rounded-md p-2"
      >
        {/* <div
          id="chat-message-container"
          className="grow basis-0 space-y-4 overflow-y-auto"
        >
          {Array.from({ length: 100 }, (val, idx) => idx).map((_, index) => (
            <ChatBubble
              key={index}
              message={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae adipisci numquam consequuntur voluptate, delectus nihil. Exercitationem impedit rerum porro laudantium ea, repudiandae obcaecati tempore mollitia, autem temporibus atque adipisci esse?"
              }
            />
          ))}
        </div> */}
        <ScrollArea.Root className="grow basis-0 overflow-hidden rounded-lg">
          <ScrollArea.Viewport className="size-full">
            <div className="space-y-4" id="messages-container">
              {messages.map((message, index) => (
                <ChatBubble key={index} message={message} />
              ))}
              <div ref={eomRef}></div>
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
        <fetcher.Form method="post" ref={formRef}>
          <input
            type="text"
            id="query"
            className="w-full rounded-md border p-2"
            name="query"
            placeholder="send a query ..."
            defaultValue={""}
          ></input>
        </fetcher.Form>
      </div>
    </main>
  );
}
