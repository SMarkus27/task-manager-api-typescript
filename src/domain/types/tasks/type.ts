export type TaskDataType = {
    name?: string,
    description?: string,
    completed?: boolean,
    user?: string
}

export type UpdateTaskDataType = {
    newData: {
        name: string,
        description: string,
        completed: boolean,
    },
    user: string

}

export type TaskFilterType = {
    _id?: string
}

export type TaskProjectionType = {
    _id?: boolean,
    __v?: boolean,
    name?: boolean,
    description?: boolean,
    completed?: boolean,
    user?: boolean
}
