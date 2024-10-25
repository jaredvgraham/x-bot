"use client";
import { useAuthFetch } from "@/hooks/privFetch";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const authFetch = useAuthFetch();
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await authFetch("/trends");
        console.log("trends", res.trends);
        setTrends(res.trends);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTrends();
  }, []);

  const handletweet = async () => {
    try {
      const tweet = await authFetch("/tweets", {
        method: "POST",
        body: JSON.stringify({ tweet: "Hello Worldd" }),
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
      <div>
        {trends.map((trend) => (
          <div key={trend.trend}>{trend.trend}</div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
