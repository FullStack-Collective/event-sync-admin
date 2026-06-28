import { useState } from 'react';
import { useDashboardStats } from './useDashboardStats';
import { StatCard } from './StatCard';
import { EventsTimeline } from './EventsTimeline';
import { RoomAvailability } from './RoomAvailability';
import './dashboard.css';

const IconRefresh = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    <path d="M8 16H3v5"/>
  </svg>
);

export const Dashboard = () => {
  const { stats, loading, error, refresh } = useDashboardStats();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const now = new Date();
  const availableNow = stats
    ? stats.rooms.filter(r =>
        !r.sessions.some(s => new Date(s.startTime) <= now && new Date(s.endTime) >= now)
      ).length
    : 0;
  const occupiedNow = stats ? stats.totalRooms - availableNow : 0;

  return (
    <div className="dashboard-root">

      {/* ── Header ── */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>
        </div>
        <button
          className={`dashboard-refresh-btn ${refreshing ? 'spinning' : ''}`}
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <IconRefresh />
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {/* ── Error ── */}
      {error && <div className="dashboard-error">⚠ {error}</div>}

      {/* ── Stats zone: 2 columns side by side ── */}
      <div className="dashboard-stats-zone">

        {/* LEFT column: Events + Sessions & Speakers */}
        <div className="dashboard-stats-col">
          <p className="dashboard-section-title">Events</p>
          <div className="dashboard-grid">
            <StatCard icon="calendar" value={stats?.totalEvents ?? 0}    label="Total"    gradient="var(--gradient-sage)"  delay={1} loading={loading} />
            <StatCard icon="radio"    value={stats?.liveEvents ?? 0}     label="Live"     gradient="var(--gradient-live)"  delay={2} loading={loading}
              badge={stats?.liveEvents ? `${stats.liveEvents} live` : undefined}
            />
            <StatCard icon="clock"    value={stats?.upcomingEvents ?? 0} label="Upcoming" gradient="var(--gradient-teal)"  delay={3} loading={loading} />
            <StatCard icon="check"    value={stats?.pastEvents ?? 0}     label="Past"     gradient="var(--gradient-past)"  delay={4} loading={loading} />
          </div>

          <p className="dashboard-section-title" style={{ marginTop: '0.625rem' }}>Sessions & Speakers</p>
          <div className="dashboard-grid">
            <StatCard icon="mic"     value={stats?.totalSessions ?? 0}  label="Sessions" gradient="var(--gradient-sage)"  delay={1} loading={loading} />
            <StatCard icon="play"    value={stats?.liveSessions ?? 0}   label="Live"     gradient="var(--gradient-live)"  delay={2} loading={loading}
              badge={stats?.liveSessions ? `${stats.liveSessions} live` : undefined}
            />
            <StatCard icon="user"    value={stats?.totalSpeakers ?? 0}  label="Speakers" gradient="var(--gradient-teal)"  delay={3} loading={loading} />
            <StatCard icon="message" value={stats?.totalQuestions ?? 0} label="Q&A"      gradient="var(--gradient-warm)"  delay={4} loading={loading} />
          </div>
        </div>

        {/* RIGHT column: Rooms */}
        <div className="dashboard-stats-col">
          <p className="dashboard-section-title">Rooms</p>
          <div className="dashboard-grid-3">
            <StatCard icon="door"   value={stats?.totalRooms ?? 0} label="Total"     gradient="var(--gradient-sage)"  delay={1} loading={loading} />
            <StatCard icon="unlock" value={availableNow}           label="Available" gradient="var(--gradient-live)"  delay={2} loading={loading} />
            <StatCard icon="lock"   value={occupiedNow}            label="Occupied"  gradient="var(--gradient-amber)" delay={3} loading={loading} />
          </div>
        </div>
      </div>

      {/* ── Bottom panels: fill remaining height ── */}
      <div className="dashboard-bottom">
        {stats
          ? <EventsTimeline events={stats.events} />
          : <div className="dashboard-panel" />
        }
        {stats
          ? <RoomAvailability rooms={stats.rooms} />
          : <div className="dashboard-panel" />
        }
      </div>

    </div>
  );
};
