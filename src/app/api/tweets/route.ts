import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { xClient } from "@/lib/x";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const { tweet } = await req.json();

    const client = await xClient(userId as string);

    const tweetRes = await client.v2.tweet(tweet);

    return NextResponse.json({ status: 201, tweetRes });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 500, message: "Error tweeting" });
  }
}
