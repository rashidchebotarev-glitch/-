import { isSupabaseConfigured, supabase } from './supabase';
import type { MarketQuote } from './market';

type AiResponse = {
  error?: unknown;
  text?: unknown;
};

export type AiForecast = {
  direction: 'up' | 'down';
  explanation: string;
};

function readForecast(text: string): AiForecast {
  const normalizedText = text.trim();
  const direction = /^ВНИЗ\b/i.test(normalizedText) ? 'down' : 'up';
  const explanation = normalizedText.replace(/^(ВВЕРХ|ВНИЗ)\s*[-:—]?\s*/i, '').trim();

  return { direction, explanation: explanation || 'AI не добавил объяснение.' };
}

export async function getAiForecast(quote: MarketQuote): Promise<AiForecast> {
  if (!isSupabaseConfigured) throw new Error('Сначала настрой Supabase, чтобы подключить AI.');

  const change = ((quote.price - quote.startingPrice) / quote.startingPrice) * 100;
  const { data, error } = await supabase.functions.invoke<AiResponse>('ai', {
    body: {
      system: 'Ты AI-помощник учебного симулятора биржи. Оцени только ближайшую игровую сессию по переданным данным. Начинай ответ строго со слова «ВВЕРХ» или «ВНИЗ». Затем в 1–2 простых предложениях назови причины и напомни, что это симуляция, а не финансовый совет. Не придумывай новости, цены или доступ к интернету.',
      prompt: `Акция: ${quote.symbol} (${quote.name}). Текущая игровая цена: $${quote.price.toFixed(2)}. Изменение с начала игровой сессии: ${change.toFixed(2)}%. Реши: вверх или вниз в следующей игровой сессии.`,
    },
  });

  if (error) throw new Error(error.message);
  if (typeof data?.error === 'string') throw new Error(data.error);
  if (typeof data?.text !== 'string') throw new Error('AI прислал непонятный ответ. Попробуй ещё раз.');

  return readForecast(data.text);
}
