import Icon from '@/components/ui/icon';

const monthlyData = [
  { month: 'Янв', revenue: 82400, clients: 28 },
  { month: 'Фев', revenue: 91200, clients: 31 },
  { month: 'Мар', revenue: 108600, clients: 38 },
  { month: 'Апр', revenue: 97800, clients: 35 },
  { month: 'Май', revenue: 119400, clients: 42 },
];

const services = [
  { name: 'Маникюр + гель', count: 48, revenue: 134400, percent: 35 },
  { name: 'Педикюр spa', count: 32, revenue: 102400, percent: 27 },
  { name: 'Наращивание', count: 21, revenue: 113400, percent: 22 },
  { name: 'Коррекция', count: 28, revenue: 67200, percent: 16 },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

const insights = [
  { icon: 'TrendingUp', label: 'Рост дохода', value: '+22% к прошлому месяцу', positive: true },
  { icon: 'Star', label: 'Топ услуга', value: 'Маникюр + гель', positive: true },
  { icon: 'Clock', label: 'Пиковое время', value: 'Пт–Сб, 12:00–17:00', positive: true },
  { icon: 'UserCheck', label: 'Возврат клиентов', value: '78% повторных записей', positive: true },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="animate-fade-up">
        <p className="text-muted-foreground text-xs font-sans tracking-widest uppercase">Аналитика</p>
        <h1 className="font-display text-3xl font-light mt-0.5">Доход и статистика</h1>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up-delay-1">
        {[
          { label: 'Доход за май', value: '₽ 119 400', sub: 'на 22% больше апреля' },
          { label: 'Клиентов в мае', value: '42', sub: 'новых: 8' },
          { label: 'Записей в мае', value: '129', sub: 'загруженность 87%' },
          { label: 'Средний чек', value: '₽ 2 940', sub: '+₽ 180 к апрелю' },
        ].map((kpi) => (
          <div key={kpi.label} className="glass-card rounded-2xl p-5">
            <p className="font-display text-2xl font-light text-gold">{kpi.value}</p>
            <p className="font-sans font-medium text-sm text-foreground mt-1">{kpi.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 animate-fade-up-delay-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display text-xl font-light">Динамика дохода</h2>
              <p className="text-xs text-muted-foreground font-sans mt-0.5">Январь — Май 2026</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-sans text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gold" />
                Доход
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-violet-400" />
                Клиенты
              </div>
            </div>
          </div>

          <div className="flex items-end gap-3 h-40">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end" style={{ height: '120px' }}>
                  <div
                    className="flex-1 rounded-t-lg bg-[var(--gold-dim)] hover:bg-gold/40 transition-colors cursor-pointer relative group"
                    style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background border border-border rounded-lg px-2 py-1 text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      ₽ {d.revenue.toLocaleString()}
                    </div>
                  </div>
                  <div
                    className="flex-1 rounded-t-lg bg-violet-500/20 hover:bg-violet-500/30 transition-colors"
                    style={{ height: `${(d.clients / 42) * 100}%` }}
                  />
                </div>
                <span className={`text-xs font-sans ${i === monthlyData.length - 1 ? 'text-gold font-medium' : 'text-muted-foreground'}`}>
                  {d.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="glass-card rounded-2xl p-6 animate-fade-up-delay-3 space-y-4">
          <h2 className="font-display text-xl font-light">Инсайты</h2>
          {insights.map((ins) => (
            <div key={ins.label} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--surface-hover)] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[var(--gold-dim)] flex items-center justify-center shrink-0 mt-0.5">
                <Icon name={ins.icon} size={14} className="text-gold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-sans">{ins.label}</p>
                <p className="font-sans text-sm font-medium text-foreground mt-0.5">{ins.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services breakdown */}
      <div className="glass-card rounded-2xl p-6 animate-fade-up-delay-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-light">Популярность услуг</h2>
          <button className="flex items-center gap-2 text-xs font-sans text-gold border border-[var(--glass-border)] px-3 py-1.5 rounded-full hover:border-gold/50 transition-all">
            <Icon name="Download" size={12} />
            Экспорт
          </button>
        </div>
        <div className="space-y-4">
          {services.map((s) => (
            <div key={s.name}>
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-sans text-sm font-medium">{s.name}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-sans">
                  <span>{s.count} записей</span>
                  <span className="text-gold font-medium">₽ {s.revenue.toLocaleString()}</span>
                </div>
              </div>
              <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-700"
                  style={{ width: `${s.percent}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground font-sans mt-0.5">{s.percent}% от выручки</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
