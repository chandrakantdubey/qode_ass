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
    const processedData = data.map(d => ({
        ...d,
        benchmark: d.nav * 0.85
    }));

    return (
        <div className="flex flex-col">
            <div className="h-[400px] w-full mb-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={processedData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="date"
                            hide={true}
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            orientation="left"
                            tick={{ fontSize: 12, fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} />

                        <Line
                            type="monotone"
                            dataKey="benchmark"
                            name="NIFTY50"
                            stroke="#1d4ed8"
                            strokeWidth={1.5}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="nav"
                            name="Focused"
                            stroke="#16a34a"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="h-[150px] w-full -mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                            minTickGap={60}
                        />
                        <YAxis
                            orientation="left"
                            tick={{ fontSize: 12, fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                            domain={[-40, 0]}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} />
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