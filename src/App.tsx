import { useCallback, useState } from 'react';
import HostCharacterWalk from './HostCharacter/HostCharacterWalk.tsx';
import Inventory, { defaultEntries } from './Inventory/Inventory.tsx';
import type { JarEntry } from './Inventory/defaultEntries';

export default function App() {
  const [entries, setEntries] = useState<JarEntry[]>(defaultEntries);
  const [jarSlips, setJarSlips] = useState(0);

  const addJarSlip = useCallback(() => {
    setJarSlips((count) => count + 1);
  }, []);

  function addOne(id: number) {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, count: entry.count + 1 } : entry,
      ),
    );
  }

  function reset() {
    setEntries(defaultEntries);
    setJarSlips(0);
  }

  return (
    <div className="app-room">
      <HostCharacterWalk onSwear={addJarSlip} />
      <main className="app-shell">
        <Inventory
          entries={entries}
          jarSlips={jarSlips}
          onAddOne={addOne}
          onReset={reset}
        />
      </main>
    </div>
  );
}
