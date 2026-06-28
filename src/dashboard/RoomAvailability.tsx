import { useState } from 'react';
import type { RoomItem } from './useDashboardStats';

interface Props {
  rooms: RoomItem[];
}

const isRoomOccupied = (room: RoomItem, at: Date): boolean =>
  room.sessions.some(
    s => new Date(s.startTime) <= at && new Date(s.endTime) >= at
  );

// Default datetime = now rounded to next 30 min
const defaultDatetime = (): string => {
  const d = new Date();
  d.setMinutes(d.getMinutes() >= 30 ? 60 : 30, 0, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const RoomAvailability = ({ rooms }: Props) => {
  const [datetime, setDatetime] = useState<string>(defaultDatetime());

  const checkAt = new Date(datetime);

  const available = rooms.filter(r => !isRoomOccupied(r, checkAt));
  const occupied  = rooms.filter(r => isRoomOccupied(r, checkAt));

  return (
    <div className="dashboard-panel">
      <p className="panel-title">🚪 Room Availability</p>

      <div className="room-picker">
        <span className="room-picker-label">Check at:</span>
        <input
          type="datetime-local"
          value={datetime}
          onChange={e => setDatetime(e.target.value)}
          className="room-picker-input"
        />
      </div>

      <div className="room-list">
        {rooms.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', padding: '1.5rem 0' }}>
            No rooms found.
          </p>
        )}

        {/* Available first */}
        {available.map(room => (
          <div key={room.id} className="room-item">
            <div className="room-item-left">
              <span className="room-item-name">{room.name}</span>
              {room.capacity && (
                <span className="room-item-capacity">Capacity: {room.capacity}</span>
              )}
            </div>
            <span className="room-status available">Available</span>
          </div>
        ))}

        {occupied.map(room => (
          <div key={room.id} className="room-item">
            <div className="room-item-left">
              <span className="room-item-name">{room.name}</span>
              {room.capacity && (
                <span className="room-item-capacity">Capacity: {room.capacity}</span>
              )}
            </div>
            <span className="room-status occupied">Occupied</span>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        {available.length} available · {occupied.length} occupied
      </p>
    </div>
  );
};