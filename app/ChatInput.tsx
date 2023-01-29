"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { v4 as uuid } from 'uuid';
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";

function ChatInput() {
  const [inputValue, setInputValue] = useState('');
  const { data: messages, mutate } = useSWR('/api/get_message', fetcher);
  const { data: session } = useSession();

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue || !inputValue.trim() || !session) return;

    const messageToSend = inputValue;

    setInputValue('');

    const message: Message = {
      id: uuid(),
      message: messageToSend,
      created_at: Date.now(),
      username: session.user?.name!,
      profilePic: session.user?.image || "https://links.papareact.com/jne",
      email: session.user?.email!,
    };

    const uploadMessage = async () => {
      const res = await fetch('/api/add_message', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      }).then(res => res.json());

      return [res.message, ...messages!];
    };

    await mutate(uploadMessage, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true
    });
  };

  return (
    <form
      className="flex w-full px-10 bg-white py-5 space-x-2 border-t border-gray-100 fixed bottom-0 z-50"
      onSubmit={addMessage}
    >
      <input
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600
        focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        value={inputValue}
        onChange={(e) => { setInputValue(e.target.value) }}
        placeholder="Enter message here..."
        type="text"
        disabled={!session}
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
        disabled:opacity-50 disabled:cursor-not-allowed'
        type='submit'
        disabled={!inputValue || !inputValue.trim()}
      >
        Send
      </button>
    </form>
  )
}

export default ChatInput;