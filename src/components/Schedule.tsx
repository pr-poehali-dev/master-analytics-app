import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Mode = 'day' | 'week' | 'month';

const hours = Array.from({ length: 11 }, (_, i) => i + 9);

const appointments = [
  { id: 1, client: 'Анна С.', service: 'Маникюр + гель', start: 10, duration: 1.5, color: 'gold', day: 1 },
  { id: 2, client: 'Мария И.', service: 'Педикюр spa', start: 12, duration: 1, color: 'purple', day: 1 },
  { id: 3, client: 'Ольга П.', service: 'Наращивание', start: 14.5, duration: 2, color: 'gold', day: 1 },
  { id: 4, client: 'Елена К.', service: 'Коррекция', start: 17, duration: 1, color: 'teal', day: 1 },
  { id: 5, client: 'Виктория С.', service: 'Маникюр', start: 11, duration: 1, color: 'purple', day: 2 },
  { id: 6, client: 'Наталья Б.', service: 'Педикюр', start: 13.5, duration: 1.5, color: 'teal', day: 3 },
  { id: 7, client: 'Светлана М.', service: 'Наращивание', start: 10, duration: 2.5, color: 'gold', day: 4 },
  { id: 8, client: 'Дарья В.', service: 'Маникюр spa', start: 15, duration: 1, color: 'teal', day: 5 },
];

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const weekDates = [13, 14, 15, 16, 17, 18, 19];

const colorMap = {
  gold: { bg: 'bg-amber-900/60 border-amber-500/50', text: 'text-amber-200' },
  purple: { bg: 'bg-violet-900/60 border-violet-500/50', text: 'text-violet-200' },
  teal: { bg: 'bg-teal-900/60 border-teal-500/50', text: 'text-teal-200' },
};

const monthDays = Array.from({ length: 35 }, (_, i) => {
  const day = i - 2;
  const hasEvent = [1, 3, 5, 8, 10, 13, 15, 17, 20, 22, 24, 27].includes(day);
  const eventCount = hasEvent ? Math.floor(Math.random() * 4) + 1 : 0;
  return { day, hasEvent, eventCount };
});

export default function Schedule() {
  const [mode, setMode] = useState<Mode>('week');

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between animate-fade-up">
        <div>
          <p className="text-muted-foreground text-xs font-sans tracking-widest uppercase">Расписание</p>
          <h1 className="font-display text-3xl font-light mt-0.5">13–19 мая, 2026</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex glass-card rounded-xl overflow-hidden">
            {(['day', 'week', 'month'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 text-xs font-sans transition-all duration-200 ${
                  mode === m
                    ? 'bg-[var(--gold-dim)] text-gold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {m === 'day' ? 'День' : m === 'week' ? 'Неделя' : 'Месяц'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-gold text-background text-xs font-sans font-medium px-4 py-2 rounded-xl hover:bg-gold-light transition-colors gold-pulse">
            <Icon name="Plus" size={14} />
            Запись
          </button>
        </div>
      </div>

      {mode === 'week' && (
        <div className="glass-card rounded-2xl overflow-hidden animate-fade-up">
          {/* Day headers */}
          <div className="grid border-b border-border" style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}>
            <div className="p-3" />
            {weekDays.map((d, i) => (
              <div
                key={d}
                className={`p-3 text-center border-l border-border ${weekDates[i] === 16 ? 'bg-[var(--gold-dim)]' : ''}`}
              >
                <p className="text-xs text-muted-foreground font-sans">{d}</p>
                <p className={`font-display text-xl font-light mt-0.5 ${weekDates[i] === 16 ? 'text-gold' : ''}`}>
                  {weekDates[i]}
                </p>
              </div>
            ))}
          </div>

          {/* Time grid */}
          <div className="relative overflow-y-auto max-h-[500px]">
            {hours.map((hour) => (
              <div
                key={hour}
                className="grid border-b border-border/50"
                style={{ gridTemplateColumns: '60px repeat(7, 1fr)', minHeight: '60px' }}
              >
                <div className="p-2 text-right pr-3 pt-1">
                  <span className="text-xs text-muted-foreground font-sans">{hour}:00</span>
                </div>
                {weekDays.map((_, dayIdx) => {
                  const dayApts = appointments.filter(
                    (a) => a.day === dayIdx + 1 && Math.floor(a.start) === hour
                  );
                  return (
                    <div key={dayIdx} className="border-l border-border/50 relative p-1">
                      {dayApts.map((apt) => {
                        const colors = colorMap[apt.color as keyof typeof colorMap];
                        return (
                          <div
                            key={apt.id}
                            className={`absolute inset-x-1 rounded-lg border p-1.5 cursor-pointer hover:brightness-110 transition-all duration-150 ${colors.bg}`}
                            style={{
                              top: `${(apt.start - Math.floor(apt.start)) * 60}px`,
                              height: `${apt.duration * 60 - 4}px`,
                            }}
                          >
                            <p className={`text-xs font-sans font-medium truncate ${colors.text}`}>{apt.client}</p>
                            {apt.duration > 1 && (
                              <p className="text-xs text-muted-foreground font-sans truncate">{apt.service}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === 'day' && (
        <div className="glass-card rounded-2xl overflow-hidden animate-fade-up">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <p className="font-display text-2xl">Пятница, 16 мая</p>
              <p className="text-xs text-muted-foreground font-sans mt-0.5">7 записей · ₽ 18 400</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 glass-card rounded-lg hover:border-gold/50 transition-all">
                <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
              </button>
              <button className="p-2 glass-card rounded-lg hover:border-gold/50 transition-all">
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="divide-y divide-border/50">
            {hours.map((hour) => {
              const apt = appointments.find((a) => Math.floor(a.start) === hour && a.day === 1);
              return (
                <div key={hour} className="flex gap-4 p-3 hover:bg-[var(--surface-hover)] transition-colors">
                  <span className="text-xs text-muted-foreground font-sans w-10 pt-0.5 shrink-0">{hour}:00</span>
                  {apt ? (
                    <div className={`flex-1 rounded-xl p-3 border cursor-pointer ${colorMap[apt.color as keyof typeof colorMap].bg}`}>
                      <div className="flex items-center justify-between">
                        <p className={`font-sans font-medium text-sm ${colorMap[apt.color as keyof typeof colorMap].text}`}>
                          {apt.client}
                        </p>
                        <span className="text-xs text-muted-foreground">{apt.duration}ч</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-sans mt-0.5">{apt.service}</p>
                    </div>
                  ) : (
                    <div className="flex-1 border border-dashed border-border/30 rounded-xl p-3 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Icon name="Plus" size={14} className="text-muted-foreground mr-1" />
                      <span className="text-xs text-muted-foreground font-sans">Добавить запись</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {mode === 'month' && (
        <div className="glass-card rounded-2xl p-6 animate-fade-up">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((d) => (
              <div key={d} className="text-center text-xs text-muted-foreground font-sans py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((cell, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl p-1.5 flex flex-col items-center cursor-pointer transition-all duration-150 ${
                  cell.day === 16
                    ? 'bg-[var(--gold-dim)] border border-gold/40'
                    : cell.day > 0 && cell.day <= 31
                    ? 'hover:bg-[var(--surface-hover)]'
                    : 'opacity-20'
                }`}
              >
                <span className={`text-xs font-sans ${cell.day === 16 ? 'text-gold font-medium' : 'text-foreground'}`}>
                  {cell.day > 0 && cell.day <= 31 ? cell.day : ''}
                </span>
                {cell.hasEvent && cell.day > 0 && cell.day <= 31 && (
                  <div className="flex gap-0.5 mt-auto">
                    {Array.from({ length: Math.min(cell.eventCount, 3) }).map((_, j) => (
                      <div key={j} className="w-1 h-1 rounded-full bg-gold opacity-70" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
