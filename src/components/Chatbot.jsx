import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  AlertCircle,
  Bot,
  MessageCircle,
  Minimize2,
  Send,
  User,
  X,
} from 'lucide-react';

import openRouterService from '../services/openrouter';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setIsMinimized(false);

        // Add welcome message when opening chat for the first time
        if (!isOpen && messages.length === 0) {
            setTimeout(() => {
                const welcomeMessage = {
                    id: Date.now(),
                    text: "Xin chào! Tôi là trợ lý AI của PhysicsLab. Tôi có thể giúp bạn tìm hiểu về các mô phỏng vật lý, giải thích các hiện tượng vũ trụ, hoặc trả lời câu hỏi về vật lý. Bạn cần hỗ trợ gì?",
                    sender: 'bot',
                    timestamp: new Date(),
                    isWelcome: true
                };
                setMessages([welcomeMessage]);
            }, 500);
        }
    };

    const minimizeChat = () => {
        setIsMinimized(!isMinimized);
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputMessage;
        setInputMessage('');
        setIsTyping(true);

        try {
            // Get conversation history for context, excluding welcome messages
            const conversationHistory = messages
                .filter(msg => !msg.isWelcome) // Exclude welcome messages
                .slice(-10); // Last 10 messages for context
            conversationHistory.push(userMessage);

            // Call OpenRouter API
            const botResponse = await openRouterService.sendMessage(
                conversationHistory,
                openRouterService.getSystemPrompt()
            );

            const botMessage = {
                id: Date.now() + 1,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Chatbot error:', error);

            // Fallback to local response if API fails
            const fallbackResponse = generateBotResponse(currentInput);
            const errorMessage = {
                id: Date.now() + 1,
                text: "⚠️ Có lỗi kết nối với AI. Đang sử dụng chế độ offline.\n\n" + fallbackResponse,
                sender: 'bot',
                timestamp: new Date(),
                isError: true
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const generateBotResponse = (userInput) => {
        const input = userInput.toLowerCase();

        if (input.includes('lỗ đen') || input.includes('black hole')) {
            return "Lỗ đen là những vùng trong không gian có lực hấp dẫn cực mạnh, thậm chí ánh sáng cũng không thể thoát ra. Trong PhysicsLab, bạn có thể khám phá mô phỏng 'Môi Trường Xung Quanh Lỗ Đen Không Quay' để hiểu rõ hơn về cấu trúc và tác động của chúng lên không-thời gian xung quanh.";
        }

        if (input.includes('mặt trời') || input.includes('sun')) {
            return "Mặt Trời là ngôi sao gần Trái Đất nhất, có cấu trúc phức tạp với nhiều lớp khác nhau từ lõi đến vành nhật hoa. Bạn có thể khám phá mô phỏng 'Cấu Trúc Mặt Trời' để tìm hiểu về các lớp như lõi, vùng bức xạ, vùng đối lưu và khí quyển Mặt Trời.";
        }

        if (input.includes('agn') || input.includes('galactic') || input.includes('hạt nhân galactic')) {
            return "AGN (Active Galactic Nucleus) là hạt nhân galactic hoạt động - những vùng trung tâm của thiên hà có hoạt động năng lượng cực cao. Chúng thường chứa lỗ đen siêu khối lượng và phát ra năng lượng khổng lồ. Hãy xem mô phỏng 'Cấu Trúc Hạt Nhân Galactic Hoạt Động' để hiểu rõ hơn.";
        }

        if (input.includes('vật lý') || input.includes('physics')) {
            return "Vật lý là khoa học nghiên cứu về vật chất, năng lượng và sự tương tác giữa chúng. PhysicsLab cung cấp các mô phỏng 3D giúp bạn hiểu trực quan các khái niệm từ cơ học cổ điển đến thiên văn học hiện đại.";
        }

        if (input.includes('mô phỏng') || input.includes('simulation')) {
            return "PhysicsLab hiện có 3 mô phỏng chính: Cấu trúc Mặt Trời, Hạt nhân Galactic hoạt động (AGN), và Môi trường xung quanh Lỗ đen. Mỗi mô phỏng đều tương tác 3D, cho phép bạn xoay, phóng to và khám phá từ nhiều góc độ khác nhau.";
        }

        if (input.includes('cách sử dụng') || input.includes('hướng dẫn')) {
            return "Để sử dụng PhysicsLab: 1) Vào trang 'Mô Phỏng' từ menu, 2) Chọn một mô phỏng từ danh sách bên trái, 3) Sử dụng chuột để xoay, phóng to/nhỏ mô hình 3D, 4) Đọc thông tin mô tả để hiểu rõ hơn về hiện tượng.";
        }

        // Default responses
        const defaultResponses = [
            "Đó là một câu hỏi thú vị về vật lý! Bạn có thể khám phá các mô phỏng 3D của chúng tôi để tìm hiểu thêm.",
            "Tôi khuyến khích bạn thử các mô phỏng tương tác để hiểu rõ hơn về chủ đề này.",
            "PhysicsLab có nhiều tài nguyên để giúp bạn khám phá thế giới vật lý. Hãy thử trang 'Khám Phá' hoặc 'Mô Phỏng'!",
            "Bạn có thể đặt câu hỏi cụ thể hơn về lỗ đen, mặt trời, hoặc các hiện tượng vật lý khác không?"
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };

    return (
        <>
            {/* Chat Icon */}
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-primary-600/30 transition-all duration-300 transform hover:scale-110 z-50 group"
                >
                    <MessageCircle className="w-6 h-6" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[500px]'
                    }`}>
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">PhysicsLab AI</h3>
                                <p className="text-xs text-blue-100">Trợ lý vật lý thông minh</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={minimizeChat}
                                className="p-1 hover:bg-white/20 rounded transition-colors"
                            >
                                <Minimize2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={toggleChat}
                                className="p-1 hover:bg-white/20 rounded transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            {/* Messages */}
                            <div className="flex-1 p-4 overflow-y-auto h-80 space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                            }`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user'
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {message.sender === 'user' ?
                                                    <User className="w-4 h-4" /> :
                                                    <Bot className="w-4 h-4" />
                                                }
                                            </div>
                                            <div className={`rounded-2xl p-3 ${message.sender === 'user'
                                                ? 'bg-primary-600 text-white rounded-br-md'
                                                : message.isError
                                                    ? 'bg-red-50 text-red-800 rounded-bl-md border border-red-200'
                                                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                                                }`}>
                                                {message.isError && (
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                                        <span className="text-xs font-medium text-red-600">Chế độ offline</span>
                                                    </div>
                                                )}
                                                <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                                                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' :
                                                    message.isError ? 'text-red-500' : 'text-gray-500'
                                                    }`}>
                                                    {formatTime(message.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="flex items-start gap-2">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                <Bot className="w-4 h-4 text-gray-600" />
                                            </div>
                                            <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-gray-200">
                                <div className="flex gap-2">
                                    <textarea
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Hỏi về vật lý, vũ trụ, hoặc mô phỏng..."
                                        className="flex-1 resize-none border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                        rows="1"
                                        style={{ minHeight: '40px', maxHeight: '100px' }}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!inputMessage.trim() || isTyping}
                                        className="bg-primary-600 text-white p-2 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Chatbot;
