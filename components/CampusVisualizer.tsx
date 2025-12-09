import React, { useState } from 'react';
import { ImageSize } from '../types';
import { generateArchitecturalImage } from '../services/geminiService';
import { PhotoIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export const CampusVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>(ImageSize.Size_1K);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Calling the service which uses gemini-3-pro-image-preview
      const base64Image = await generateArchitecturalImage(
        `Architectural rendering of Pacific American University Law School, California style. ${prompt}`,
        size
      );
      setGeneratedImage(base64Image);
    } catch (err) {
      setError("Failed to generate visualization. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="campus-viz" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-pau-blue">
            Future Campus Concepts
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Experience our vision for the future. Use our AI-powered architect tool (Powered by Nano Banana Pro) to visualize proposed expansions to our California campus.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 flex flex-col lg:flex-row">
          {/* Controls */}
          <div className="p-8 lg:w-1/3 bg-white border-r border-gray-100">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision Prompt
                </label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-pau-blue focus:border-pau-blue"
                  placeholder="e.g., A modern law library with glass walls overlooking the Pacific Ocean at sunset..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Render Resolution
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as ImageSize)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-pau-blue focus:border-pau-blue bg-white"
                >
                  <option value={ImageSize.Size_1K}>1K (Standard)</option>
                  <option value={ImageSize.Size_2K}>2K (High Def)</option>
                  <option value={ImageSize.Size_4K}>4K (Ultra HD)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">High resolutions may take longer to process.</p>
              </div>

              <button
                type="submit"
                disabled={isGenerating || !prompt}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isGenerating || !prompt ? 'bg-gray-400 cursor-not-allowed' : 'bg-pau-blue hover:bg-blue-800'
                } transition-colors`}
              >
                {isGenerating ? (
                  <>
                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Rendering...
                  </>
                ) : (
                  <>
                    <PhotoIcon className="-ml-1 mr-2 h-5 w-5" />
                    Generate Concept
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md text-sm border border-red-200">
                {error}
              </div>
            )}
          </div>

          {/* Display Area */}
          <div className="lg:w-2/3 bg-gray-900 min-h-[400px] flex items-center justify-center relative">
            {generatedImage ? (
              <div className="relative w-full h-full">
                <img 
                  src={generatedImage} 
                  alt="Generated Concept" 
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  Generated by Gemini 3 Pro
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 p-8">
                 {isGenerating ? (
                   <div className="flex flex-col items-center">
                     <div className="animate-pulse bg-gray-700 h-64 w-96 rounded-lg mb-4"></div>
                     <p>Designing your vision...</p>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center">
                     <PhotoIcon className="h-24 w-24 text-gray-700 mb-4 opacity-50" />
                     <p className="text-lg">Enter a prompt to visualize the campus.</p>
                   </div>
                 )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};