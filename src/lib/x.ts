import { getTwitterOauthToken } from "@/utils/token";
import TwitterApi from "twitter-api-v2";

export const xClient = async (userId: string) => {
  const token = await getTwitterOauthToken(userId as string);

  const xClient = new TwitterApi(token as string);
  console.log("xClient", xClient);

  return xClient;
};
