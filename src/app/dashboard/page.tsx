"use client";
import { useAuthFetch } from "@/hooks/privFetch";
import React from "react";

const Dashboard = () => {
  const authFetch = useAuthFetch();
  const handletweet = async () => {
    try {
      const tweet = await authFetch("/tweets", {
        method: "POST",
        body: JSON.stringify({ tweet: "Hello World" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("tweet", tweet);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <button
        onClick={handletweet}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        post tweet
      </button>
    </div>
  );
};

export default Dashboard;
