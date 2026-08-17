import { isSupabaseConfigured, supabase } from './supabase';

type AiResponse = { error?: unknown; text?: unknown };

export async function askAiAssistant(question: string): Promise<string> {
  if (!isSupabaseConfigured) throw new Error('Сначала настрой Supabase, чтобы подключить AI.');

  const { data, error } = await supabase.functions.invoke<AiResponse>('ai', {
    body: {
      system: 'Ты тренер North Market для детей 8–12 лет. Отвечай по-русски, дружелюбно и максимум в 3 коротких предложениях. Объясняй термины простыми сравнениями. Помогай учиться инвестированию, но не обещай доход, не советуй покупать конкретные акции и напоминай, что это учебная игра.',
      prompt: question,
    },
  });

  if (error) throw new Error(error.message);
  if (typeof data?.error === 'string') throw new Error(data.error);
  if (typeof data?.text !== 'string') throw new Error('AI прислал непонятный ответ.');

  return data.text;
}
