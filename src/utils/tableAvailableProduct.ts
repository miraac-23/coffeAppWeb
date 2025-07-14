export const descendingComparator = <T extends Record<string, any>>(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] === null) {
        return -1;
    }
    if (a[orderBy] === null) {
        return 1;
    }

    if (b[orderBy]! < a[orderBy]!) {
        return -1;
    }
    if (b[orderBy]! > a[orderBy]!) {
        return 1;
    }
    return 0;
};

export const getComparator = <Key extends string>(
    order: 'asc' | 'desc',
    orderBy: Key
): <T extends Record<Key, any>>(a: T, b: T) => number => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = <T extends Record<string, any>>(array: T[], comparator: (a: T, b: T) => number) => {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};