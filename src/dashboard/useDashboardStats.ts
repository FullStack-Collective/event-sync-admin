import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface EventItem {
  id: number;
  title: string;
  location?: string;
  startDate: string;
  endDate: string;
  isLive: boolean;
  isUpcoming: boolean;
  isPast: boolean;
  totalSessions: number;
  totalQuestions: number;
  sessions: SessionItem[];
}

export interface SessionItem {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  roomId: number;
  speakers: unknown[];
  isLive?: boolean;
}

export interface RoomItem {
  id: number;
  name: string;
  capacity?: number;
  sessions: {
    startTime: string;
    endTime: string;
  }[];
}

export interface DashboardStats {
  totalEvents: number;
  liveEvents: number;
  upcomingEvents: number;
  pastEvents: number;
  totalSessions: number;
  liveSessions: number;
  totalSpeakers: number;
  totalRooms: number;
  totalQuestions: number;
  events: EventItem[];
  rooms: RoomItem[];
}

const authHeaders = () => {
  const token = localStorage.getItem('admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [eventsRes, roomsRes, speakersRes, sessionsRes] = await Promise.all([
        fetch(`${API_URL}/api/events?limit=100`, { headers: authHeaders() }),
        fetch(`${API_URL}/api/rooms`, { headers: authHeaders() }),
        fetch(`${API_URL}/api/speakers`, { headers: authHeaders() }),
        fetch(`${API_URL}/api/sessions`, { headers: authHeaders() }),
      ]);

      const [eventsJson, roomsJson, speakersJson, sessionsJson] = await Promise.all([
        eventsRes.json(),
        roomsRes.json(),
        speakersRes.json(),
        sessionsRes.json(),
      ]);

      const events: EventItem[] = eventsJson.data || [];
      const rooms: RoomItem[] = roomsJson.data || [];
      const speakers: unknown[] = speakersJson.data || [];
      const sessions: SessionItem[] = sessionsJson.data || [];

      const now = new Date();

      const liveEvents    = events.filter(e => new Date(e.startDate) <= now && new Date(e.endDate) >= now).length;
      const upcomingEvents = events.filter(e => new Date(e.startDate) > now).length;
      const pastEvents    = events.filter(e => new Date(e.endDate) < now).length;

      const liveSessions = sessions.filter(
        s => new Date(s.startTime) <= now && new Date(s.endTime) >= now
      ).length;

      const totalQuestions = events.reduce((acc, e) => acc + (e.totalQuestions || 0), 0);

      setStats({
        totalEvents: events.length,
        liveEvents,
        upcomingEvents,
        pastEvents,
        totalSessions: sessions.length,
        liveSessions,
        totalSpeakers: speakers.length,
        totalRooms: rooms.length,
        totalQuestions,
        events,
        rooms,
      });
    } catch (err) {
      setError((err as Error).message || 'Failed to load statistics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    // Auto-refresh toutes les 60 secondes
    const interval = setInterval(fetchStats, 60_000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return { stats, loading, error, refresh: fetchStats };
};