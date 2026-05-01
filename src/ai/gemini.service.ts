import { Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class GeminiService {
  async sendPrompt(prompt: string, systemInstruction: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    const host =
      process.env.GEMINI_API_BASE_URL ||
      'https://generativelanguage.googleapis.com';
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';

    const response = await fetch(
      `${host}/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    try {
      return data.candidates[0].content.parts[0].text;
    } catch {
      return data.error.message;
    }
  }
}
