import { clerkClient } from "@/lib/clerk";

export async function getTwitterOauthToken(userId: string) {
  try {
    // Fetch the user's OAuth access token for Twitter
    const res = await clerkClient.users.getUserOauthAccessToken(
      userId,
      "oauth_x"
    );
    console.log("res", res.data[0].scopes);
    console.log("res", res.data[0].scopes);
    console.log("res", res.data[0].scopes);
    console.log("res", res.data[0].scopes);
    console.log("res", res.data[0].scopes);
    console.log("res", res.data[0].scopes);
    console.log("res", res.data[0].scopes);
    console.log("res", res.data[0].scopes);
    console.log("res", res.data[0].scopes);
    console.log("res", res.data[0].scopes);
    console.log("res", res.data[0].scopes);

    return res.data[0].token;
  } catch (error) {
    console.error("Error retrieving Twitter OAuth token:", error);
  }
}
