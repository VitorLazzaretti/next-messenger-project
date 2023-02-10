import { getServerSession } from "next-auth";
import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Providers from "./providers";

async function HomePage() {
  try {
    const request = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 
    'http://localhost:3000'}/api/get_messages/`, { cache: 'no-store' });
  
    const data = await request.json();
  
    const messages: Message[] = data.messages;
    const session = await getServerSession();
  
    return (
      <main>
        <Providers session={session}>
          <MessageList initialMessages={messages} />
          <ChatInput />
        </Providers>
      </main>
    )
  } catch (error) {
   return (
    <main>
      <h1>Something went wrong</h1>
    </main>
   ) 
  }
}

export default HomePage;