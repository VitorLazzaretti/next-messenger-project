import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true
});

export const clientPusher = new ClientPusher(process.env.NEXT_PUBLIC_PUSHER_CLIENT_ID!, {
  cluster: 'us2',
  forceTLS: true
});
