import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Document Chat" }];
};

export default function Index() {
  return (
    <main className="mx-auto flex flex-col h-dvh max-w-screen-md items-center">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold ">Document QA</h1>
        <p>document question answering with OLlama</p>
      </header>
      <div
        id="chat-container"
        className="grow my-2 p-2 relative w-full space-y-3 rounded-md border-2 flex flex-col"
      >
        <div
          id="chat-message-container"
          className="overflow-y-auto grow basis-0 space-y-2"
        >
          {Array.from({ length: 100 }, (val, idx) => idx).map((_, index) => (
            <p key={index} id="chat-message" className="border rounded-md px-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
              aliquam animi dolorem quae vitae quaerat, incidunt reprehenderit
              sunt veritatis iste ad voluptatibus unde obcaecati velit in ipsam
              debitis quidem! Velit.
            </p>
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
