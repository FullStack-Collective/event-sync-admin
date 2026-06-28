import { useState } from 'react';
import type { EventItem } from './useDashboardStats';

type Filter = 'all' | 'live' | 'upcoming' | 'past';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const getStatus = (event: EventItem): 'live' | 'upcoming' | 'past' => {
  const now = new Date();
  if (new Date(event.startDate) <= now && new Date(event.endDate) >= now) return 'live';
  if (new Date(event.startDate) > now) return 'upcoming';
  return 'past';
};

const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconRadio = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <circle cx="12" cy="12" r="2"/>
    <path d="M16.24 7.76a6 6 0 0 1 0 8.49"/><path d="M7.76 7.76a6 6 0 0 0 0 8.49"/>
  </svg>
);
const IconClock = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconCheck = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconMic = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
  </svg>
);
const IconMsg = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

interface Props { events: EventItem[] }

export const EventsTimeline = ({ events }: Props) => {
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { key: Filter; label: string; icon: React.ReactNode }[] = [
    { key: 'all',      label: 'All',      icon: <IconCalendar /> },
    { key: 'live',     label: 'Live',     icon: <IconRadio /> },
    { key: 'upcoming', label: 'Upcoming', icon: <IconClock /> },
    { key: 'past',     label: 'Past',     icon: <IconCheck /> },
  ];

  const sorted = events
    .filter(e => filter === 'all' || getStatus(e) === filter)
    .sort((a, b) => {
      const order = { live: 0, upcoming: 1, past: 2 };
      const sa = getStatus(a), sb = getStatus(b);
      if (order[sa] !== order[sb]) return order[sa] - order[sb];
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

  return (
    <div className="dashboard-panel">
      <p className="panel-title">
        <IconCalendar />
        Events
      </p>

      <div className="timeline-filter">
        {filters.map(f => (
          <button
            key={f.key}
            className={`timeline-filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.icon}
            {f.label}
          </button>
        ))}
      </div>

      <div className="timeline-list">
        {sorted.length === 0 && (
          <p className="timeline-empty">No events in this category.</p>
        )}
        {sorted.map(event => {
          const status = getStatus(event);
          return (
            <div key={event.id} className="timeline-item">
              <span className={`timeline-dot ${status}`} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="timeline-item-title">{event.title}</p>
                <p className="timeline-item-meta">
                  {formatDate(event.startDate)} → {formatDate(event.endDate)}
                  {event.location ? ` · ${event.location}` : ''}
                </p>
                <div className="timeline-item-tags">
                  <span className={`timeline-tag ${status}`}>
                    {status === 'live'     && <><IconRadio /> Live</>}
                    {status === 'upcoming' && <><IconClock /> Upcoming</>}
                    {status === 'past'     && <><IconCheck /> Past</>}
                  </span>
                  {event.totalSessions > 0 && (
                    <span className="timeline-tag sessions">
                      <IconMic />
                      {event.totalSessions} session{event.totalSessions > 1 ? 's' : ''}
                    </span>
                  )}
                  {event.totalQuestions > 0 && (
                    <span className="timeline-tag sessions">
                      <IconMsg />
                      {event.totalQuestions} Q&A
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
