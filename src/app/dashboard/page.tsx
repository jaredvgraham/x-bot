"use client";
import { useAuthFetch } from "@/hooks/privFetch";
import { Trend } from "@/types";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const authFetch = useAuthFetch();
  const [trends, setTrends] = useState<Trend[]>([]);
  const [trend, setTrend] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [styles, setStyles] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [tweet, setTweet] = useState<string>("");

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await authFetch("/trends");
        setTrends(res.trends);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTrends();
  }, []);

  const handleStyleChange = (style: string) => {
    setStyles((prevStyles) =>
      prevStyles.includes(style)
        ? prevStyles.filter((s) => s !== style)
        : [...prevStyles, style]
    );
  };

  const handlePostTweet = async () => {
    if (!tweet) {
      alert("Please enter a tweet to post.");
      return;
    }

    setLoading(true);

    try {
      const res = await authFetch("/tweets", {
        method: "POST",
        body: JSON.stringify({ tweet }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      console.log(res);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const handleGenerateTweet = async () => {
    if (!trend || !prompt || styles.length === 0) {
      alert(
        "Please enter both a trend and a reason and at least 1 style for it."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await authFetch("/tweets/create", {
        method: "POST",
        body: JSON.stringify({ trend, prompt, styles }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTweet(res.tweet);

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={handlePostTweet}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 ease-in-out"
        >
          {loading ? "Generating..." : "Post Tweet"}
        </button>
      </div>

      {/* Input for Trend and Prompt */}
      <div className="flex flex-col lg:flex-row lg:space-x-6 items-center mb-8">
        <form className="flex items-center flex-col w-full max-w-md lg:max-w-lg lg:w-1/2 mb-8 lg:mb-0">
          <label className="text-gray-800 font-semibold mr-4 mb-2 self-start">
            Trend:
          </label>
          <input
            type="text"
            value={trend}
            onChange={(e) => setTrend(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:border-blue-500"
            placeholder="Enter Trend"
          />

          <label className="text-gray-800 font-semibold mb-2 self-start">
            Why is it trending?
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:border-blue-500"
            placeholder="It's trending because..."
          />

          <label className="text-gray-800 font-semibold mb-2 self-start">
            Style:
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              "Liberal",
              "Conservative",
              "Formal",
              "Casual",
              "Neutral",
              "Professional",
              "Informative",
              "Outraged",
              "Controversial",
              "Funny",
              "Sarcastic",
              "Emotional",
              "MAGA",
              "Angry",
              "Anti-establishment",
              "Pro-establishment",
              "Conspiracy",
              "Republican",
            ].map((style) => (
              <label key={style} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={style.toLowerCase()}
                  checked={styles.includes(style.toLowerCase())}
                  onChange={() => handleStyleChange(style.toLowerCase())}
                  className="form-checkbox text-blue-600 rounded"
                />
                <span className="text-gray-800">{style}</span>
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={handleGenerateTweet}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition duration-200 ease-in-out"
          >
            {loading ? "Generating..." : "Get Tweet"}
          </button>
        </form>
        {!tweet && (
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 lg:mb-0 lg:w-1/2 text-center lg:text-left">
            Ask ChatGPT: Describe Why{" "}
            <span className="text-blue-600">{trend}</span> is trending on X
            today in 1 sentence?
          </h3>
        )}
        {tweet && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Generated Tweet Suggestions
            </h2>
            <div className="space-y-4">
              <p className="text-gray-800">{tweet}</p>
            </div>
          </div>
        )}
      </div>

      {/* Display Trending Topics */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Trending Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map((trend) => (
            <div
              key={trend.trend}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col justify-between cursor-pointer hover:bg-blue-100 transition duration-200 ease-in-out"
              onClick={() => {
                setTrend(trend.trend);
                setTweet("");
              }}
            >
              <h3 className="text-xl font-semibold text-blue-600 truncate">
                {trend.trend}
              </h3>
              <p className="text-gray-600 text-sm">
                {trend.tweetCount || "No tweet count"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Tweet Suggestions */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Generated Tweet Suggestions
        </h2>
        <div className="space-y-4">
          {tweet ? (
            <p className="text-gray-800">{tweet}</p>
          ) : (
            <p className="text-gray-600">No tweets generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
