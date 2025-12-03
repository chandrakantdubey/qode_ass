import { useMemo } from 'react';
import { Download } from 'lucide-react';
import EquityChart from '../components/EquityChart';
import portfolioData from '../data/portfolioData.json';

const Portfolio = () => {
    const { equityCurve } = portfolioData;

    // Mock data for the Trailing Returns table to match screenshot
    const trailingReturns = [
        { name: "Focused", ytd: "-1.7%", d1: "0.1%", w1: "2.9%", m1: "7.6%", m3: "2.2%", m6: "10.1%", y1: "43.5%", y3: "23.9%", si: "22.5%", dd: "-2.8%", maxdd: "-40.3%" },
        { name: "NIFTY50", ytd: "3.1%", d1: "0.1%", w1: "1.1%", m1: "1.4%", m3: "4.4%", m6: "16.2%", y1: "26.2%", y3: "16.0%", si: "14.5%", dd: "-1.5%", maxdd: "-38.4%" },
    ];

    return (
        <div className="bg-white min-h-screen pb-20 pt-6 px-8">
            <div className="max-w-[1400px] mx-auto">

                {/* Trailing Returns Section */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-slate-900">Trailing Returns</h2>
                        <button className="text-green-600 hover:bg-green-50 p-1 rounded">
                            <Download className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="border border-slate-200 rounded-sm overflow-hidden">
                        <table className="w-full text-sm text-right">
                            <thead className="bg-slate-50 text-slate-500 font-medium text-xs uppercase">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">Name</th>
                                    <th className="px-4 py-3 font-medium">YTD</th>
                                    <th className="px-4 py-3 font-medium">1D</th>
                                    <th className="px-4 py-3 font-medium">1W</th>
                                    <th className="px-4 py-3 font-medium">1M</th>
                                    <th className="px-4 py-3 font-medium">3M</th>
                                    <th className="px-4 py-3 font-medium">6M</th>
                                    <th className="px-4 py-3 font-medium">1Y</th>
                                    <th className="px-4 py-3 font-medium">3Y</th>
                                    <th className="px-4 py-3 font-medium">SI</th>
                                    <th className="px-4 py-3 font-medium">DD</th>
                                    <th className="px-4 py-3 font-medium">MAXDD</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {trailingReturns.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 text-slate-700">
                                        <td className="px-4 py-3 text-left">{row.name}</td>
                                        <td className="px-4 py-3">{row.ytd}</td>
                                        <td className="px-4 py-3">{row.d1}</td>
                                        <td className="px-4 py-3">{row.w1}</td>
                                        <td className="px-4 py-3">{row.m1}</td>
                                        <td className="px-4 py-3">{row.m3}</td>
                                        <td className="px-4 py-3">{row.m6}</td>
                                        <td className="px-4 py-3">{row.y1}</td>
                                        <td className="px-4 py-3">{row.y3}</td>
                                        <td className="px-4 py-3">{row.si}</td>
                                        <td className="px-4 py-3">{row.dd}</td>
                                        <td className="px-4 py-3">{row.maxdd}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Note: Returns above 1 year are annualised.</p>
                </div>

                {/* Equity Curve Section */}
                <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-semibold text-slate-900">Equity curve</h2>
                            <div className="text-xs text-slate-400">
                                Live since 2019-01-01 <span className="text-green-500 cursor-pointer ml-1">↺ Reset</span>
                            </div>
                        </div>

                        <div className="flex gap-4 text-sm mt-4 sm:mt-0">
                            <div className="flex flex-col">
                                <label className="text-xs text-slate-500 mb-1">From date</label>
                                <input type="date" defaultValue="2019-01-01" className="border border-slate-300 rounded px-3 py-1 text-slate-700" />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs text-slate-500 mb-1">To date</label>
                                <input type="date" defaultValue="2024-04-24" className="border border-slate-300 rounded px-3 py-1 text-slate-700" />
                            </div>
                        </div>
                    </div>

                    <EquityChart data={equityCurve} />
                </div>
            </div>
        </div>
    );
};

export default Portfolio;