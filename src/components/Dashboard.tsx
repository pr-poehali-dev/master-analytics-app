import Icon from '@/components/ui/icon';

const stats = [
  { label: 'Доход сегодня', value: '₽ 18 400', change: '+12%', icon: 'TrendingUp', delay: 1 },
  { label: 'Записей сегодня', value: '7', change: '2 свободно', icon: 'Calendar', delay: 2 },
  { label: 'Клиентов в базе', value: '284', change: '+3 за неделю', icon: 'Users', delay: 3 },
  { label: 'Средний чек', value: '₽ 2 628', change: '+8%', icon: 'Sparkles', delay: 4 },
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

const maxRevenue = Math.max(...revenueData.map(d => d.value));

const statusConfig = {
  done: { label: 'Завершено', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  current: { label: 'Сейчас', color: 'text-[var(--gold)]', bg: 'bg-[var(--gold-dim)]' },
  upcoming: { label: 'Ожидает', color: 'text-blue-400', bg: 'bg-blue-400/10' },
};

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="animate-fade-up">
        <p className="text-muted-foreground text-sm font-sans font-light tracking-widest uppercase">Суббота, 16 мая 2026</p>
        <h1 className="font-display text-4xl font-light mt-1">
          Добрый день, <span className="gold-shimmer italic">Мастер</span>
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`glass-card rounded-2xl p-5 relative overflow-hidden animate-fade-up-delay-${s.delay} group hover:border-[var(--gold-dim)] transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--gold-dim)] flex items-center justify-center">
                <Icon name={s.icon} size={16} className="text-gold" />
              </div>
              <span className="text-xs font-sans text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{s.change}</span>
            </div>
            <p className="font-display text-2xl font-light text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5 font-sans">{s.label}</p>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[var(--gold-dim)] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 animate-fade-up-delay-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-light">Расписание на сегодня</h2>
            <button className="text-xs font-sans text-gold border border-[var(--glass-border)] hover:border-gold px-3 py-1.5 rounded-full transition-all duration-200">
              + Быстрая запись
            </button>
          </div>
          <div className="space-y-2">
            {todayAppointments.map((apt) => {
              const st = statusConfig[apt.status as keyof typeof statusConfig];
              return (
                <div
                  key={apt.time}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
                    apt.status === 'current'
                      ? 'bg-[var(--gold-dim)] border border-[var(--gold)]/30'
                      : 'hover:bg-[var(--surface-hover)]'
                  }`}
                >
                  <div className="text-center w-14 shrink-0">
                    <p className="font-display text-lg font-light text-gold">{apt.time}</p>
                    <p className="text-xs text-muted-foreground font-sans">{apt.duration}мин</p>
                  </div>
                  <div className="w-px h-10 bg-border shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-medium text-sm text-foreground truncate">{apt.client}</p>
                    <p className="text-xs text-muted-foreground font-sans">{apt.service}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-sans font-medium text-sm text-foreground">₽ {apt.price.toLocaleString()}</p>
                    <span className={`text-xs font-sans ${st.color} ${st.bg} px-2 py-0.5 rounded-full`}>{st.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="glass-card rounded-2xl p-6 animate-fade-up-delay-3">
          <h2 className="font-display text-xl font-light mb-1">Доход за неделю</h2>
          <p className="text-muted-foreground text-xs font-sans mb-5">₽ 107 800 итого</p>
          <div className="flex items-end gap-2 h-32">
            {revenueData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    d.day === 'Вс' ? 'bg-gold' : 'bg-[var(--gold-dim)] hover:bg-gold/50'
                  }`}
                  style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground font-sans">{d.day}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-sans">Лучший день</span>
              <span className="text-sm font-sans text-foreground">Суббота</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-sans">Рост к прошлой нед.</span>
              <span className="text-sm font-sans text-emerald-400">+18.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 animate-fade-up-delay-4">
        {[
          { icon: 'Zap', label: 'Запись за 10 сек', desc: 'Автозаполнение' },
          { icon: 'Bell', label: 'Уведомления', desc: '3 новых' },
          { icon: 'Download', label: 'Экспорт отчёта', desc: 'PDF / Excel' },
        ].map((action) => (
          <button
            key={action.label}
            className="glass-card rounded-2xl p-4 flex items-center gap-3 hover:border-gold/50 transition-all duration-300 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--gold-dim)] flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
              <Icon name={action.icon} size={18} className="text-gold" />
            </div>
            <div>
              <p className="font-sans font-medium text-sm text-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
