// src/components/Forum.tsx
import React, { useState, useEffect } from 'react';

interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: string;
  replies?: Message[];
  parentId?: number;
}

const Forum: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const username = userData.fullName || `User${Math.floor(Math.random() * 1000)}`;

  useEffect(() => {
    // Initialize with some sample messages
    const initialMessages: Message[] = [
      {
        id: 1,
        user: 'User123',
        content: 'Welcome to the HerSpace Community Forum!',
        timestamp: new Date().toLocaleString(),
        replies: []
      }
    ];
    setMessages(initialMessages);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + messages.flatMap(m => m.replies || []).length + 1,
      user: username,
      content: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    if (replyingTo) {
      // Add as a reply
      setMessages(prevMessages =>
        prevMessages.map(msg => {
          if (msg.id === replyingTo) {
            return {
              ...msg,
              replies: [...(msg.replies || []), { ...message, parentId: replyingTo }]
            };
          }
          return msg;
        })
      );
    } else {
      // Add as new message
      setMessages([...messages, { ...message, replies: [] }]);
    }

    setNewMessage('');
    setReplyingTo(null);
  };

  const renderMessage = (message: Message, depth = 0) => (
    <div 
      key={message.id} 
      className={`bg-gray-50 rounded-md p-4 mb-4 border border-gray-200 ${depth > 0 ? 'ml-8' : ''}`}
    >
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-800">{message.user}</span>
        <span className="text-sm text-gray-500">{message.timestamp}</span>
      </div>
      <div className="text-gray-700 leading-relaxed">{message.content}</div>
      <button
        onClick={() => setReplyingTo(message.id)}
        className="text-sm text-blue-600 hover:underline mt-2"
      >
        Reply
      </button>
      {message.replies && message.replies.length > 0 && (
        <div className="mt-4">
          {message.replies.map(reply => renderMessage(reply, depth + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
      <header className="bg-gray-700 text-white p-4 text-center">
        <h1 className="text-xl font-semibold">HerSpace Community Forum</h1>
      </header>

      <div className="p-4 max-h-[500px] overflow-y-auto">
        {messages.map(message => renderMessage(message))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          {replyingTo && (
            <div className="text-sm text-gray-600 mb-2">
              Replying to message #{replyingTo}
              <button
                onClick={() => setReplyingTo(null)}
                className="ml-2 text-blue-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          )}
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={replyingTo ? "Type your reply..." : "Type your message here..."}
            className="w-full p-2 border border-gray-300 rounded-md min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Posting as: {username}</span>
            <button 
              type="submit"
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-semibold"
            >
              {replyingTo ? 'Send Reply' : 'Send'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forum;