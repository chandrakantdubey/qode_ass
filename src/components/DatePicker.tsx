import React, { useState, useRef, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
    value: string;
    onChange: (date: string) => void;
    label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value) {
            const date = parseISO(value);
            if (!isNaN(date.getTime())) {
                setCurrentMonth(date);
            }
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const startDay = startOfMonth(currentMonth).getDay();
    const placeholders = Array.from({ length: startDay });

    const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    const handleDateClick = (day: Date) => {
        onChange(format(day, 'yyyy-MM-dd'));
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            <div
                className="flex items-center gap-2 px-3 py-2 bg-white rounded-md border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <CalendarIcon className="h-4 w-4 text-slate-400" />
                <div className="flex flex-col">
                    {label && <span className="text-[10px] text-slate-400 font-medium leading-none mb-0.5">{label}</span>}
                    <span className="text-sm font-medium text-slate-700 leading-none">
                        {value ? format(parseISO(value), 'MMM dd, yyyy') : 'Select date'}
                    </span>
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-full mt-2 left-0 bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-4 w-64 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 rounded-full text-slate-500">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="font-semibold text-slate-700 text-sm">
                            {format(currentMonth, 'MMMM yyyy')}
                        </span>
                        <button onClick={handleNextMonth} className="p-1 hover:bg-slate-100 rounded-full text-slate-500">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                            <div key={d} className="text-center text-xs font-medium text-slate-400 py-1">
                                {d}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {placeholders.map((_, i) => (
                            <div key={`placeholder-${i}`} />
                        ))}
                        {days.map(day => {
                            const isSelected = value ? isSameDay(day, parseISO(value)) : false;
                            return (
                                <button
                                    key={day.toISOString()}
                                    onClick={() => handleDateClick(day)}
                                    className={`
                                        h-8 w-8 rounded-full text-sm flex items-center justify-center transition-colors
                                        ${isSelected
                                            ? 'bg-green-600 text-white font-medium'
                                            : 'text-slate-700 hover:bg-slate-100'}
                                    `}
                                >
                                    {format(day, 'd')}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
