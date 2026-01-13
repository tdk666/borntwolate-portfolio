import { useState, useRef, useEffect } from 'react';
import { FlaskConical, X, Send, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../../services/gemini';
import { sendOrderToArtist } from '../../services/email';
import { motion, AnimatePresence } from 'framer-motion';

export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // ... (rest of imports)

    const [lastMessageTime, setLastMessageTime] = useState<number[]>([]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        // Rate Limiting: Max 5 messages per minute
        const now = Date.now();
        const recentMessages = lastMessageTime.filter(time => now - time < 60000);
        if (recentMessages.length >= 5) {
            setMessages(prev => [...prev, { sender: 'bot', text: "⏳ Oups ! Vous parlez trop vite pour le Labo. Veuillez attendre une minute." }]);
            return;
        }
        setLastMessageTime([...recentMessages, now]);

        const userMsg = inputValue;
        setInputValue('');
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            // Format history for Gemini
            const history = messages.map(m => ({
                role: m.sender === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }]
            }));

            // @ts-expect-error - simple mapping fix
            const response = await sendMessageToGemini(userMsg, history);

            if (response.includes("<<<ORDER_ACTION>>>")) {
                try {
                    // 1. Extraction et Nettoyage du JSON (Support du Markdown)
                    let jsonPart = response.split("<<<ORDER_ACTION>>>")[1].split("<<<END_ACTION>>>")[0];
                    // Enlever les ```json éventuels
                    jsonPart = jsonPart.replace(/```json/g, "").replace(/```/g, "").trim();

                    const orderData = JSON.parse(jsonPart);
                    const cleanMessage = response.split("<<<ORDER_ACTION>>>")[0].trim();

                    console.log("🛒 Action Détectée : Commande", orderData);

                    // 2. Envoi de l'email
                    const emailResult = await sendOrderToArtist({
                        artwork_title: orderData.artwork_title || "Inconnue",
                        series_title: orderData.series_title || "Inconnue",
                        format: orderData.format || "Non spécifié",
                        price: orderData.price || "Sur devis",
                        address: orderData.address || "Non communiquée",
                        client_email: orderData.client_email || "Non communiqué",
                        client_name: orderData.client_name || "Non communiqué",
                        ai_summary: orderData.ai_summary || ""
                    });

                    // 3. Gestion de la réponse UI selon le succès RÉEL
                    const newMessages: { sender: 'bot', text: string }[] = [{ sender: 'bot', text: cleanMessage }];

                    if (emailResult.success) {
                        newMessages.push({ sender: 'bot', text: "✅ Commande transmise avec succès à l'atelier. Vous allez recevoir un email de confirmation." });
                    } else {
                        console.error("Echec EmailJS:", emailResult);
                        newMessages.push({ sender: 'bot', text: "⚠️ Erreur technique : La commande a été notée par l'IA mais l'email de confirmation n'a pas pu partir. Veuillez nous contacter via la page Contact." });
                    }

                    // Mise à jour de l'UI
                    setMessages(prev => [...prev, ...newMessages]);

                    // Fin du traitement pour ce tour
                    return;

                } catch (e) {
                    console.error("Erreur parsing commande:", e);
                    // Fallback: Affiche tout si erreur de parsing (mais sans crasher le bot)
                }
            }
            // ---------------------------------------

            // Si pas d'action spéciale, on affiche le message normal
            if (response.trim().length > 0) {
                setMessages(prev => [...prev, { sender: 'bot', text: response }]);
            }

        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            console.error("Capture d'erreur Chatbot:", err);
            // ... (error handling code remains same)
            let errorMsg = "Le processus de développement a échoué. Essayez plus tard.";

            if (err.message === 'API_KEY_MISSING') {
                errorMsg = "Configuration manquante : Clé API (VITE_GEMINI_API_KEY) introuvable dans le laboratoire.";
            } else if (err.message?.includes('429') || err.message?.includes('Quota')) {
                errorMsg = "Le Labo est surchargé (Quota dépassé). Veuillez attendre quelques instants avant de reposer votre question.";
            } else if (err.message) {
                // Temporary debugging: show the real error
                errorMsg = `Erreur technique: ${err.message}`;
            }

            setMessages(prev => [...prev, { sender: 'bot', text: errorMsg }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const renderMessageContent = (text: string) => {
        // Regex pour détecter les URLs commençant par http/https
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        // Découpe le texte
        const parts = text.split(urlRegex);

        return parts.map((part, index) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-darkroom-red underline hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()} // Empêche les conflits de clic
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <>
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-darkroom-red text-white p-4 rounded-full shadow-lg z-50 cursor-pointer border border-white/10"
                    aria-label="Ouvrir le Labo"
                >
                    <FlaskConical size={24} />
                </motion.button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-deep-black/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden select-text cursor-auto"

                        // --- AJOUTS POUR LE COPIER-COLLER ---
                        style={{ userSelect: 'text', WebkitUserSelect: 'text' }}
                        onCopy={(e) => e.stopPropagation()}
                        onCut={(e) => e.stopPropagation()}
                        onPaste={(e) => e.stopPropagation()}
                        onContextMenu={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    // ------------------------------------
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/40">
                            <div className="flex items-center gap-2">
                                <FlaskConical size={18} className="text-darkroom-red" />
                                <h3 className="font-space-mono font-bold text-off-white tracking-widest uppercase text-sm">Le Labo AI</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-silver hover:text-off-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-darkroom-red/50 scrollbar-track-transparent">
                            {messages.length === 0 && (
                                <div className="text-center mt-8 opacity-80 px-4">
                                    {/* Assure-toi que l'icône FlaskConical est bien importée de lucide-react */}
                                    <FlaskConical size={32} className="mx-auto mb-4 text-darkroom-red/80" />
                                    <p className="font-space-mono text-xs text-silver mb-4">
                                        Bienvenue dans le Labo.
                                    </p>
                                    <p className="font-inter text-[10px] text-silver/50 leading-tight border border-white/5 p-3 rounded bg-white/5 text-justify">
                                        Ce chatbot utilise une Intelligence Artificielle (Google Gemini).
                                        Vos échanges sont traités informatiquement. Ne partagez pas de données sensibles.
                                        En continuant, vous acceptez notre politique de confidentialité.
                                    </p>
                                </div>
                            )}

                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 text-sm font-inter leading-relaxed rounded-2xl ${msg.sender === 'user'
                                        ? 'bg-off-white text-deep-black rounded-tr-none'
                                        : 'bg-white/5 text-silver border border-white/5 rounded-tl-none'
                                        }`}>
                                        {renderMessageContent(msg.text)}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                                        <Loader2 size={14} className="animate-spin text-darkroom-red" />
                                        <span className="text-xs font-space-mono text-silver animate-pulse">Développement...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-white/10 bg-black/40">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Écrivez votre message..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-off-white focus:outline-none focus:border-darkroom-red transition-colors font-inter placeholder:text-silver/40"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !inputValue.trim()}
                                    className="bg-darkroom-red text-white p-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
