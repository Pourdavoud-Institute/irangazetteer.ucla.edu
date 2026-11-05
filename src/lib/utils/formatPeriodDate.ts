/** Helper to format a historical period date as BCE or CE. */
export const formatPeriodDate = (num: number): string => {
    return `${new Intl.NumberFormat('en-US').format(Math.abs(num))} ${num < 0 ? 'BCE' : 'CE'}`;
};
