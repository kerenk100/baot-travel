export const parseDate = (dateString: string): Date | null => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // months are 0-based in JavaScript
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }
    return null;
};

export const formatDate = (date: Date | null) => {
    return date ? date.toISOString().split("T")[0] : "";
};