import type { MetaFunction } from "@remix-run/node";
import ChatBubble from "~/components/ui/Chat/ChatBubble";

export const meta: MetaFunction = () => {
  return [{ title: "Document Chat" }];
};

export default function Index() {
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
        <div
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
        </div>
        <textarea
          id="chat-box"
          className="w-full rounded-md border p-2"
          placeholder="send a message ..."
        ></textarea>
      </div>
    </main>
  );
}
