import axios from "axios";

const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer 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`,
    "Content-Type": "application/json",
  },
});

export async function summarizeText(inputText: string) {
  try {
    const response = await openai.post("/chat/completions", {
      prompt: `Summarize the following text for blog: "${inputText}"`,
      model: "gpt-3.5-turbo",
      // max_tokens: 100, // Customize the max tokens as needed
    });
    console.log(response.data);
    return response.data.choices[0].text;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
