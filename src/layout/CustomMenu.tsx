import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogout, useGetIdentity, useRefresh } from 'react-admin';
import './sidebar.css';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const NAVIGATION: { section: string; items: NavItem[] }[] = [
  {
    section: 'Overview',
    items: [
      {
        to: '/',
        label: 'Dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
    ],
  },
  {
    section: 'Management',
    items: [
      {
        to: '/events',
        label: 'Events',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        ),
      },
      {
        to: '/sessions',
        label: 'Sessions',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" />
          </svg>
        ),
      },
      {
        to: '/speakers',
        label: 'Speakers',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ),
      },
      {
        to: '/rooms',
        label: 'Rooms',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        ),
      },
    ],
  },
  {
    section: 'Q&A',
    items: [
      {
        to: '/questions',
        label: 'Questions',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
    ],
  },
];

export const CustomMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const logout  = useLogout();
  const refresh = useRefresh();
  const { data: identity } = useGetIdentity();
  const navigate  = useNavigate();
  const location  = useLocation();

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    refresh();
    setTimeout(() => setRefreshing(false), 800);
  };

  const initials = (identity?.fullName as string | undefined)
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? 'A';

  return (
    <nav className={`custom-sidebar ${collapsed ? 'collapsed' : ''}`}>

      {/* ── Logo ── */}
      <a className="sidebar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src="/Logo.png" alt="EventSync" />
        <button
          className="sidebar-toggle"
          onClick={e => { e.preventDefault(); e.stopPropagation(); setCollapsed(c => !c); }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            {collapsed
              ? <polyline points="9 18 15 12 9 6" />
              : <polyline points="15 18 9 12 15 6" />
            }
          </svg>
        </button>
      </a>

      {/* ── Navigation ── */}
      <div className="sidebar-nav">
        {NAVIGATION.map(({ section, items }) => (
          <div key={section}>
            <p className="sidebar-section-label">{section}</p>
            {items.map(item => (
              <button
                key={item.to}
                className={`menu-item ${isActive(item.to) ? 'active' : ''}`}
                onClick={() => navigate(item.to)}
                title={collapsed ? item.label : undefined}
              >
                <span className="menu-item-icon">{item.icon}</span>
                <span className="menu-item-label">{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="sidebar-divider" />

      {/* ── Footer ── */}
      <div className="sidebar-footer">

        {/* User row */}
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{initials}</div>
          <span className="sidebar-user-name">
            {(identity?.fullName as string | undefined) ?? 'Administrator'}
          </span>
        </div>

        {/* Actions */}
        <div className="sidebar-footer-actions">
          <button
            className={`footer-btn refresh ${refreshing ? 'spinning' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
            title="Refresh data"
          >
            <span className="footer-btn-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
              </svg>
            </span>
            <span className="footer-label">{refreshing ? 'Refreshing…' : 'Refresh'}</span>
          </button>

          <button
            className="footer-btn logout"
            onClick={() => logout()}
            title="Sign out"
          >
            <span className="footer-btn-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </span>
            <span className="footer-label">Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};