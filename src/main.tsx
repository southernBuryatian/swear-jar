import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Intro from './Intro/Intro.tsx';
import './styles.css';

function Root() {
  const [introDone, setIntroDone] = useState(false);

  if (!introDone) {
    return (
      <main className="app-shell">
        <Intro onComplete={() => setIntroDone(true)} />
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
