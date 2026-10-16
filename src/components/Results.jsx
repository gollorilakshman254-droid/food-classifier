import { FOOD_CATEGORIES, FOOD_COUNT } from '../data/foodData.js';

const VERDICT_TEXT = {
  food: 'Food detected',
  maybe: 'Possibly food',
  'not-food': "Doesn't look like food",
};

const pct = (value) => `${Math.round(value * 100)}%`;

export default function Results({ analysis, busy, hasImage, modelStatus, modelError, problem }) {
  if (modelStatus === 'error') {
    return (
      <div className="read" role="alert">
        <h2 className="read-heading">The model did not load</h2>
        <p className="read-text">{modelError}</p>
      </div>
    );
  }

  if (problem) {
    return (
      <div className="read" role="alert">
        <h2 className="read-heading">Something went wrong</h2>
        <p className="read-text">{problem}</p>
      </div>
    );
  }

  if (!hasImage) {
    return (
      <div className="read">
        <h2 className="read-heading">Add a photo to find out what the dish is</h2>
        <p className="read-text">
          The classifier looks at your photo and returns its best guesses with a confidence score.
          It runs in your browser, so the photo stays on your device.
        </p>
        <p className="read-text muted">
          It knows {FOOD_COUNT} foods across these groups: {FOOD_CATEGORIES.join(', ').toLowerCase()}.
        </p>
      </div>
    );
  }

  if (busy || !analysis) {
    return (
      <div className="read" aria-live="polite">
        <h2 className="read-heading">
          {modelStatus === 'loading' ? 'Loading the model…' : 'Reading your photo…'}
        </h2>
        <p className="read-text muted">
          {modelStatus === 'loading'
            ? 'The first load downloads the model (about 14 MB). After that it is cached.'
            : 'This usually takes a second or two.'}
        </p>
      </div>
    );
  }

  const { verdict, headline, probability, items, bestFood } = analysis;
  const nutrition = verdict !== 'not-food' && bestFood ? bestFood.food : null;

  return (
    <div className="read" aria-live="polite">
      <p className={`verdict verdict-${verdict}`}>{VERDICT_TEXT[verdict]}</p>
      <h2 className="read-name">{headline}</h2>
      <p className="read-confidence">{pct(probability)} confidence</p>

      {verdict === 'not-food' && (
        <p className="read-text muted">
          The model's top guess is not one of the foods it knows. Try a closer, well-lit photo of the dish.
        </p>
      )}

      <h3 className="section-title">All guesses</h3>
      <ul className="bars">
        {items.map((item) => (
          <li key={item.className} className="bar-row">
            <span className="bar-label">
              {item.label}
              {item.food && <span className="bar-tag">food</span>}
            </span>
            <span className="bar-track" aria-hidden="true">
              <span
                className={`bar-fill ${item.food ? 'is-food' : ''}`}
                style={{ width: `${Math.max(item.probability * 100, 1)}%` }}
              />
            </span>
            <span className="bar-value">{pct(item.probability)}</span>
          </li>
        ))}
      </ul>

      {nutrition && (
        <>
          <h3 className="section-title">Nutrition estimate</h3>
          <p className="read-text muted">{nutrition.name}: {nutrition.serving}</p>
          <dl className="nutrition">
            <div><dt>Calories</dt><dd>{nutrition.kcal} kcal</dd></div>
            <div><dt>Protein</dt><dd>{nutrition.protein} g</dd></div>
            <div><dt>Carbs</dt><dd>{nutrition.carbs} g</dd></div>
            <div><dt>Fat</dt><dd>{nutrition.fat} g</dd></div>
          </dl>
          <p className="fineprint">Rough averages for a typical serving. Not dietary advice.</p>
        </>
      )}
    </div>
  );
}
