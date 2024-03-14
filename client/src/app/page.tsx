"use client";
import Input from "@/components/input";
import "@/styles/home.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      router.push("/chat");
    }
  }, []);

  const handleClick = () => {
    if (username.trim() === "") return;
    sessionStorage.setItem("username", username.trim());
    router.push("/chat");
  };

  return (
    <main className="main__container">
      <div className="main__body">
        <h3>Welcome to Chat App</h3>
        <p>Enter a Username to continue</p>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username..."
        />
        <button className="continue-button" onClick={handleClick}>
          Continue
        </button>
      </div>
    </main>
  );
}
