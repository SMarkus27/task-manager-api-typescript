export const paginationResult = (page: number, limit: number, endIndex: number, skip: number, totalItems: number) => {

    const pagination = {
        next: {},
        prev: {}
    }

    if (endIndex < totalItems) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (skip > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
    return pagination
}

export const calculateEndIndex = (page: number, limit: number): number => {
    return page * limit
}

export const calculateSkip = (page: number, limit: number): number => {
    return (page - 1) * limit
}