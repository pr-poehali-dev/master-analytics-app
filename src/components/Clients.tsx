import { useState } from 'react';
import Icon from '@/components/ui/icon';

const clients = [
  {
    id: 1,
    name: 'Анна Соколова',
    phone: '+7 (916) 234-56-78',
    visits: 24,
    totalSpent: 67200,
    lastVisit: '14 мая 2026',
    nextVisit: '28 мая 2026',
    services: ['Маникюр', 'Гель', 'Педикюр'],
    status: 'vip',
    avatar: 'АС',
    history: [
      { date: '14.05', service: 'Маникюр + гель', price: 2800 },
      { date: '30.04', service: 'Педикюр spa', price: 3200 },
      { date: '16.04', service: 'Маникюр + гель', price: 2800 },
    ],
  },
  {
    id: 2,
    name: 'Мария Иванова',
    phone: '+7 (903) 567-89-01',
    visits: 12,
    totalSpent: 31400,
    lastVisit: '12 мая 2026',
    nextVisit: '26 мая 2026',
    services: ['Наращивание', 'Коррекция'],
    status: 'regular',
    avatar: 'МИ',
    history: [
      { date: '12.05', service: 'Коррекция', price: 2400 },
      { date: '28.04', service: 'Наращивание', price: 5400 },
    ],
  },
  {
    id: 3,
    name: 'Ольга Петрова',
    phone: '+7 (925) 111-22-33',
    visits: 8,
    totalSpent: 18600,
    lastVisit: '10 мая 2026',
    nextVisit: 'Не назначен',
    services: ['Маникюр'],
    status: 'new',
    avatar: 'ОП',
    history: [
      { date: '10.05', service: 'Маникюр', price: 2200 },
    ],
  },
  {
    id: 4,
    name: 'Елена Козлова',
    phone: '+7 (917) 444-55-66',
    visits: 31,
    totalSpent: 94800,
    lastVisit: '16 мая 2026',
    nextVisit: '30 мая 2026',
    services: ['Маникюр', 'Педикюр', 'Брови'],
    status: 'vip',
    avatar: 'ЕК',
    history: [
      { date: '16.05', service: 'Маникюр + педикюр', price: 4800 },
      { date: '02.05', service: 'Брови + маникюр', price: 3600 },
    ],
  },
];

const statusConfig = {
  vip: { label: 'VIP', color: 'text-amber-300', bg: 'bg-amber-400/10 border-amber-400/30' },
  regular: { label: 'Пост.', color: 'text-blue-300', bg: 'bg-blue-400/10 border-blue-400/30' },
  new: { label: 'Новый', color: 'text-emerald-300', bg: 'bg-emerald-400/10 border-emerald-400/30' },
};

export default function Clients() {
  const [selected, setSelected] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const client = clients.find((c) => c.id === selected);

  if (client) {
    return (
      <div className="px-4 py-5 space-y-4 animate-fade-up">
        {/* Back */}
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="ChevronLeft" size={16} />
          <span className="text-sm font-sans">Назад</span>
        </button>

        {/* Client card */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--gold-dim)] flex items-center justify-center shrink-0">
              <span className="font-display text-xl text-gold">{client.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display text-2xl font-light">{client.name}</h2>
                <span className={`text-xs font-sans px-2 py-0.5 rounded-full border ${statusConfig[client.status as keyof typeof statusConfig].color} ${statusConfig[client.status as keyof typeof statusConfig].bg}`}>
                  {statusConfig[client.status as keyof typeof statusConfig].label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-sans mt-0.5">{client.phone}</p>
            </div>
            <button className="p-2 glass-card rounded-xl shrink-0">
              <Icon name="Phone" size={15} className="text-gold" />
            </button>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            {client.services.map((s) => (
              <span key={s} className="text-xs font-sans text-muted-foreground bg-[var(--surface)] border border-border px-2.5 py-1 rounded-lg">
                {s}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border">
            <div className="text-center">
              <p className="font-display text-2xl font-light text-gold">{client.visits}</p>
              <p className="text-[10px] text-muted-foreground font-sans">Визитов</p>
            </div>
            <div className="text-center">
              <p className="font-display text-xl font-light text-gold">₽ {Math.round(client.totalSpent / client.visits / 100) * 100}</p>
              <p className="text-[10px] text-muted-foreground font-sans">Ср. чек</p>
            </div>
            <div className="text-center">
              <p className="font-display text-lg font-light text-gold">₽ {(client.totalSpent / 1000).toFixed(0)}K</p>
              <p className="text-[10px] text-muted-foreground font-sans">Итого</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card rounded-xl p-3">
            <p className="text-[10px] text-muted-foreground font-sans">Последний визит</p>
            <p className="font-sans font-medium text-sm mt-1">{client.lastVisit}</p>
          </div>
          <div className="glass-card rounded-xl p-3">
            <p className="text-[10px] text-muted-foreground font-sans">Следующий</p>
            <p className={`font-sans font-medium text-sm mt-1 ${client.nextVisit === 'Не назначен' ? 'text-muted-foreground' : 'text-gold'}`}>
              {client.nextVisit}
            </p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4">
          <h3 className="font-display text-lg font-light mb-3">История визитов</h3>
          <div className="space-y-2">
            {client.history.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                <div>
                  <p className="font-sans text-sm">{h.service}</p>
                  <p className="text-xs text-muted-foreground">{h.date}</p>
                </div>
                <p className="font-sans font-medium text-sm text-gold">₽ {h.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full glass-card rounded-xl py-3 flex items-center justify-center gap-2 hover:border-gold/50 transition-all">
          <Icon name="CalendarPlus" size={16} className="text-gold" />
          <span className="text-sm font-sans font-medium text-gold">Записать повторно</span>
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center justify-between animate-fade-up">
        <div>
          <p className="text-muted-foreground text-xs font-sans tracking-widest uppercase">База</p>
          <h1 className="font-display text-3xl font-light mt-0.5">Клиенты</h1>
        </div>
        <button className="flex items-center gap-1.5 bg-gold text-background text-xs font-sans font-medium px-3 py-1.5 rounded-xl">
          <Icon name="UserPlus" size={13} />
          Добавить
        </button>
      </div>

      <div className="relative animate-fade-up-delay-1">
        <Icon name="Search" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск клиента..."
          className="w-full glass-card rounded-xl pl-9 pr-4 py-2.5 text-sm font-sans bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
        />
      </div>

      <div className="space-y-2 animate-fade-up-delay-2">
        {filtered.map((c) => {
          const st = statusConfig[c.status as keyof typeof statusConfig];
          return (
            <div
              key={c.id}
              onClick={() => setSelected(c.id)}
              className="glass-card rounded-xl p-4 cursor-pointer flex items-center gap-3 hover:border-gold/40 transition-all duration-200 active:scale-[0.98]"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--gold-dim)] flex items-center justify-center shrink-0">
                <span className="text-xs font-sans font-medium text-gold">{c.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-sans font-medium text-sm truncate">{c.name}</p>
                  <span className={`text-[10px] font-sans px-1.5 py-0.5 rounded-full border shrink-0 ${st.color} ${st.bg}`}>
                    {st.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{c.visits} визитов · ₽ {c.totalSpent.toLocaleString()}</p>
              </div>
              <Icon name="ChevronRight" size={14} className="text-muted-foreground shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
