import { GoogleGenAI } from "@google/genai";
import { SupportedLanguage, ImageSize } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Translates site content dynamically using Gemini Flash.
 * Generic function to handle HomeContent, AdmissionsContent, etc.
 */
export const translateContent = async <T>(
  currentContent: T,
  targetLanguage: SupportedLanguage
): Promise<T> => {
  if (targetLanguage === 'English') {
    return currentContent;
  }

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

    Return ONLY the valid JSON. Do not wrap in markdown code blocks.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    let text = response.text;
    if (!text) throw new Error("No translation returned");
    
    // Clean markdown code blocks if present (e.g. ```json ... ```)
    text = text.trim();
    if (text.startsWith('```')) {
      text = text.replace(/^```(json)?/, '').replace(/```$/, '');
    }
    
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
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image generated");
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
};