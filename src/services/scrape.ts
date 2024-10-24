import * as cheerio from "cheerio";
export async function fetchTrendingTopics() {
  try {
    // Fetch the page content
    const response = await fetch("https://trends24.in/united-states/");

    const html = await response.text();

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Initialize an array to store the extracted trends
    const trends = [] as any;

    // Select the list items containing the trending topics
    $("ol.trend-card__list li").each((i, elem) => {
      const trendName = $(elem).find("span.trend-name a").text();
      const tweetCount = $(elem).find("span.tweet-count").text();

      if (trendName) {
        trends.push({
          trend: trendName,
          tweetCount: tweetCount.trim(),
        });
      }
    });

    const uniqueTrends = trends.filter(
      (value: any, index: any, self: any) =>
        index === self.findIndex((t: any) => t.trend === value.trend)
    );

    // Filter to remove trends with no tweet count
    const trendsWithCounts = uniqueTrends.filter(
      (t: any) => t.tweetCount !== ""
    );

    const sortedTrends = trendsWithCounts.sort(
      (a: any, b: any) => parseInt(b.tweetCount) - parseInt(a.tweetCount)
    );

    const topTrends = sortedTrends.slice(0, 50);

    return topTrends;
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    return [];
  }
}

// Call the function to fetch trends
fetchTrendingTopics();
