import { getServerSession } from "next-auth";
import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Providers from "./providers";

async function HomePage() {
  const data = await fetch(`/api/get_messages/`).then((res) => res.json()).catch(() => {});

  const messages: Message[] = data?.messages;
  const session = await getServerSession();

  return (
    <main>
      <Providers session={session}>
        <MessageList initialMessages={messages} />
        <ChatInput />
      </Providers>
    </main>
  )
}

export default HomePage;