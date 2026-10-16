# Food Image Classifier

An AI-based food image classification system built with **React** and **TensorFlow.js**.
Add a photo (upload, drag and drop, paste, or camera) and the app tells you whether it shows
food, which dish it most likely is, how confident the model is, and a rough nutrition
estimate for one serving.

Everything runs in the browser. Photos are never uploaded to a server.

## Features

- Upload, drag and drop, paste from the clipboard, or take a photo with the camera
- MobileNet V2 image classification in the browser (WebGL accelerated)
- Top 5 predictions with confidence bars, with food classes highlighted
- Verdict: food, possibly food, or not food
- Nutrition estimate (calories, protein, carbs, fat) for recognised foods
- Recent photos history saved in the browser (localStorage)
- Responsive layout, keyboard accessible, respects reduced motion

## Requirements

- Node.js 18 or newer
- An internet connection the first time you run it (the model and fonts are downloaded)

## Run it

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  App.jsx                    App state and classification flow
  main.jsx                   Entry point
  styles.css                 All styling
  hooks/useClassifier.js     Loads MobileNet and exposes classify()
  data/foodData.js           Food list, nutrition data, result analysis
  utils/image.js             Thumbnail and file validation helpers
  components/
    Plate.jsx                Drop target and photo preview
    Results.jsx              Verdict, confidence bars, nutrition
    History.jsx              Recent photos
    CameraCapture.jsx        Camera dialog
```

## How it works

1. `useClassifier` loads MobileNet V2 (trained on ImageNet) once with TensorFlow.js.
2. When a photo finishes loading, the model returns its top 5 class guesses.
3. `analyseResults` in `foodData.js` matches each guess against the food list. If the food
   classes add up to 40% or more probability, the verdict is "food"; 15% to 40% is
   "possibly food"; below that, "not food".
4. For recognised foods, the app shows a nutrition estimate from the same list.

## Limits to know about

MobileNet is a general-purpose model. ImageNet only has a few dozen food classes (pizza,
cheeseburger, bagel, broccoli, and so on), so it will not recognise dishes like biryani,
sushi or dosa. The nutrition numbers are rough averages, not dietary advice.

## Using a model trained on more foods

To recognise a wider range of dishes, train or download a model on a food dataset such as
Food-101 (101 classes), convert it to TensorFlow.js format, and put it in `public/model/`.
Then edit `src/hooks/useClassifier.js`:

```js
import * as tf from '@tensorflow/tfjs';

const model = await tf.loadLayersModel('/model/model.json');

// inside classify():
const input = tf.tidy(() =>
  tf.browser.fromPixels(imageElement).resizeBilinear([224, 224]).toFloat().div(255).expandDims(0)
);
const scores = await model.predict(input).data();
input.dispose();
// Convert scores into [{ className, probability }] sorted high to low,
// using your model's label list, and return the top K.
```

Then add the new class names and nutrition values to `FOODS` in `src/data/foodData.js`.
Each entry's `keys` must match the class names your model returns.
