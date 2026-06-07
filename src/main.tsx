import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Intro from './Intro/Intro.tsx';
import './fonts/pixelify-sans.css';
import './styles.css';

type Screen = 'intro' | 'bricks' | 'app';

function Root() {
  const [screen, setScreen] = useState<Screen>('intro');

  if (screen === 'intro') {
    return (
      <main className="app-shell">
        <Intro onComplete={() => setScreen('bricks')} />
      </main>
    );
  }

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
