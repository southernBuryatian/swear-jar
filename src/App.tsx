import { useCallback, useState } from 'react';
import HostCharacterWalk from './HostCharacter/HostCharacterWalk.tsx';
import Inventory from './Inventory/Inventory.tsx';

export default function App() {
  const [jarSlips, setJarSlips] = useState(0);

  const addJarSlip = useCallback(() => {
    setJarSlips((count) => count + 1);
  }, []);

  const resetJarSlips = useCallback(() => {
    setJarSlips(0);
  }, []);

  return (
    <div className="app-room">
      <HostCharacterWalk onSwear={addJarSlip} />
      <Inventory jarSlips={jarSlips} onJarSlipsReset={resetJarSlips} />
    </div>
  );
}
