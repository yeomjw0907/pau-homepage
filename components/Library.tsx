
import React, { useState } from 'react';
import { LibraryContent, SharedContent } from '../types';
import { BookOpenIcon, ClockIcon, ComputerDesktopIcon, XMarkIcon, ChatBubbleLeftRightIcon, BookmarkIcon } from '@heroicons/react/24/outline';

interface LibraryProps {
  content: LibraryContent;
  shared: SharedContent;
}

export const Library: React.FC<LibraryProps> = ({ content, shared }) => {
  const [activeModal, setActiveModal] = useState<'chat' | 'reserve' | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{sender: 'user' | 'bot', text: string}[]>([
    { sender: 'bot', text: 'Hello! I am the PAU Reference Librarian AI. How can I help you with your legal research today?' }
  ]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatHistory(prev => [...prev, { sender: 'user', text: chatMessage }]);
    const userMsg = chatMessage;
    setChatMessage('');

    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        sender: 'bot', 
        text: `That's a great question about "${userMsg}". I can certainly help you find resources on that topic. Please check our Westlaw access guide or visit the reference desk.` 
      }]);
    }, 1000);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Study room reservation confirmed! A confirmation email has been sent to your PAU address.");
    setActiveModal(null);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="relative bg-pau-darkBlue py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1507842217121-ad763adcd942?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Library shelves" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pau-darkBlue via-pau-darkBlue/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <BookOpenIcon className="h-16 w-16 mx-auto mb-6 text-pau-gold" />
          <h1 className="text-4xl font-serif font-bold text-white sm:text-6xl mb-6">{content.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.sections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl p-8 shadow-soft border border-gray-100 hover:shadow-xl hover:border-pau-gold/30 transition-all duration-300 group">
              <div className="mb-6 inline-flex p-4 rounded-lg bg-gray-50 text-pau-blue group-hover:bg-pau-blue group-hover:text-white transition-colors duration-300">
                 {idx === 0 ? <ClockIcon className="h-8 w-8" /> : 
                  idx === 1 ? <BookmarkIcon className="h-8 w-8" /> :
                  <ComputerDesktopIcon className="h-8 w-8" />}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pau-blue transition-colors">{section.title}</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-pau-light rounded-2xl p-12 text-center border border-gray-100">
          <h2 className="text-3xl font-serif font-bold text-pau-blue mb-6">Research Assistance</h2>
          <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">Our reference librarians are available to assist with complex legal research questions.</p>
          <div className="flex justify-center gap-6 flex-col sm:flex-row">
            <button 
              onClick={() => setActiveModal('chat')}
              className="bg-pau-blue text-white px-8 py-4 rounded-md font-bold hover:bg-pau-darkBlue transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              {shared.buttons.chatLibrarian}
            </button>
            <button 
              onClick={() => setActiveModal('reserve')}
              className="bg-white border border-gray-300 text-gray-700 px-8 py-4 rounded-md font-bold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
            >
              {shared.buttons.reserveRoom}
            </button>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {activeModal === 'chat' && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" onClick={() => setActiveModal(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-pau-blue px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Librarian Chat</h3>
                <button onClick={() => setActiveModal(null)} className="text-white/70 hover:text-white">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="h-80 bg-gray-50 p-6 overflow-y-auto flex flex-col gap-4">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user' ? 'bg-pau-blue text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="bg-white p-4 border-t border-gray-200 flex gap-3">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-grow border border-gray-300 rounded-lg px-4 py-3 focus:ring-pau-blue focus:border-pau-blue bg-white text-gray-900 text-sm shadow-sm"
                />
                <button type="submit" className="bg-pau-gold text-white px-6 py-2 rounded-lg font-bold hover:bg-yellow-600 transition-colors">Send</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Reserve Modal */}
      {activeModal === 'reserve' && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" onClick={() => setActiveModal(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <form onSubmit={handleReserveSubmit}>
                <div className="bg-white px-6 py-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-gray-900 font-serif">Reserve a Study Room</h3>
                    <button type="button" onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-500">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Date</label>
                      <input type="date" required className="block w-full border-gray-300 rounded-md shadow-sm p-3 bg-gray-50 text-gray-900 focus:ring-pau-blue focus:border-pau-blue sm:text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Start Time</label>
                        <input type="time" required className="block w-full border-gray-300 rounded-md shadow-sm p-3 bg-gray-50 text-gray-900 focus:ring-pau-blue focus:border-pau-blue sm:text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Duration</label>
                        <select className="block w-full border-gray-300 rounded-md shadow-sm p-3 bg-gray-50 text-gray-900 focus:ring-pau-blue focus:border-pau-blue sm:text-sm">
                          <option>1 Hour</option>
                          <option>2 Hours</option>
                          <option>3 Hours</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Room Size</label>
                      <select className="block w-full border-gray-300 rounded-md shadow-sm p-3 bg-gray-50 text-gray-900 focus:ring-pau-blue focus:border-pau-blue sm:text-sm">
                         <option>Individual Study (1 person)</option>
                         <option>Small Group (2-4 people)</option>
                         <option>Conference Room (5-10 people)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse border-t border-gray-100">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-pau-blue text-base font-medium text-white hover:bg-pau-darkBlue sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                    Confirm Reservation
                  </button>
                  <button type="button" onClick={() => setActiveModal(null)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
