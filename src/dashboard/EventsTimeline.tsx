import { useState } from 'react';
import type { EventItem } from './useDashboardStats';

type Filter = 'all' | 'live' | 'upcoming' | 'past';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const getStatus = (event: EventItem): 'live' | 'upcoming' | 'past' => {
  const now = new Date();
  if (new Date(event.startDate) <= now && new Date(event.endDate) >= now) return 'live';
  if (new Date(event.startDate) > now) return 'upcoming';
  return 'past';
};

interface Props {
  events: EventItem[];
}

export const EventsTimeline = ({ events }: Props) => {
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { key: Filter; label: string }[] = [
    { key: 'all',      label: 'All' },
    { key: 'live',     label: '🔴 Live' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'past',     label: 'Past' },
  ];

  const filtered = events.filter(e => {
    if (filter === 'all') return true;
    return getStatus(e) === filter;
  });

  // Sort: live first, then upcoming by date asc, then past by date desc
  const sorted = [...filtered].sort((a, b) => {
    const sa = getStatus(a);
    const sb = getStatus(b);
    const order = { live: 0, upcoming: 1, past: 2 };
    if (order[sa] !== order[sb]) return order[sa] - order[sb];
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  return (
    <div className="dashboard-panel">
      <p className="panel-title">🗓 Events</p>

      <div className="timeline-filter">
        {filters.map(f => (
          <button
            key={f.key}
            className={`timeline-filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
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
              <div>
                <p className="timeline-item-title">{event.title}</p>
                <p className="timeline-item-meta">
                  {formatDate(event.startDate)} → {formatDate(event.endDate)}
                  {event.location ? ` · ${event.location}` : ''}
                </p>
                <div className="timeline-item-tags">
                  <span className={`timeline-tag ${status}`}>
                    {status === 'live' ? '🔴 Live' : status === 'upcoming' ? 'Upcoming' : 'Past'}
                  </span>
                  {event.totalSessions > 0 && (
                    <span className="timeline-tag sessions">
                      {event.totalSessions} session{event.totalSessions > 1 ? 's' : ''}
                    </span>
                  )}
                  {event.totalQuestions > 0 && (
                    <span className="timeline-tag sessions">
                      {event.totalQuestions} Q&amp;A
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