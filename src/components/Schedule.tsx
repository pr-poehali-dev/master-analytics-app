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
  gold: { bg: 'bg-amber-900/70 border-amber-500/50', text: 'text-amber-200' },
  purple: { bg: 'bg-violet-900/70 border-violet-500/50', text: 'text-violet-200' },
  teal: { bg: 'bg-teal-900/70 border-teal-500/50', text: 'text-teal-200' },
};

const monthDays = Array.from({ length: 35 }, (_, i) => {
  const day = i - 2;
  const hasEvent = [1, 3, 5, 8, 10, 13, 15, 17, 20, 22, 24, 27].includes(day);
  const eventCount = hasEvent ? (day % 3) + 1 : 0;
  return { day, hasEvent, eventCount };
});

export default function Schedule() {
  const [mode, setMode] = useState<Mode>('day');

  return (
    <div className="px-4 py-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-up">
        <div>
          <p className="text-muted-foreground text-xs font-sans tracking-widest uppercase">Расписание</p>
          <h1 className="font-display text-3xl font-light mt-0.5">13–19 мая</h1>
        </div>
        <button className="flex items-center gap-1.5 bg-gold text-background text-xs font-sans font-medium px-3 py-1.5 rounded-xl gold-pulse">
          <Icon name="Plus" size={13} />
          Запись
        </button>
      </div>

      {/* Mode tabs */}
      <div className="flex glass-card rounded-xl overflow-hidden animate-fade-up-delay-1">
        {(['day', 'week', 'month'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2.5 text-xs font-sans transition-all duration-200 ${
              mode === m ? 'bg-[var(--gold-dim)] text-gold font-medium' : 'text-muted-foreground'
            }`}
          >
            {m === 'day' ? 'День' : m === 'week' ? 'Неделя' : 'Месяц'}
          </button>
        ))}
      </div>

      {/* Day view */}
      {mode === 'day' && (
        <div className="animate-fade-up">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <p className="font-display text-xl">Пятница, 16 мая</p>
                <p className="text-xs text-muted-foreground font-sans">7 записей · ₽ 18 400</p>
              </div>
              <div className="flex gap-1.5">
                <button className="p-2 glass-card rounded-lg">
                  <Icon name="ChevronLeft" size={15} className="text-muted-foreground" />
                </button>
                <button className="p-2 glass-card rounded-lg">
                  <Icon name="ChevronRight" size={15} className="text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-border/40">
              {hours.map((hour) => {
                const apt = appointments.find((a) => Math.floor(a.start) === hour && a.day === 1);
                return (
                  <div key={hour} className="flex gap-3 p-3 items-start">
                    <span className="text-xs text-muted-foreground font-sans w-10 shrink-0 pt-1">{hour}:00</span>
                    {apt ? (
                      <div className={`flex-1 rounded-xl p-3 border cursor-pointer ${colorMap[apt.color as keyof typeof colorMap].bg}`}>
                        <div className="flex items-center justify-between">
                          <p className={`font-sans font-medium text-sm ${colorMap[apt.color as keyof typeof colorMap].text}`}>
                            {apt.client}
                          </p>
                          <span className="text-xs text-muted-foreground">{apt.duration}ч</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{apt.service}</p>
                      </div>
                    ) : (
                      <div className="flex-1 border border-dashed border-border/20 rounded-xl p-2.5 flex items-center gap-2 opacity-40">
                        <Icon name="Plus" size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-sans">Свободно</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Week view - horizontal scroll */}
      {mode === 'week' && (
        <div className="animate-fade-up">
          {/* Week strip */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
            {weekDays.map((d, i) => (
              <div
                key={d}
                className={`flex flex-col items-center shrink-0 w-11 py-2 rounded-xl cursor-pointer transition-all ${
                  weekDates[i] === 16
                    ? 'bg-gold text-background'
                    : 'glass-card hover:border-gold/40'
                }`}
              >
                <span className={`text-[10px] font-sans ${weekDates[i] === 16 ? 'text-background/70' : 'text-muted-foreground'}`}>{d}</span>
                <span className={`font-display text-lg font-light leading-none mt-0.5 ${weekDates[i] === 16 ? 'text-background' : ''}`}>
                  {weekDates[i]}
                </span>
                {appointments.some((a) => a.day === i + 1) && weekDates[i] !== 16 && (
                  <div className="w-1 h-1 rounded-full bg-gold mt-1" />
                )}
              </div>
            ))}
          </div>

          {/* Appointments for selected week */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="divide-y divide-border/40">
              {hours.map((hour) => {
                const apt = appointments.find((a) => Math.floor(a.start) === hour && a.day === 5);
                return (
                  <div key={hour} className="flex gap-3 p-3 items-start">
                    <span className="text-xs text-muted-foreground font-sans w-10 shrink-0 pt-1">{hour}:00</span>
                    {apt ? (
                      <div className={`flex-1 rounded-xl p-3 border cursor-pointer ${colorMap[apt.color as keyof typeof colorMap].bg}`}>
                        <p className={`font-sans font-medium text-sm ${colorMap[apt.color as keyof typeof colorMap].text}`}>
                          {apt.client}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{apt.service}</p>
                      </div>
                    ) : (
                      <div className="flex-1 py-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Month view */}
      {mode === 'month' && (
        <div className="glass-card rounded-2xl p-4 animate-fade-up">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((d) => (
              <div key={d} className="text-center text-[10px] text-muted-foreground font-sans py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((cell, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-150 ${
                  cell.day === 16
                    ? 'bg-gold'
                    : cell.day > 0 && cell.day <= 31
                    ? 'hover:bg-[var(--surface-hover)]'
                    : 'opacity-20'
                }`}
              >
                <span className={`text-xs font-sans ${cell.day === 16 ? 'text-background font-semibold' : 'text-foreground'}`}>
                  {cell.day > 0 && cell.day <= 31 ? cell.day : ''}
                </span>
                {cell.hasEvent && cell.day > 0 && cell.day <= 31 && cell.day !== 16 && (
                  <div className="w-1 h-1 rounded-full bg-gold mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
