export const dateFormated = (created_at: string) => {
    const parseDate = Date.parse(created_at);
    const dateNow = Date.now();
    const resultMilliseconds = parseDate - dateNow;
    const parseResult = new Date(resultMilliseconds);
    const yearsAgo = 1969 - parseResult.getFullYear();
    const monthsAgo = 11 - parseResult.getMonth();
    const daysAgo = 31 - parseResult.getDate();
    const hoursAgo = 23 - parseResult.getHours();
    const minutesAgo = 60 - parseResult.getMinutes();

    if (minutesAgo < 60 && hoursAgo < 1) {
        return `${minutesAgo} minutes ago`;
    }
    if (hoursAgo >= 1 && daysAgo < 1) {
        return `${hoursAgo} hours ago`;
    }
    if (daysAgo >= 1 && monthsAgo < 1) {
        return `${daysAgo} days ago`;
    }
    if (monthsAgo >= 1 && yearsAgo < 1) {
        return `${monthsAgo} months ago`;
    }
    if (yearsAgo > 1) {
        return `${yearsAgo} years ago`;
    }
};
