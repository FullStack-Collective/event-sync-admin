import { useState } from 'react';
import type { RoomItem } from './useDashboardStats';

interface Props { rooms: RoomItem[] }

const isRoomOccupied = (room: RoomItem, at: Date): boolean =>
  room.sessions.some(s => new Date(s.startTime) <= at && new Date(s.endTime) >= at);

const defaultDatetime = (): string => {
  const d = new Date();
  d.setMinutes(d.getMinutes() >= 30 ? 60 : 30, 0, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const IconDoor = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M13 4H3v16h18V9z"/><path d="M13 4v5h8"/><circle cx="16" cy="14" r="1" fill="currentColor"/>
  </svg>
);
const IconRoomSm = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconUsers = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconUnlock = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);
const IconLock = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export const RoomAvailability = ({ rooms }: Props) => {
  const [datetime, setDatetime] = useState<string>(defaultDatetime());
  const checkAt = new Date(datetime);

  const available = rooms.filter(r => !isRoomOccupied(r, checkAt));
  const occupied  = rooms.filter(r => isRoomOccupied(r, checkAt));

  return (
    <div className="dashboard-panel">
      <p className="panel-title">
        <IconDoor />
        Room Availability
      </p>

      <div className="room-picker">
        <span className="room-picker-label">Check at:</span>
        <input
          type="datetime-local"
          value={datetime}
          onChange={e => setDatetime(e.target.value)}
          className="room-picker-input"
        />
        <span className="room-picker-summary">
          {available.length} free · {occupied.length} busy
        </span>
      </div>

      <div className="room-list">
        {rooms.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textAlign: 'center', padding: '1.5rem 0' }}>
            No rooms found.
          </p>
        )}

        {available.map(room => (
          <div key={room.id} className="room-item">
            <div className="room-item-left">
              <span className="room-item-icon"><IconRoomSm /></span>
              <div className="room-item-info">
                <span className="room-item-name">{room.name}</span>
                {room.capacity && (
                  <span className="room-item-capacity">
                    <IconUsers /> {room.capacity} seats
                  </span>
                )}
              </div>
            </div>
            <span className="room-status available">
              <IconUnlock /> Available
            </span>
          </div>
        ))}

        {occupied.map(room => (
          <div key={room.id} className="room-item">
            <div className="room-item-left">
              <span className="room-item-icon"><IconRoomSm /></span>
              <div className="room-item-info">
                <span className="room-item-name">{room.name}</span>
                {room.capacity && (
                  <span className="room-item-capacity">
                    <IconUsers /> {room.capacity} seats
                  </span>
                )}
              </div>
            </div>
            <span className="room-status occupied">
              <IconLock /> Occupied
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
