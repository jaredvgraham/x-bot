import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { createTweet } from "@/services/makeTweet";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const { prompt, styles, trend } = await req.json();
    if (!prompt || !styles || !trend) {
      return NextResponse.json({
        status: 400,
        message: "Prompt, styles, and trend are required",
      });
    }

    const tweet = await createTweet(prompt, trend, styles);
    console.log("tweet", tweet);

    return NextResponse.json({ status: 201, tweet });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 500, message: "Error tweeting" });
  }
}
