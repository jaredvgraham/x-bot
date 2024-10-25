import { openai } from "@/lib/chatGPT";

export const createTweet = async (
  whyTrending: string,
  trend: string,
  styles: string[]
) => {
  try {
    const prompt = `You are an X (formerly known as Twitter) influencer who thrives on creating viral, polarizing content. The trending topic is "${trend}" because "${whyTrending}". Your goal is to write a tweet that strongly resonates with one side of the political or social spectrum while provoking the opposite side. Use styles like "${styles.join(
      ", "
    )}" to sharpen your tone and ensure the tweet stirs controversy, outrage, or intense debate. If the styles are right-leaning, the tweet should challenge left-leaning ideals; if left-leaning, it should provoke those with conservative views. Focus on divisive rhetoric that highlights differences in ideology, values, or beliefs, making the tweet impossible to ignore. Ensure it invites strong reactions — whether agreement or backlash. Keep it brief, edgy, and emotionally charged, and include the hashtag #${trend
      .split(" ")
      .join(
        ""
      )} to boost visibility. **Important:** Do not wrap the tweet in quotes or add any additional context. The output should be the tweet itself, crafted to go viral and polarize the audience.`;

    const response = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        {
          role: "system",
          content:
            "You are a social media expert who knows how to craft viral tweets on X (formerly known as Twitter) by tapping into modern trends, emotions, and humor.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    if (!response.choices[0].message.content) {
      throw new Error("Failed to generate tweet from ChatGPT");
    }

    let tweet = response.choices[0].message.content;

    // Optional: Remove quotes if they exist
    if (tweet.startsWith('"') && tweet.endsWith('"')) {
      tweet = tweet.slice(1, -1);
    }

    console.log(response.usage?.total_tokens);

    return tweet;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to generate tweet from ChatGPT");
  }
};
