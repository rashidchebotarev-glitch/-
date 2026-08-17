type QuoteSearchProps = {
  onChange: (value: string) => void;
  value: string;
};

export function QuoteSearch({ onChange, value }: QuoteSearchProps) {
  return (
    <label className="quote-search">
      <span>⌕</span>
      <input onChange={(event) => onChange(event.target.value)} placeholder="Поиск: тикер или компания" value={value} />
    </label>
  );
}
