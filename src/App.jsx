import { useCallback, useEffect, useRef, useState } from 'react';
import { useClassifier } from './hooks/useClassifier.js';
import { analyseResults } from './data/foodData.js';
import { makeThumbnail, validateImageFile } from './utils/image.js';
import Plate from './components/Plate.jsx';
import Results from './components/Results.jsx';
import History from './components/History.jsx';
import CameraCapture from './components/CameraCapture.jsx';

const HISTORY_KEY = 'food-image-classifier:history:v1';
const HISTORY_LIMIT = 12;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const { status, error: modelError, classify } = useClassifier();

  const [imageUrl, setImageUrl] = useState(null);
  const [loadedUrl, setLoadedUrl] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [history, setHistory] = useState(loadHistory);
  const imgRef = useRef(null);

  // Accept a new image file (picked, dropped, pasted or captured).
  const handleFile = useCallback((file) => {
    const message = validateImageFile(file);
    if (message) {
      setProblem(message);
      return;
    }
    setProblem(null);
    setAnalysis(null);
    setCameraOpen(false);
    setImageUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return URL.createObjectURL(file);
    });
  }, []);

  // Paste an image from the clipboard.
  useEffect(() => {
    function onPaste(event) {
      const file = [...(event.clipboardData?.files || [])].find((f) => f.type.startsWith('image/'));
      if (file) handleFile(file);
    }
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [handleFile]);

  // Run the classifier once both the model and the image are ready.
  useEffect(() => {
    if (status !== 'ready' || !imageUrl || loadedUrl !== imageUrl) return undefined;

    let cancelled = false;

    (async () => {
      setBusy(true);
      try {
        const predictions = await classify(imgRef.current, 5);
        if (cancelled) return;

        const result = analyseResults(predictions);
        setAnalysis(result);

        const entry = {
          id: Date.now(),
          thumb: makeThumbnail(imgRef.current),
          label: result.headline,
          verdict: result.verdict,
          confidence: result.probability,
        };
        setHistory((prev) => [entry, ...prev].slice(0, HISTORY_LIMIT));
      } catch (err) {
        console.error(err);
        if (!cancelled) setProblem('That photo could not be read. Try a different one.');
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status, imageUrl, loadedUrl, classify]);

  // Persist history.
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      /* storage may be full or disabled; history is optional */
    }
  }, [history]);

  const closeCamera = useCallback(() => setCameraOpen(false), []);

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="brand">Food Image Classifier</h1>
        <p className={`model-status model-${status}`} role="status">
          {status === 'loading' && 'Loading model…'}
          {status === 'ready' && 'Model ready'}
          {status === 'error' && 'Model unavailable'}
        </p>
      </header>

      <main className="stage">
        <Plate
          imageUrl={imageUrl}
          imgRef={imgRef}
          onImageLoad={() => setLoadedUrl(imageUrl)}
          busy={busy || (!!imageUrl && !analysis && !problem)}
          onFile={handleFile}
          onOpenCamera={() => setCameraOpen(true)}
        />
        <Results
          analysis={analysis}
          busy={busy}
          hasImage={!!imageUrl}
          modelStatus={status}
          modelError={modelError}
          problem={problem}
        />
      </main>

      <History items={history} onClear={() => setHistory([])} />

      <footer className="footer">
        Photos are analysed on your device and never uploaded. Built with React and TensorFlow.js (MobileNet V2).
      </footer>

      {cameraOpen && <CameraCapture onCapture={handleFile} onClose={closeCamera} />}
    </div>
  );
}
