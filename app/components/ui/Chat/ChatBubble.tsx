import * as Avatar from "@radix-ui/react-avatar";
import OllamaSvg from "app/assets/ollama-logo.svg";
import { LoaderCircle } from "lucide-react";

const ChatBubble = ({ message }: { message: string }) => {
  return (
    <div
      id="chat-message"
      className="group/chatbubble rounded-lg bg-neutral-100 p-2"
    >
      <div className="flex items-center gap-2">
        <Avatar.Root className="inline-flex size-8 items-center justify-center overflow-hidden rounded-full bg-neutral-50 align-middle">
          <Avatar.Image
            src={OllamaSvg}
            className="size-8"
            alt="Ollama"
          ></Avatar.Image>
          <Avatar.Fallback className="">OL</Avatar.Fallback>
        </Avatar.Root>
        <p className="text-sm">Ollama</p>
      </div>
      <div className="ml-10 flex flex-col gap-1">
        <div className="flex items-center gap-1 text-sm font-light">
          <LoaderCircle className="size-4 stroke-neutral-600 transition-all group-hover/chatbubble:animate-spin" />
          <p>status message ...</p>
        </div>
        <p className="">{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
