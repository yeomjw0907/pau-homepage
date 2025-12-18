import { GoogleGenAI } from "@google/genai";
import { SupportedLanguage, ImageSize } from "../types";

/**
 * Translates site content dynamically using Gemini 3 Flash.
 * Generic function to handle HomeContent, AdmissionsContent, etc.
 */
export const translateContent = async <T>(
  currentContent: T,
  targetLanguage: SupportedLanguage
): Promise<T> => {
  if (targetLanguage === 'English') {
    return currentContent;
  }

  // Always create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are a professional translator for the Pacific American University (PAU) Law School website.
    Translate the values in the following JSON object into ${targetLanguage}.
    
    Guidelines:
    1. Maintain the academic, prestigious, and welcoming tone.
    2. "Juris Doctor", "LLM", and proper nouns (like "Silicon Valley") should be adapted appropriately for the target language or kept if standard.
    3. Do NOT change the structure of the keys or the structure of the JSON.
    4. Only translate the string values.
    
    Content to translate:
    ${JSON.stringify(currentContent)}

    Return ONLY the valid JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No translation returned");
    
    return JSON.parse(text) as T;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};

/**
 * Generates an architectural image using Gemini 3 Pro Image Preview.
 */
export const generateArchitecturalImage = async (
  prompt: string,
  size: ImageSize
): Promise<string> => {
  // Always create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: '16:9'
        }
      }
    });

    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        // Find the image part, do not assume it is the first part.
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }
    
    throw new Error("No image generated");
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
};
