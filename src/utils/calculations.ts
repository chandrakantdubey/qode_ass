import { format, subDays, subMonths, subYears, parseISO, startOfYear } from 'date-fns';

interface DataPoint {
    date: string;
    nav: number;
    drawdown: number;
}

export const calculateTrailingReturns = (data: DataPoint[], endDateStr?: string) => {
    if (!data || data.length === 0) return null;

    let latestIndex = data.length - 1;
    if (endDateStr) {
        const foundIndex = data.findIndex(d => d.date === endDateStr);
        if (foundIndex !== -1) {
            latestIndex = foundIndex;
        } else {
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].date <= endDateStr) {
                    latestIndex = i;
                    break;
                }
            }
        }
    }

    const latest = data[latestIndex];
    const latestDate = parseISO(latest.date);
    const latestNav = latest.nav;

    const historicalData = data.slice(0, latestIndex + 1);

    const findNavOnDate = (targetDate: Date) => {
        const targetIso = format(targetDate, 'yyyy-MM-dd');
        for (let i = historicalData.length - 1; i >= 0; i--) {
            if (historicalData[i].date <= targetIso) {
                return historicalData[i].nav;
            }
        }
        return historicalData[0].nav;
    };

    const calculateReturn = (pastNav: number) => {
        return ((latestNav - pastNav) / pastNav) * 100;
    };

    const calculateCAGR = (pastNav: number, years: number) => {
        return (Math.pow(latestNav / pastNav, 1 / years) - 1) * 100;
    };

    const nav1D = historicalData.length > 1 ? historicalData[historicalData.length - 2].nav : latestNav;
    const ret1D = calculateReturn(nav1D);

    const date1W = subDays(latestDate, 7);
    const nav1W = findNavOnDate(date1W);
    const ret1W = calculateReturn(nav1W);

    const date1M = subMonths(latestDate, 1);
    const nav1M = findNavOnDate(date1M);
    const ret1M = calculateReturn(nav1M);
    const date3M = subMonths(latestDate, 3);
    const nav3M = findNavOnDate(date3M);
    const ret3M = calculateReturn(nav3M);

    const date6M = subMonths(latestDate, 6);
    const nav6M = findNavOnDate(date6M);
    const ret6M = calculateReturn(nav6M);
    const date1Y = subYears(latestDate, 1);
    const nav1Y = findNavOnDate(date1Y);
    const ret1Y = calculateReturn(nav1Y);

    const date3Y = subYears(latestDate, 3);
    const nav3Y = findNavOnDate(date3Y);
    const ret3Y = calculateCAGR(nav3Y, 3);
    const dateYTD = startOfYear(latestDate);
    const navYTD = findNavOnDate(dateYTD);
    const retYTD = calculateReturn(navYTD);

    const startNav = data[0].nav;
    const startDate = parseISO(data[0].date);
    const totalYears = (latestDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    const retSI = calculateCAGR(startNav, totalYears);

    const currentDD = latest.drawdown;
    const maxDD = Math.min(...historicalData.map(d => d.drawdown));

    const formatPercent = (val: number) => `${val >= 0 ? '' : ''}${val.toFixed(1)}%`;

    return {
        ytd: formatPercent(retYTD),
        d1: formatPercent(ret1D),
        w1: formatPercent(ret1W),
        m1: formatPercent(ret1M),
        m3: formatPercent(ret3M),
        m6: formatPercent(ret6M),
        y1: formatPercent(ret1Y),
        y3: formatPercent(ret3Y),
        si: formatPercent(retSI),
        dd: formatPercent(currentDD),
        maxdd: formatPercent(maxDD)
    };
};

export const downsampleData = (data: DataPoint[], threshold: number = 500) => {
    if (data.length <= threshold) return data;

    const sampled = [];
    const step = Math.ceil(data.length / threshold);

    for (let i = 0; i < data.length; i += step) {
        sampled.push(data[i]);
    }

    if (sampled[sampled.length - 1] !== data[data.length - 1]) {
        sampled.push(data[data.length - 1]);
    }

    return sampled;
};
