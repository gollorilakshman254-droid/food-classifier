export default function History({ items, onClear }) {
  if (!items.length) return null;

  return (
    <section className="history" aria-labelledby="history-title">
      <div className="history-head">
        <h2 id="history-title" className="section-title">Recent photos</h2>
        <button type="button" className="link-btn" onClick={onClear}>
          Clear history
        </button>
      </div>
      <ul className="history-list">
        {items.map((item) => (
          <li key={item.id} className="history-item">
            <img src={item.thumb} alt="" width="64" height="64" />
            <div>
              <p className="history-label">{item.label}</p>
              <p className="history-meta">
                {item.verdict === 'not-food' ? 'Not food' : 'Food'}, {Math.round(item.confidence * 100)}%
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
