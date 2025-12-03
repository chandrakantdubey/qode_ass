import { useMemo, useState, useTransition, useEffect } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import EquityChart from '../components/EquityChart';
import DatePicker from '../components/DatePicker';
import { usePortfolioStore } from '../store/portfolioStore';
import { calculateTrailingReturns } from '../utils/calculations';

const Portfolio = () => {
    const {
        data,
        filteredEquityCurve,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        resetFilters
    } = usePortfolioStore();

    const [isPending, startTransition] = useTransition();
    const [displayData, setDisplayData] = useState(filteredEquityCurve);

    useEffect(() => {
        startTransition(() => {
            setDisplayData(filteredEquityCurve);
        });
    }, [filteredEquityCurve]);

    const returns = useMemo(() => {
        if (!data || !data.equityCurve) return null;
        return calculateTrailingReturns(data.equityCurve, endDate);
    }, [data, endDate]);

    // Mock benchmark data to match image appearance
    const benchmarkReturns = {
        name: "NIFTY50",
        ytd: "3.1%", d1: "0.1%", w1: "1.1%", m1: "1.4%", m3: "4.4%", m6: "16.2%",
        y1: "26.2%", y3: "16.0%", si: "14.5%", dd: "-1.5%", maxdd: "-38.4%"
    };

    const trailingReturns = [
        { name: "Focused", ...returns },
        benchmarkReturns,
    ];

    const columns = [
        { key: 'name', label: 'NAME', align: 'left' },
        { key: 'ytd', label: 'YTD' },
        { key: 'd1', label: '1D' },
        { key: 'w1', label: '1W' },
        { key: 'm1', label: '1M' },
        { key: 'm3', label: '3M' },
        { key: 'm6', label: '6M' },
        { key: 'y1', label: '1Y' },
        { key: 'y3', label: '3Y' },
        { key: 'si', label: 'SI' },
        { key: 'dd', label: 'DD' },
        { key: 'maxdd', label: 'MAXDD' },
    ];

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-[1400px] mx-auto bg-white px-8 py-20 min-h-screen">
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[18px] font-normal text-slate-900 tracking-tight">Trailing Returns</h2>
                        <button className="text-green-600 hover:bg-green-50 p-1.5 rounded transition-colors">
                            <Download className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="rounded-sm overflow-hidden">
                        <table className="w-full text-right border-collapse">
                            <thead className="bg-[#fafafa] border-b border-slate-100">
                                <tr className='border-b border-slate-300'>
                                    {columns.map((col) => (
                                        <th
                                            key={col.key}
                                            className={`
                                                px-6 py-4 font-medium text-[12px] text-slate-500 tracking-wider uppercase
                                                ${col.align === 'left' ? 'text-left' : 'text-right'}
                                                ${col.key === 'dd' ? 'border-l border-slate-300' : ''}
                                            `}
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {trailingReturns.map((row, idx) => (
                                    <tr key={idx} className={`hover:bg-slate-50 text-slate-700 transition-colors bg-white ${idx !== trailingReturns.length - 1 ? 'border-b border-slate-300' : ''}`}>
                                        {columns.map((col) => (
                                            <td
                                                key={col.key}
                                                className={`
                                                    px-6 py-4 text-[14px]
                                                    ${col.align === 'left' ? 'text-left text-slate-900' : 'text-right'}
                                                    ${col.key === 'dd' ? 'border-l border-slate-200' : ''}
                                                `}
                                            >
                                                {/* @ts-ignore */}
                                                {row[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-3 font-medium">Note: Returns above 1 year are annualised.</p>
                </div>

                {/* 2. Equity Curve Section */}
                <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-[18px] font-normal text-slate-900 tracking-tight">Equity curve</h2>
                            <div className="text-[11px] text-slate-400 font-medium translate-y-[2px]">
                                Live since 2019-01-01
                                <button
                                    onClick={resetFilters}
                                    className="text-green-500 hover:text-green-600 ml-2 inline-flex items-center gap-1 transition-colors"
                                >
                                    <RotateCcw className="h-3 w-3" /> Reset
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] text-slate-500 font-medium">From date</label>
                                <div className="w-[140px]">
                                    <DatePicker value={startDate} onChange={setStartDate} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] text-slate-500 font-medium">To date</label>
                                <div className="w-[140px]">
                                    <DatePicker value={endDate} onChange={setEndDate} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`transition-opacity duration-300 ${isPending ? 'opacity-60' : 'opacity-100'}`}>
                        <EquityChart data={displayData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;