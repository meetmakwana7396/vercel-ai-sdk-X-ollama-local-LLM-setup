"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto space-y-6 stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {/* {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content} */}
          {m.role === "user" && (
            <div className="relative">
              <div className="rounded-full absolute -right-10 top-0 bg-green-600 size-8 flex justify-center text-black font-bold items-center text-sm">
                {" "}
                ME
              </div>
              <div className="ml-auto rounded-lg px-2 py-1 w-fit justify-start items-center flex flex-col bg-neutral-800">
                {m.content}
              </div>
            </div>
          )}

          {m.role !== "user" && (
            <div className="relative">
              <div className="rounded-full absolute -left-10 top-0 bg-purple-600 size-8 flex justify-center text-black font-bold items-center text-sm">
                AI
              </div>
              <div className="rounded-lg px-2 py-1 w-fit justify-end items-center flex flex-col bg-neutral-800">
                <Markdown>{m.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
