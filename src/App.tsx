import HostCharacterWalk from './HostCharacter/HostCharacterWalk.tsx';
import Inventory from './Inventory/Inventory.tsx';

export default function App() {
  return (
    <div className="app-room">
      <HostCharacterWalk />
      <main className="app-shell">
        <Inventory />
      </main>
    </div>
  );
}
