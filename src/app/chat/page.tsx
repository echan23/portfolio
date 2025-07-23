import { Suspense } from "react";
import Chat from "@/components/Chat";

export default function ChatPage() {
  return (
    <Suspense
      fallback={<div className="text-center mt-10">Loading chat...</div>}
    >
      <Chat />
    </Suspense>
  );
}
