export type UserDataType = {
    username: string,
    email: string,
    password: string
}

export type UserFilterType = {
    email?: string,
    _id?: string
}

export type UserProjectionType = {
    _id?: boolean,
    __v?: boolean,
    username?: boolean,
    email?: boolean
}

export type UserOptionsType = {
    select?: string,
    sanitizeFilter?: boolean
}