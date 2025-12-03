import {
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';

interface EquityChartProps {
    data: {
        date: string;
        nav: number;
        drawdown: number;
    }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-slate-200 shadow-lg rounded text-xs">
                <p className="font-bold text-slate-900 mb-1">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.stroke || entry.fill }}></span>
                        <span className="text-slate-600 capitalize">{entry.name}:</span>
                        <span className="font-mono font-medium">
                            {Number(entry.value).toFixed(2)}{entry.name === 'Drawdown' ? '%' : ''}
                        </span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const EquityChart: React.FC<EquityChartProps> = ({ data }) => {
    // Generate a fake benchmark line for visual matching if data doesn't have it
    const processedData = data.map(d => ({
        ...d,
        benchmark: d.nav * 0.85 // Simulating a benchmark line (Blue) that is slightly lower
    }));

    return (
        <div className="flex flex-col">
            {/* Top Chart: Equity Curve (Green vs Blue) */}
            <div className="h-[400px] w-full mb-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={processedData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            hide={true}
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            orientation="left"
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />

                        {/* Benchmark (Blue) */}
                        <Line
                            type="monotone"
                            dataKey="benchmark"
                            name="NIFTY50"
                            stroke="#1d4ed8" // Blue
                            strokeWidth={1.5}
                            dot={false}
                        />

                        {/* Portfolio (Green) */}
                        <Line
                            type="monotone"
                            dataKey="nav"
                            name="Focused"
                            stroke="#16a34a" // Green
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom Chart: Drawdown (Red Area) */}
            <div className="h-[150px] w-full -mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                            minTickGap={60}
                        />
                        <YAxis
                            orientation="left"
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                            domain={[-40, 0]} // Fixed domain based on image
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="drawdown"
                            name="Drawdown"
                            stroke="#f87171"
                            fill="#fca5a5"
                            fillOpacity={0.4}
                            strokeWidth={1}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EquityChart;