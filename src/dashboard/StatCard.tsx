interface StatCardProps {
  icon: string;
  value: number | string;
  label: string;
  gradient?: string;
  badge?: string;
  loading?: boolean;
  delay?: number;
}

export const StatCard = ({
  icon,
  value,
  label,
  gradient = 'var(--gradient-sage)',
  badge,
  loading = false,
  delay = 0,
}: StatCardProps) => (
  <div
    className={`stat-card delay-${delay} ${loading ? 'stat-card-skeleton' : ''}`}
    style={{ ['--card-gradient' as string]: gradient }}
  >
    <span className="stat-card-icon">{icon}</span>
    <div className="stat-card-value">{loading ? '' : value}</div>
    <div className="stat-card-label">{label}</div>
    {badge && !loading && (
      <div className="stat-card-badge">
        <span className="stat-card-badge-dot" />
        {badge}
      </div>
    )}
  </div>
);