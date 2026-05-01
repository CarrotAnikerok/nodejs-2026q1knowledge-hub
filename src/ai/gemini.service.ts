import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class GeminiService {
  async sendPrompt(prompt: string, systemInstruction: string, retryCount = 0) {
    const MAX_RETRIES = 3;

    try {
      const response = await this.fetchAiRequest(systemInstruction);

      if (
        response.status === HttpStatus.TOO_MANY_REQUESTS ||
        response.status === HttpStatus.SERVICE_UNAVAILABLE
      ) {
        if (retryCount < MAX_RETRIES) {
          const delay = Math.pow(2, retryCount) * 1000;
          await new Promise((res) => setTimeout(res, delay));
          return this.sendPrompt(prompt, systemInstruction, retryCount + 1);
        }
        throw new HttpException(
          'Service Overloaded',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      const data = await response.json();

      if (response.status === 400 || response.status === 403) {
        throw new HttpException(
          data.error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (data.error) {
        throw new HttpException(
          data.error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Service Unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async fetchAiRequest(systemInstruction) {
    const apiKey = process.env.GEMINI_API_KEY;
    const host =
      process.env.GEMINI_API_BASE_URL ||
      'https://generativelanguage.googleapis.com';
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';

    return fetch(
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
          generationConfig: {
            response_mime_type: 'application/json',
          },
        }),
      },
    );
  }
}
