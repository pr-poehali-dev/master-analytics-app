import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Icon from '@/components/ui/icon';
import Dashboard from '@/components/Dashboard';
import Schedule from '@/components/Schedule';
import Clients from '@/components/Clients';
import Analytics from '@/components/Analytics';

type Page = 'dashboard' | 'schedule' | 'clients' | 'analytics';

const nav = [
  { id: 'dashboard' as Page, label: 'Дашборд', icon: 'LayoutDashboard' },
  { id: 'schedule' as Page, label: 'Расписание', icon: 'CalendarDays' },
  { id: 'clients' as Page, label: 'Клиенты', icon: 'Users' },
  { id: 'analytics' as Page, label: 'Аналитика', icon: 'BarChart2' },
];

function AuraApp() {
  const [page, setPage] = useState<Page>('dashboard');
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.04) 0%, transparent 50%), hsl(var(--background))' }}>

      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border flex flex-col h-screen sticky top-0 overflow-hidden">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--gold-dim)] flex items-center justify-center gold-pulse">
              <Icon name="Sparkles" size={16} className="text-gold" />
            </div>
            <div>
              <p className="font-display text-xl font-light tracking-wider gold-shimmer">Aura</p>
              <p className="text-xs text-muted-foreground font-sans -mt-0.5">Beauty Studio</p>
            </div>
          </div>
        </div>

        {/* Master info */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--surface-hover)] transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center">
              <span className="text-xs font-sans font-medium text-amber-100">АМ</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans font-medium text-sm text-foreground truncate">Алина Морозова</p>
              <p className="text-xs text-muted-foreground">Мастер · Владелец</p>
            </div>
            <Icon name="Settings" size={14} className="text-muted-foreground" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans text-left ${
                page === item.id ? 'active' : 'text-muted-foreground'
              }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom quick stats */}
        <div className="p-4 border-t border-border">
          <div className="glass-card rounded-xl p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-sans">Сегодня</span>
              <span className="text-xs font-sans font-medium text-emerald-400">7 записей</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-sans">Доход</span>
              <span className="text-xs font-sans font-medium text-gold">₽ 18 400</span>
            </div>
            <div className="h-1 bg-[var(--surface)] rounded-full">
              <div className="h-full w-[78%] bg-gradient-to-r from-gold to-gold-light rounded-full" />
            </div>
            <p className="text-xs text-muted-foreground font-sans">78% от цели дня</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-border flex items-center justify-between px-6 shrink-0 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <Icon name={nav.find((n) => n.id === page)!.icon} size={16} className="text-muted-foreground" />
            <span className="text-sm font-sans text-muted-foreground">
              {nav.find((n) => n.id === page)!.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-xs font-sans font-medium text-background bg-gold px-3.5 py-1.5 rounded-xl hover:bg-gold-light transition-colors">
              <Icon name="Zap" size={13} />
              10 сек запись
            </button>

            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 glass-card rounded-xl hover:border-gold/50 transition-all"
              >
                <Icon name="Bell" size={16} className="text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-10 w-72 glass-card rounded-2xl p-4 shadow-2xl z-50 border border-[var(--glass-border)]" style={{ background: 'hsl(var(--card))' }}>
                  <p className="font-display text-lg mb-3">Уведомления</p>
                  {[
                    { text: 'Напоминание: Ольга Петрова через 30 мин', time: '14:00', icon: 'Clock' },
                    { text: 'Виктория Смит записалась на 20 мая', time: '13:21', icon: 'UserPlus' },
                    { text: 'Получена оплата ₽ 3 200 от Марии', time: '12:05', icon: 'CheckCircle' },
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
              )}
            </div>

            <button className="p-2 glass-card rounded-xl hover:border-gold/50 transition-all">
              <Icon name="User" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          {page === 'dashboard' && <Dashboard />}
          {page === 'schedule' && <Schedule />}
          {page === 'clients' && <Clients />}
          {page === 'analytics' && <Analytics />}
        </div>
      </main>

      {notifOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <AuraApp />
    </TooltipProvider>
  );
}
