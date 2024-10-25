import OpenAI from "openai";
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
  baseURL: "https://api.x.ai/v1",
});
