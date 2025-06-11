export interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

export class LLMService {
  private backendUrl: string;

  constructor(backendUrl: string = 'http://localhost:3001') {
    this.backendUrl = backendUrl;
  }

  async sendRequest(prompt: string): Promise<LLMResponse> {
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    try {
      const payload = { prompt };

      console.log('Sending LLM request to backend:', payload);

      const response = await fetch(`${this.backendUrl}/api/llm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error}`);
      }

      const data = await response.json();
      console.log('LLM response:', data);

      return data;
    } catch (error) {
      console.error('LLM request failed:', error);
      throw error;
    }
  }
}

// Factory function to create LLM service instance
export const llmService = new LLMService();