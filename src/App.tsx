import { useCallback, useState } from 'react';
import HostCharacterWalk from './HostCharacter/HostCharacterWalk.tsx';
import Inventory from './Inventory/Inventory.tsx';

export default function App() {
  const [jarSlips, setJarSlips] = useState(0);

  const addJarSlip = useCallback(() => {
    setJarSlips((count) => count + 1);
  }, []);

  return (
    <div className="app-layout">
      <div className="app-room-column">
        <div className="app-room">
          <HostCharacterWalk onSwear={addJarSlip} />
        </div>
      </div>
      <div className="app-panel">
        <Inventory jarSlips={jarSlips} />
      </div>
    </div>
  );
}
