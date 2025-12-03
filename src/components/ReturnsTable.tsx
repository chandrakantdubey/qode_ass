

interface ReturnsTableProps {
    data: {
        [year: string]: {
            [month: string]: number;
        };
    };
}

const ReturnsTable: React.FC<ReturnsTableProps> = ({ data }) => {
    const years = Object.keys(data).sort((a, b) => parseInt(b) - parseInt(a));
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const getColorClass = (value: number | undefined) => {
        if (value === undefined) return 'text-slate-300';
        if (value > 0) return 'text-emerald-600 font-medium';
        if (value < 0) return 'text-red-500 font-medium';
        return 'text-slate-500';
    };

    const formatValue = (value: number | undefined) => {
        if (value === undefined) return '-';
        return `${value.toFixed(2)}%`;
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 z-10 border-r border-slate-200">
                            Year
                        </th>
                        {months.map((month) => (
                            <th key={month} scope="col" className="px-3 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                                {month}
                            </th>
                        ))}
                        <th scope="col" className="px-3 py-3 text-center text-xs font-bold text-slate-900 uppercase tracking-wider bg-slate-100 border-l border-slate-200">
                            YTD
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {years.map((year) => (
                        <tr key={year} className="hover:bg-slate-50 transition-colors">
                            <td className="px-3 py-3 whitespace-nowrap text-sm font-bold text-slate-900 sticky left-0 bg-white z-10 border-r border-slate-200">
                                {year}
                            </td>
                            {months.map((_, index) => {
                                const monthNum = index + 1;
                                const value = data[year][monthNum];
                                return (
                                    <td key={monthNum} className={`px-3 py-3 whitespace-nowrap text-sm text-center ${getColorClass(value)}`}>
                                        {formatValue(value)}
                                    </td>
                                );
                            })}
                            <td className={`px-3 py-3 whitespace-nowrap text-sm text-center font-bold bg-slate-50 border-l border-slate-200 ${getColorClass(data[year]['YTD'])}`}>
                                {formatValue(data[year]['YTD'])}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReturnsTable;
