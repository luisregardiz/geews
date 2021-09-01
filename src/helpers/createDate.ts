export const createDate = (date: string) => {
    const createDate = new Date(date);
    const year = createDate.getFullYear();
    const month = createDate.getMonth();
    const day = createDate.getDate();
    const result = `${day}/${month + 1}/${year}`;
    return result;
};
