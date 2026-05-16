import Icon from '@/components/ui/icon';

const stats = [
  { label: 'Доход сегодня', value: '₽ 18 400', change: '+12%', icon: 'TrendingUp' },
  { label: 'Записей', value: '7', change: '2 свободно', icon: 'Calendar' },
  { label: 'Клиентов', value: '284', change: '+3 за нед.', icon: 'Users' },
  { label: 'Средний чек', value: '₽ 2 628', change: '+8%', icon: 'Sparkles' },
];

const todayAppointments = [
  { time: '10:00', client: 'Анна Соколова', service: 'Маникюр + гель', duration: 90, status: 'done', price: 2800 },
  { time: '12:00', client: 'Мария Иванова', service: 'Педикюр spa', duration: 60, status: 'done', price: 3200 },
  { time: '14:30', client: 'Ольга Петрова', service: 'Наращивание', duration: 120, status: 'current', price: 5400 },
  { time: '17:00', client: 'Елена Козлова', service: 'Коррекция', duration: 60, status: 'upcoming', price: 2400 },
  { time: '18:30', client: 'Виктория Смит', service: 'Маникюр', duration: 60, status: 'upcoming', price: 2200 },
];

const revenueData = [
  { day: 'Пн', value: 12400 },
  { day: 'Вт', value: 8200 },
  { day: 'Ср', value: 15600 },
  { day: 'Чт', value: 11000 },
  { day: 'Пт', value: 19800 },
  { day: 'Сб', value: 22400 },
  { day: 'Вс', value: 18400 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.value));

const statusConfig = {
  done: { label: 'Завершено', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  current: { label: 'Сейчас', color: 'text-[var(--gold)]', bg: 'bg-[var(--gold-dim)]' },
  upcoming: { label: 'Ожидает', color: 'text-blue-400', bg: 'bg-blue-400/10' },
};

export default function Dashboard() {
  return (
    <div className="px-4 py-5 space-y-5">
      {/* Greeting */}
      <div className="animate-fade-up">
        <p className="text-muted-foreground text-xs font-sans tracking-widest uppercase">Пт, 16 мая 2026</p>
        <h1 className="font-display text-3xl font-light mt-0.5">
          Добрый день, <span className="gold-shimmer italic">Алина</span>
        </h1>
      </div>

      {/* Stats grid 2x2 */}
      <div className="grid grid-cols-2 gap-3 animate-fade-up-delay-1">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass-card rounded-2xl p-4 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-[var(--gold-dim)] flex items-center justify-center">
                <Icon name={s.icon} size={14} className="text-gold" />
              </div>
              <span className="text-xs font-sans text-emerald-400">{s.change}</span>
            </div>
            <p className="font-display text-xl font-light">{s.value}</p>
            <p className="text-xs text-muted-foreground font-sans mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue mini-chart */}
      <div className="glass-card rounded-2xl p-4 animate-fade-up-delay-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-sans font-medium text-sm">Неделя</p>
            <p className="text-xs text-muted-foreground">₽ 107 800 итого</p>
          </div>
          <span className="text-xs font-sans text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">+18.4%</span>
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {revenueData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-md transition-all duration-500 ${
                  d.day === 'Вс' ? 'bg-gold' : 'bg-[var(--gold-dim)]'
                }`}
                style={{ height: `${(d.value / maxRevenue) * 100}%` }}
              />
              <span className="text-[9px] text-muted-foreground font-sans">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Today schedule */}
      <div className="animate-fade-up-delay-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl font-light">Сегодня</h2>
          <button className="text-xs font-sans text-gold">
            + Запись
          </button>
        </div>
        <div className="space-y-2">
          {todayAppointments.map((apt) => {
            const st = statusConfig[apt.status as keyof typeof statusConfig];
            return (
              <div
                key={apt.time}
                className={`glass-card rounded-xl flex items-center gap-3 p-3 ${
                  apt.status === 'current' ? 'border-[var(--gold)]/40 bg-[var(--gold-dim)]' : ''
                }`}
              >
                <div className="text-center w-12 shrink-0">
                  <p className="font-display text-base font-light text-gold leading-none">{apt.time}</p>
                  <p className="text-[10px] text-muted-foreground font-sans mt-0.5">{apt.duration}м</p>
                </div>
                <div className="w-px h-8 bg-border shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-medium text-sm truncate">{apt.client}</p>
                  <p className="text-xs text-muted-foreground truncate">{apt.service}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-sans text-xs font-medium">₽ {apt.price.toLocaleString()}</p>
                  <span className={`text-[10px] font-sans ${st.color}`}>{st.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-2 animate-fade-up-delay-4 pb-2">
        {[
          { icon: 'Zap', label: '10 сек' },
          { icon: 'Bell', label: 'Уведом.' },
          { icon: 'Download', label: 'Экспорт' },
        ].map((a) => (
          <button
            key={a.label}
            className="glass-card rounded-xl p-3 flex flex-col items-center gap-2 hover:border-gold/50 transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--gold-dim)] flex items-center justify-center">
              <Icon name={a.icon} size={16} className="text-gold" />
            </div>
            <span className="text-xs font-sans text-muted-foreground">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
