import type { CSSProperties } from 'react';
import type { PlacedRoomItem } from './roomPlacement';
import './RoomPlacedItems.css';

type RoomPlacedItemsProps = {
  items: PlacedRoomItem[];
};

export default function RoomPlacedItems({ items }: RoomPlacedItemsProps) {
  return (
    <div className="room-placed-items" aria-hidden="true">
      {items.map((item) => (
        <img
          key={item.key}
          className="room-placed-item"
          src={item.icon}
          alt=""
          width={28}
          height={24}
          style={
            {
              '--room-item-x': `${item.x}%`,
              '--room-item-y': `${item.y}%`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
