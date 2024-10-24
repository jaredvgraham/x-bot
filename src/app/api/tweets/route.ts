import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { TwitterApi } from "twitter-api-v2";
import { getTwitterOauthToken } from "@/utils/token";

export async function POST(req: NextRequest) {
  try {
    const { userId, getToken } = await auth();
    const token = await getTwitterOauthToken(userId as string);

    const { tweet } = await req.json();

    const xClient = new TwitterApi(token as string);

    const tweetRes = await xClient.v2.tweet(tweet);
    console.log("tweetRes", tweetRes);

    return NextResponse.json({ status: 201, tweetRes });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 500, message: "Error tweeting" });
  }
}
