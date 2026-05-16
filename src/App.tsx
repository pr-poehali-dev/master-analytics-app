import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Dashboard from '@/components/Dashboard';
import Schedule from '@/components/Schedule';
import Clients from '@/components/Clients';
import Analytics from '@/components/Analytics';

type Page = 'dashboard' | 'schedule' | 'clients' | 'analytics';

const nav = [
  { id: 'dashboard' as Page, label: 'Главная', icon: 'LayoutDashboard' },
  { id: 'schedule' as Page, label: 'Запись', icon: 'CalendarDays' },
  { id: 'clients' as Page, label: 'Клиенты', icon: 'Users' },
  { id: 'analytics' as Page, label: 'Доход', icon: 'BarChart2' },
];

function AuraApp() {
  const [page, setPage] = useState<Page>('dashboard');
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      style={{
        background:
          'radial-gradient(ellipse at 20% 10%, rgba(201,168,76,0.05) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.04) 0%, transparent 50%), hsl(var(--background))',
      }}
    >
      {/* Top header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 shrink-0 sticky top-0 bg-background/90 backdrop-blur-md z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[var(--gold-dim)] flex items-center justify-center gold-pulse">
            <Icon name="Sparkles" size={13} className="text-gold" />
          </div>
          <div>
            <span className="font-display text-lg font-light gold-shimmer tracking-wider">Aura</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 glass-card rounded-xl hover:border-gold/50 transition-all"
          >
            <Icon name="Bell" size={16} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gold rounded-full" />
          </button>

          <button className="flex items-center gap-1.5 text-xs font-sans font-medium text-background bg-gold px-3 py-1.5 rounded-xl hover:bg-gold-light transition-colors">
            <Icon name="Zap" size={12} />
            Запись
          </button>
        </div>
      </header>

      {/* Notification panel */}
      {notifOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
          <div
            className="fixed top-16 right-3 w-72 rounded-2xl p-4 shadow-2xl z-40 border border-[var(--glass-border)]"
            style={{ background: 'hsl(var(--card))' }}
          >
            <p className="font-display text-lg mb-3">Уведомления</p>
            {[
              { text: 'Ольга Петрова через 30 мин', time: '14:00', icon: 'Clock' },
              { text: 'Виктория Смит записалась на 20 мая', time: '13:21', icon: 'UserPlus' },
              { text: 'Оплата ₽ 3 200 от Марии', time: '12:05', icon: 'CheckCircle' },
            ].map((n, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0">
                <Icon name={n.icon} size={14} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-sans text-foreground leading-relaxed">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {page === 'dashboard' && <Dashboard />}
        {page === 'schedule' && <Schedule />}
        {page === 'clients' && <Clients />}
        {page === 'analytics' && <Analytics />}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="flex">
          {nav.map((item) => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 transition-all duration-200 ${
                  active ? 'text-gold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`relative p-1.5 rounded-xl transition-all duration-200 ${active ? 'bg-[var(--gold-dim)]' : ''}`}>
                  <Icon name={item.icon} size={18} />
                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full" />
                  )}
                </div>
                <span className={`text-[10px] font-sans ${active ? 'font-medium' : 'font-light'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        {/* Safe area for iPhone */}
        <div className="h-safe-area-bottom" style={{ height: 'env(safe-area-inset-bottom)' }} />
      </nav>

    </div>
  );
}

export default function App() {
  return <AuraApp />;
}