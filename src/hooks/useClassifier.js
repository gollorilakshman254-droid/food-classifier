import { useCallback, useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

/**
 * Loads a MobileNet V2 image classifier once and exposes a classify() function.
 * The model runs entirely in the browser (WebGL), so photos never leave the device.
 *
 * To use a different model (for example one trained on Food-101), replace the
 * load step and the classify callback. See README.md.
 */
export function useClassifier() {
  const modelRef = useRef(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await tf.ready();
        const model = await mobilenet.load({ version: 2, alpha: 1.0 });
        if (cancelled) return;
        modelRef.current = model;
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setError('The model could not be loaded. Check your internet connection and reload.');
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const classify = useCallback(async (imageElement, topK = 5) => {
    if (!modelRef.current) throw new Error('Model is not ready yet.');
    return modelRef.current.classify(imageElement, topK);
  }, []);

  return { status, error, classify };
}
