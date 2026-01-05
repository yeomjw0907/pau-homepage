
import React, { useState, useEffect } from 'react';
import { ImageSize } from '../types';
import { generateArchitecturalImage } from '../services/geminiService';
import { PhotoIcon, ArrowPathIcon, BuildingOffice2Icon, KeyIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

// The global 'aistudio' object and its 'AIStudio' type are provided by the environment.
// Conflicting local declaration removed.

export const CampusVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>(ImageSize.Size_1K);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  // Check whether an API key has been selected on component mount
  useEffect(() => {
    const checkKey = async () => {
      try {
        // @ts-ignore - aistudio is injected by the environment
        const has = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(has);
      } catch (e) {
        console.error("Failed to check API key selection status", e);
      }
    };
    checkKey();
  }, []);

  // Handle opening the API key selection dialog
  const handleSelectKey = async () => {
    try {
      // @ts-ignore - aistudio is injected by the environment
      await window.aistudio.openSelectKey();
      // Assume success immediately to avoid race conditions as per coding guidelines
      setHasApiKey(true);
    } catch (e) {
      console.error("Failed to open API key selection dialog", e);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Calling the service which uses gemini-3-pro-image-preview
      const base64Image = await generateArchitecturalImage(
        `Architectural rendering of Pacific American University Law School, California style, photorealistic, cinematic lighting. ${prompt}`,
        size
      );
      setGeneratedImage(base64Image);
    } catch (err) {
      console.error("Generation failed:", err);
      // If requested entity was not found, the key might be invalid or from an unpaid project
      if (err instanceof Error && err.message?.includes("Requested entity was not found.")) {
        setHasApiKey(false);
        setError("API Key configuration error. Please re-select a valid API key from a paid GCP project.");
      } else {
        setError("Failed to generate visualization. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // If no API key is selected, show mandatory selection UI
  if (!hasApiKey) {
    return (
      <section id="campus-viz" className="bg-pau-darkBlue border-t border-white/10 py-32 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-8">
            <KeyIcon className="h-12 w-12 text-pau-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Vision 2030 Architecture Lab
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light max-w-2xl mx-auto">
            Our high-fidelity architectural tools utilize <strong>Gemini 3 Pro</strong>. To access this feature, you must select an API key from a <strong>paid Google Cloud project</strong>.
          </p>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-12 inline-block text-left max-w-lg">
             <h4 className="text-pau-gold font-bold text-xs uppercase tracking-widest mb-4">Requirements & Billing:</h4>
             <ul className="text-sm text-gray-400 space-y-3 list-disc pl-5">
               <li>User-selected API keys are mandatory for image generation models.</li>
               <li>Ensure your project has <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-pau-gold underline">billing enabled</a>.</li>
               <li>Requests using non-paid projects will result in an error.</li>
             </ul>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <button
               onClick={handleSelectKey}
               className="bg-pau-gold text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-pau-darkBlue transition-all shadow-glow transform hover:-translate-y-1"
             >
               Select Paid API Key
             </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="campus-viz" className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Controls Side */}
          <div className="md:w-1/3 flex flex-col justify-center">
             <div className="flex items-center space-x-2 mb-4">
                <span className="h-px w-8 bg-pau-gold"></span>
                <span className="text-pau-gold font-bold tracking-widest uppercase text-xs">AI Architecture Lab</span>
             </div>
             
             <h2 className="text-3xl lg:text-4xl font-serif font-bold text-pau-darkBlue mb-6">
               Campus Master Plan: Vision 2030
             </h2>
             
             <p className="text-gray-600 mb-10 leading-relaxed font-light">
               Pacific American University is constantly evolving. Use our <strong>AI-assisted architectural tool</strong> to explore future expansion concepts for the campus, from new libraries to modern moot courtrooms.
             </p>

            <form onSubmit={handleGenerate} className="space-y-6 bg-white p-8 rounded-xl shadow-soft border border-gray-100">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                  Vision Prompt
                </label>
                <textarea
                  rows={3}
                  className="w-full p-3 border-b-2 border-gray-200 bg-gray-50 focus:border-pau-blue focus:outline-none focus:bg-white transition-colors resize-none"
                  placeholder="e.g., A modern glass law library overlooking the Pacific Ocean at sunset..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                  Render Quality
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as ImageSize)}
                  className="w-full p-3 border-b-2 border-gray-200 bg-gray-50 focus:border-pau-blue focus:outline-none focus:bg-white transition-colors"
                >
                  <option value={ImageSize.Size_1K}>Standard Definition (1K)</option>
                  <option value={ImageSize.Size_2K}>High Definition (2K)</option>
                  <option value={ImageSize.Size_4K}>Ultra High Definition (4K)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isGenerating || !prompt}
                className={`w-full flex justify-center items-center py-4 px-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  isGenerating || !prompt 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-pau-darkBlue text-white hover:bg-pau-gold hover:text-pau-darkBlue shadow-lg'
                }`}
              >
                {isGenerating ? (
                  <>
                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Rendering...
                  </>
                ) : (
                  <>
                    <BuildingOffice2Icon className="-ml-1 mr-2 h-5 w-5" />
                    Generate Concept
                  </>
                )}
              </button>
              
              <button 
                type="button"
                onClick={handleSelectKey}
                className="w-full text-[10px] text-gray-400 hover:text-pau-blue uppercase tracking-widest font-bold mt-2 transition-colors"
              >
                Change API Key
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 text-xs border-l-4 border-red-500 flex items-start" role="alert">
                <ExclamationTriangleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}
            
            <p className="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-wider">
               Powered by Gemini 3 Pro • For conceptual use only
            </p>
          </div>

          {/* Display Side */}
          <div className="md:w-2/3 bg-white p-4 rounded-xl shadow-2xl border border-gray-100 flex items-center justify-center min-h-[500px] relative overflow-hidden group">
            {/* Background pattern for empty state */}
            {!generatedImage && (
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
            )}
            
            {generatedImage ? (
              <div className="relative w-full h-full flex items-center justify-center bg-gray-900 rounded-lg overflow-hidden">
                <img 
                  src={generatedImage} 
                  alt="Generated Concept" 
                  className="w-full h-full object-contain animate-fade-in"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-serif italic text-sm">"{prompt}"</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 p-8 z-10">
                 {isGenerating ? (
                   <div className="flex flex-col items-center">
                     <div className="w-16 h-16 border-4 border-pau-gold border-t-transparent rounded-full animate-spin mb-6"></div>
                     <p className="text-sm font-bold uppercase tracking-widest text-pau-darkBlue">Processing Architectural Data...</p>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center opacity-50">
                     <PhotoIcon className="h-24 w-24 mb-4 stroke-1" />
                     <p className="text-lg font-serif italic text-gray-500">Visualize the future of PAU Law</p>
                   </div>
                 )}
              </div>
            )}
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pau-gold/30 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-pau-gold/30 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-pau-gold/30 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-pau-gold/30 rounded-br-lg"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
