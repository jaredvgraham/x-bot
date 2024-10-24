import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { NextRequest, NextResponse } from "next/server";
import { fetchTrendingTopics } from "@/services/scrape";

export async function GET(req: NextRequest) {
  try {
    const trends = await fetchTrendingTopics();
    console.log("Trends:", trends);
    return NextResponse.json({ status: 200, trends });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error getting trends" });
  }
}
