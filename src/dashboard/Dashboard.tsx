import { useDashboardStats } from './useDashboardStats';
import { StatCard } from './StatCard';
import { EventsTimeline } from './EventsTimeline';
import { RoomAvailability } from './RoomAvailability';
import './dashboard.css';

export const Dashboard = () => {
  const { stats, loading, error, refresh } = useDashboardStats();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

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
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {/* ── Error ── */}
      {error && <div className="dashboard-error">⚠️ {error}</div>}

      {/* ── Events stats ── */}
      <p className="dashboard-section-title">Events</p>
      <div className="dashboard-grid">
        <StatCard icon="📅" value={stats?.totalEvents ?? 0}    label="Total events"    gradient="var(--gradient-sage)"  delay={1} loading={loading} />
        <StatCard icon="🔴" value={stats?.liveEvents ?? 0}     label="Live now"        gradient="linear-gradient(135deg,#10b981,#52b788)" delay={2} loading={loading}
          badge={stats?.liveEvents ? `${stats.liveEvents} live` : undefined}
        />
        <StatCard icon="⏳" value={stats?.upcomingEvents ?? 0} label="Upcoming"        gradient="var(--gradient-teal)"  delay={3} loading={loading} />
        <StatCard icon="✅" value={stats?.pastEvents ?? 0}     label="Past"            gradient="linear-gradient(135deg,#2a3f3a,#538f71)" delay={4} loading={loading} />
      </div>

      {/* ── Sessions & Speakers ── */}
      <p className="dashboard-section-title">Sessions & Speakers</p>
      <div className="dashboard-grid">
        <StatCard icon="🎤" value={stats?.totalSessions ?? 0}  label="Total sessions"  gradient="var(--gradient-sage)"  delay={1} loading={loading} />
        <StatCard icon="▶️" value={stats?.liveSessions ?? 0}   label="Live sessions"   gradient="linear-gradient(135deg,#10b981,#52b788)" delay={2} loading={loading}
          badge={stats?.liveSessions ? `${stats.liveSessions} live` : undefined}
        />
        <StatCard icon="👤" value={stats?.totalSpeakers ?? 0}  label="Speakers"        gradient="var(--gradient-teal)"  delay={3} loading={loading} />
        <StatCard icon="💬" value={stats?.totalQuestions ?? 0} label="Questions asked" gradient="var(--gradient-warm)"  delay={4} loading={loading} />
      </div>

      {/* ── Rooms ── */}
      <p className="dashboard-section-title">Rooms</p>
      <div className="dashboard-grid">
        <StatCard icon="🚪" value={stats?.totalRooms ?? 0}     label="Total rooms"     gradient="var(--gradient-sage)"  delay={1} loading={loading} />
        <StatCard
          icon="✅"
          value={
            stats
              ? stats.rooms.filter(r =>
                  !r.sessions.some(s =>
                    new Date(s.startTime) <= new Date() && new Date(s.endTime) >= new Date()
                  )
                ).length
              : 0
          }
          label="Available now"
          gradient="linear-gradient(135deg,#10b981,#52b788)"
          delay={2}
          loading={loading}
        />
        <StatCard
          icon="🔒"
          value={
            stats
              ? stats.rooms.filter(r =>
                  r.sessions.some(s =>
                    new Date(s.startTime) <= new Date() && new Date(s.endTime) >= new Date()
                  )
                ).length
              : 0
          }
          label="Occupied now"
          gradient="var(--gradient-amber)"
          delay={3}
          loading={loading}
        />
      </div>

      {/* ── Bottom panels ── */}
      {stats && (
        <div className="dashboard-bottom">
          <EventsTimeline events={stats.events} />
          <RoomAvailability rooms={stats.rooms} />
        </div>
      )}
    </div>
  );
};

// import manquant à ajouter en haut
import { useState } from 'react';