import { FormEvent, useState } from 'react';
import { Link } from 'wouter';
import { askAiAssistant } from '../lib/aiAssistant';

type ChatMessage = { role: 'assistant' | 'user'; text: string };

const starterMessage: ChatMessage = { role: 'assistant', text: 'Привет! Я тренер North Market. Спроси меня про акции, облигации, риск или миссии.' };

export function AiAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([starterMessage]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function sendQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isLoading) return;

    setMessages((current) => [...current, { role: 'user', text: trimmedQuestion }]);
    setQuestion('');
    setIsLoading(true);
    try {
      const answer = await askAiAssistant(trimmedQuestion);
      setMessages((current) => [...current, { role: 'assistant', text: answer }]);
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Не получилось спросить AI.';
      setMessages((current) => [...current, { role: 'assistant', text }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="market-page">
      <header className="market-header"><Link className="market-logo" href="/">NORTH<span>•</span>MARKET</Link><span className="market-status">✦ AI-ТРЕНЕР</span></header>
      <section className="ai-assistant-page">
        <Link className="back-link" href="/">← Вернуться к игре</Link>
        <p className="market-kicker">ТВОЙ AI ПОМОЩНИК</p>
        <h1>Спроси<br /><em>тренера.</em></h1>
        <div className="ai-chat" aria-live="polite">
          {messages.map((message, index) => <p className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>{message.text}</p>)}
          {isLoading && <p className="chat-message assistant">Думаю…</p>}
        </div>
        <form className="ai-chat-form" onSubmit={sendQuestion}>
          <input maxLength={500} onChange={(event) => setQuestion(event.target.value)} placeholder="Например: что такое ETF?" value={question} />
          <button disabled={isLoading} type="submit">Отправить →</button>
        </form>
      </section>
    </main>
  );
}
