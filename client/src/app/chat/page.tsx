"use client";
import Input from "@/components/input";
import MessageBox from "@/components/message_box";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import "@/styles/chat.scss";

interface IMessage {
  username: string;
  message: string;
  time: string;
  mine?: boolean;
}

const ws = new WebSocket(process.env.NEXT_PUBLIC_SERVER_URL || "");

export default function Chat() {
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const router = useRouter();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const sessionMessages = JSON.parse(
      sessionStorage.getItem("sessionMessages") || "[]"
    );
    if (!username) {
      router.push("/");
      return;
    }
    setUsername(username);
    setMessages(sessionMessages);
  }, []);

  ws.onmessage = (event) => {
    const parsedMessage: IMessage = JSON.parse(event.data);
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, parsedMessage];
      sessionStorage.setItem("sessionMessages", JSON.stringify(newMessages));
      return newMessages;
    });
  };

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    if (ws && ws.readyState === WebSocket.OPEN && inputMessage.trim() != "") {
      const myMessage = {
        username: username,
        message: inputMessage,
        time: new Date().toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      };
      ws.send(JSON.stringify(myMessage));
    }
    setInputMessage("");
    e.preventDefault();
  };

  const leaveChat = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("sessionMessages");
    ws.close();
    router.push("/");
  };

  return (
    <div className="chat-area__container">
      <div className="chat-area__nav">
        <h3>Chat App</h3>
        <button onClick={leaveChat} className="leave-button">
          Leave
        </button>
      </div>
      <div className="chat-area__main">
        {messages.map((message, key) => (
          <MessageBox
            key={key}
            message={message.message}
            time={message.time}
            username={message.username}
            mine={message.mine}
          />
        ))}
      </div>
      <div className="chat-area__input">
        <form onSubmit={sendMessage}>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
        </form>
      </div>
    </div>
  );
}
