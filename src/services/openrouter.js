const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

class OpenRouterService {
    constructor() {
        this.apiKey = OPENROUTER_API_KEY;
        this.baseUrl = OPENROUTER_BASE_URL;
        this.model = 'nvidia/nemotron-3-ultra-550b-a55b:free';
    }

    async sendMessage(messages, systemPrompt = null) {
        if (!this.apiKey) {
            throw new Error('OpenRouter API key not configured');
        }

        const requestMessages = [];

        if (systemPrompt) {
            requestMessages.push({
                role: 'system',
                content: systemPrompt
            });
        }

        requestMessages.push(...messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
        })));

        try {
            const response = await fetch(`${this.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'PhysicsLab Chatbot'
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: requestMessages,
                    max_tokens: 500,
                    temperature: 0.7,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();

            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response format from OpenRouter API');
            }

            return data.choices[0].message.content;
        } catch (error) {
            console.error('OpenRouter API Error:', error);
            throw error;
        }
    }

    getSystemPrompt() {
        return `Bạn là trợ lý AI thông minh của PhysicsLab - một nền tảng học vật lý tương tác. Nhiệm vụ của bạn là:

1. Giúp người dùng hiểu các khái niệm vật lý phức tạp một cách đơn giản và dễ hiểu
2. Giải thích về các mô phỏng  có sẵn trong PhysicsLab:
   - Cấu Trúc Mặt Trời: Khám phá các lớp của Mặt Trời từ lõi đến vành nhật hoa
   - Lực và chuyển động (PHET): Khảo sát tác dụng của lực lên chuyển động, mối quan hệ giữa lực – khối lượng – gia tốc (Định luật Newton)
   - Lực hấp dẫn (PHET): Tìm hiểu lực hấp dẫn và chuyển động quỹ đạo của các vật
   - Sự nổi (PHET): Minh họa lực đẩy Ác-si-mét và điều kiện vật nổi, chìm, lơ lửng
3. Trả lời câu hỏi về:
   - Thiên văn học và vũ trụ học
   - Cơ học cổ điển và hiện đại
   - Điện từ học
   - Vật lý hạt nhân và lượng tử
   - Cách sử dụng các tính năng của PhysicsLab

Hãy trả lời bằng tiếng Việt, sử dụng ngôn ngữ thân thiện, dễ hiểu và khuyến khích người dùng khám phá các mô phỏng 3D. Khi có thể, hãy gợi ý người dùng thử các mô phỏng cụ thể để hiểu rõ hơn về chủ đề đang thảo luận.`;
    }
}

export default new OpenRouterService();