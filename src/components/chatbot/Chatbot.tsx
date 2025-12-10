import { useState } from 'react';
import { FlaskConical, X } from 'lucide-react';

export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);

    const handleSendMessage = () => {
        // Mock response
        setMessages([
            ...messages,
            { sender: 'user', text: "J'ai une question !" },
            { sender: 'bot', text: 'Je suis en développement dans le révélateur...' }
        ]);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-darkroom-red text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50 cursor-pointer"
                aria-label="Ouvrir le chatbot"
            >
                <FlaskConical size={28} />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-deep-black border border-gray-700 rounded-lg shadow-xl flex flex-col z-50">
            <div className="flex justify-between items-center p-3 border-b border-gray-700">
                <h3 className="font-bold text-white">Le Labo</h3>
                <button onClick={() => setIsOpen(false)} aria-label="Fermer le chatbot" className="cursor-pointer">
                    <X size={20} className="text-gray-400 hover:text-white" />
                </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto text-sm text-white">
                {/* Messages */}
                <p className="bg-gray-800 p-2 rounded-lg mb-2 w-fit">Bonjour ! Posez-moi une question sur la photo argentique.</p>
                {messages.map((msg, index) => (
                    <p key={index} className={`p-2 rounded-lg mb-2 w-fit ${msg.sender === 'bot' ? 'bg-gray-800' : 'bg-darkroom-red ml-auto'}`}>
                        {msg.text}
                    </p>
                ))}
            </div>
            <div className="p-2 border-t border-gray-700">
                <button onClick={handleSendMessage} className="w-full bg-darkroom-red text-white p-2 rounded text-sm hover:bg-red-900 transition-colors cursor-pointer">
                    Poser une question (mock)
                </button>
            </div>
        </div>
    );
};
