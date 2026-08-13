export function MarketHighlights() {
  return (
    <div className="market-highlights" aria-label="Возможности терминала">
      <article>
        <span className="live-dot" />
        <div><strong>LIVE</strong><small>обновление 1 сек.</small></div>
      </article>
      <article>
        <strong>21</strong><small>актив для старта</small>
      </article>
      <article>
        <strong>$10K</strong><small>учебный баланс</small>
      </article>
    </div>
  );
}
