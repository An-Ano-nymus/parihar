import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { QuickQuestions } from './QuickQuestions';
import { Message } from '../types';
import { supabase } from  '../lib/supabase.ts';

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you?',
      sender: 'bot',
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
    };
    setMessages([...messages, newMessage]);

    // Fetch response from backend (if applicable)
    const { data } = await supabase.from('chatbot_responses').select('*').limit(1);
    if (data && data.length > 0) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), content: data[0].response, sender: 'bot' },
      ]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      <button 
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center" 
        onClick={() => setIsOpen(!isOpen)}>
        <MessageSquare className="text-white" />
      </button>
      {isOpen && (
        <div className="bg-white p-4 shadow-lg rounded-xl w-80 fixed bottom-16 right-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Chat with Us</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500">✖</button>
          </div>
          <div className="h-60 overflow-y-auto border p-2 mb-2">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </div>
          <QuickQuestions onSelect={sendMessage} />
          <ChatInput onSend={sendMessage} />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
