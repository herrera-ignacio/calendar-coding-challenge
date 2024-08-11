export const getDaysInMonth = (month, year) => {
    return Array.from(
        { length: new Date(year, month, 0).getDate() }, // get next month, zeroth's (previous) day
        (_, i) => new Date(year, month - 1, i + 1) // get current month, ith day
    )
}