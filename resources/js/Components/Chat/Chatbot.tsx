import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Halo! Ada yang bisa Kuliahku bantu hari ini? ✨', sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        
        // Add user message
        const newMessages = [...messages, { id: Date.now().toString(), text: userMsg, sender: 'user' as const }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const response = await axios.post('/chat/ask', { message: userMsg });
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: response.data.reply,
                sender: 'ai'
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: 'Maaf, terjadi kesalahan pada sistem AI.',
                sender: 'ai'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-surface border border-border shadow-2xl rounded-2xl w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-4 fade-in duration-200">
                    {/* Header */}
                    <div className="bg-accent px-4 py-3 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">✨</span>
                            <div>
                                <h3 className="font-semibold leading-tight">Ask Kuliahku</h3>
                                <p className="text-[10px] text-white/80">AI Assistant</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                                    msg.sender === 'user' 
                                    ? 'bg-accent text-white rounded-br-sm' 
                                    : 'bg-white border border-border text-text rounded-bl-sm shadow-sm'
                                }`}>
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-border">
                        <form onSubmit={handleSend} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tanya tentang jadwal atau tugasmu..."
                                className="flex-1 border-gray-300 focus:border-accent focus:ring-accent rounded-full px-4 py-2 text-sm shadow-sm bg-gray-50"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="bg-accent text-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-accent text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 group"
                >
                    <span className="text-xl group-hover:animate-spin-slow">✨</span>
                    <span className="font-semibold pr-2 overflow-hidden w-0 group-hover:w-auto opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all duration-300">
                        Ask Kuliahku
                    </span>
                </button>
            )}
        </div>
    );
}
