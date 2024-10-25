import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { NextRequest, NextResponse } from "next/server";
import { fetchTrendingTopics } from "@/services/scrape";
import { xClient } from "@/lib/x";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    const trends = await fetchTrendingTopics();
    console.log("Trends:", trends);

    // const client = await xClient(userId as string);

    // const tweetRes = await client.v2.search({
    //   query: trends[0],
    //   max_results: 10,
    // });

    // console.log("tweetRes", tweetRes);

    return NextResponse.json({ status: 200, trends });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error getting trends" });
  }
}
