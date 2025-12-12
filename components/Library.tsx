
import React, { useState } from 'react';
import { LibraryContent, SharedContent } from '../types';
import { BookOpenIcon, ClockIcon, ComputerDesktopIcon, XMarkIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

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

    // Add user message
    setChatHistory(prev => [...prev, { sender: 'user', text: chatMessage }]);
    const userMsg = chatMessage;
    setChatMessage('');

    // Simulate bot response
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
      <div className="bg-pau-blue py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-4">
          <BookOpenIcon className="h-16 w-16 mx-auto mb-4 text-pau-gold" />
          <h1 className="text-4xl font-serif font-bold">{content.title}</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-2xl mx-auto">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.sections.map((section, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-4">
                 {idx === 0 ? <ClockIcon className="h-8 w-8 text-pau-blue" /> : 
                  idx === 1 ? <BookOpenIcon className="h-8 w-8 text-pau-blue" /> :
                  <ComputerDesktopIcon className="h-8 w-8 text-pau-blue" />}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-pau-light rounded-lg p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-pau-blue mb-4">Research Assistance</h2>
          <p className="text-gray-600 mb-6">Our reference librarians are available to assist with complex legal research questions.</p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <button 
              onClick={() => setActiveModal('chat')}
              className="bg-pau-blue text-white px-6 py-3 rounded font-medium hover:bg-blue-800 transition flex items-center justify-center gap-2"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              {shared.buttons.chatLibrarian}
            </button>
            <button 
              onClick={() => setActiveModal('reserve')}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded font-medium hover:bg-gray-50 transition"
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setActiveModal(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-pau-blue px-4 py-3 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Librarian Chat</h3>
                <button onClick={() => setActiveModal(null)} className="text-gray-300 hover:text-white">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="h-64 bg-gray-50 p-4 overflow-y-auto flex flex-col gap-3">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      msg.sender === 'user' ? 'bg-pau-blue text-white' : 'bg-gray-200 text-gray-800'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="bg-white p-4 border-t border-gray-200 flex gap-2">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:ring-pau-blue focus:border-pau-blue bg-white text-gray-900"
                />
                <button type="submit" className="bg-pau-blue text-white px-4 py-2 rounded-md hover:bg-blue-800">Send</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Reserve Modal */}
      {activeModal === 'reserve' && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setActiveModal(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <form onSubmit={handleReserveSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Reserve a Study Room</h3>
                    <button type="button" onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-500">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input type="time" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900">
                          <option>1 Hour</option>
                          <option>2 Hours</option>
                          <option>3 Hours</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Room Size</label>
                      <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900">
                         <option>Individual Study (1 person)</option>
                         <option>Small Group (2-4 people)</option>
                         <option>Conference Room (5-10 people)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pau-blue text-base font-medium text-white hover:bg-blue-800 sm:ml-3 sm:w-auto sm:text-sm">
                    Confirm Reservation
                  </button>
                  <button type="button" onClick={() => setActiveModal(null)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
