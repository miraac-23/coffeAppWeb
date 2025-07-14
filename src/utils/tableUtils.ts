import { Coffe } from "../types/coffeeTypes";

export const descendingComparator = <T extends Coffe>(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] === null) {
        return -1;
    }
    if (a[orderBy] === null) {
        return 1;
    }

    if (orderBy === 'ingredients') {
        const aLength = a.ingredients?.length || 0;
        const bLength = b.ingredients?.length || 0;
        return bLength - aLength;
    }

    if (b[orderBy]! < a[orderBy]!) {
        return -1;
    }
    if (b[orderBy]! > a[orderBy]!) {
        return 1;
    }
    return 0;
};

export const getComparator = <Key extends keyof Coffe>(
    order: 'asc' | 'desc',
    orderBy: Key
): (a: Coffe, b: Coffe) => number => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = <T extends Coffe>(array: T[], comparator: (a: T, b: T) => number) => {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};