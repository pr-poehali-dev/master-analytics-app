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
  { icon: 'TrendingUp', label: 'Рост дохода', value: '+22% к прошлому месяцу' },
  { icon: 'Star', label: 'Топ услуга', value: 'Маникюр + гель' },
  { icon: 'Clock', label: 'Пиковое время', value: 'Пт–Сб, 12:00–17:00' },
  { icon: 'UserCheck', label: 'Возврат клиентов', value: '78% повторных' },
];

export default function Analytics() {
  return (
    <div className="px-4 py-5 space-y-5">
      <div className="animate-fade-up">
        <p className="text-muted-foreground text-xs font-sans tracking-widest uppercase">Статистика</p>
        <h1 className="font-display text-3xl font-light mt-0.5">Аналитика</h1>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 animate-fade-up-delay-1">
        {[
          { label: 'Доход за май', value: '₽ 119 400', sub: '+22% к апрелю' },
          { label: 'Клиентов', value: '42', sub: 'новых: 8' },
          { label: 'Записей', value: '129', sub: 'загруженность 87%' },
          { label: 'Средний чек', value: '₽ 2 940', sub: '+₽ 180' },
        ].map((kpi) => (
          <div key={kpi.label} className="glass-card rounded-2xl p-4">
            <p className="font-display text-xl font-light text-gold">{kpi.value}</p>
            <p className="font-sans font-medium text-xs text-foreground mt-1">{kpi.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="glass-card rounded-2xl p-4 animate-fade-up-delay-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-sans font-medium text-sm">Динамика дохода</p>
            <p className="text-xs text-muted-foreground">Янв — Май 2026</p>
          </div>
          <span className="text-xs font-sans text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">+45%</span>
        </div>
        <div className="flex items-end gap-2 h-24">
          {monthlyData.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-0.5 items-end" style={{ height: '72px' }}>
                <div
                  className={`flex-1 rounded-t-md transition-all duration-700 ${i === monthlyData.length - 1 ? 'bg-gold' : 'bg-[var(--gold-dim)]'}`}
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                />
                <div
                  className="flex-1 rounded-t-md bg-violet-500/20"
                  style={{ height: `${(d.clients / 42) * 100}%` }}
                />
              </div>
              <span className={`text-[9px] font-sans ${i === monthlyData.length - 1 ? 'text-gold font-medium' : 'text-muted-foreground'}`}>
                {d.month}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-[10px] text-muted-foreground font-sans">Доход</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-violet-400" />
            <span className="text-[10px] text-muted-foreground font-sans">Клиенты</span>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="glass-card rounded-2xl p-4 animate-fade-up-delay-3">
        <h2 className="font-display text-xl font-light mb-3">Инсайты</h2>
        <div className="space-y-1">
          {insights.map((ins) => (
            <div key={ins.label} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--surface-hover)] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[var(--gold-dim)] flex items-center justify-center shrink-0">
                <Icon name={ins.icon} size={13} className="text-gold" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-sans">{ins.label}</p>
                <p className="font-sans text-sm font-medium">{ins.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="glass-card rounded-2xl p-4 animate-fade-up-delay-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-light">Услуги</h2>
          <button className="flex items-center gap-1.5 text-xs font-sans text-gold">
            <Icon name="Download" size={12} />
            Экспорт
          </button>
        </div>
        <div className="space-y-4">
          {services.map((s) => (
            <div key={s.name}>
              <div className="flex items-center justify-between mb-1">
                <p className="font-sans text-sm">{s.name}</p>
                <span className="text-xs font-sans text-gold font-medium">₽ {(s.revenue / 1000).toFixed(0)}K</span>
              </div>
              <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                  style={{ width: `${s.percent}%` }}
                />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[10px] text-muted-foreground">{s.count} записей</span>
                <span className="text-[10px] text-muted-foreground">{s.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
