import { create } from 'zustand';
import { produce } from 'immer';
import portfolioData from '../data/portfolioData.json';

interface PortfolioState {
    data: typeof portfolioData;
    filteredEquityCurve: typeof portfolioData.equityCurve;
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    resetFilters: () => void;
}

// Helper to find min/max dates
const allDates = portfolioData.equityCurve.map(d => d.date);
const minDate = allDates[0];
const maxDate = allDates[allDates.length - 1];

export const usePortfolioStore = create<PortfolioState>((set) => ({
    data: portfolioData,
    filteredEquityCurve: portfolioData.equityCurve,
    startDate: minDate,
    endDate: maxDate,

    setStartDate: (date) => set(produce((state: PortfolioState) => {
        state.startDate = date;
        state.filteredEquityCurve = state.data.equityCurve.filter(d =>
            d.date >= state.startDate && d.date <= state.endDate
        );
    })),

    setEndDate: (date) => set(produce((state: PortfolioState) => {
        state.endDate = date;
        state.filteredEquityCurve = state.data.equityCurve.filter(d =>
            d.date >= state.startDate && d.date <= state.endDate
        );
    })),

    resetFilters: () => set(produce((state: PortfolioState) => {
        state.startDate = minDate;
        state.endDate = maxDate;
        state.filteredEquityCurve = state.data.equityCurve;
    })),
}));
