
export const createTaskResponse = (response, result) => {
    response.status(200).json({
        success: true,
        data: result
    })
}

export const taskNotFoundResponse = (response, result) => {
    response.status(404).json({
        success: false,
        message: "Task not found",
        data: []
    })
}

export const allTaskFoundResponse = (response, result, totalItems, pagination) => {
    response.status(200).json({
        success: true,
        message: "Tasks found",
        totalItems,
        pagination,
        data: result
    })
}

export const taskFoundResponse = (response, result) => {
    response.status(200).json({
        success: true,
        message: "Task found",
        data: result
    })
}

export const updateTaskResponse = (response, updateResult) => {
    if (updateResult.modifiedCount > 0) {
        return response.status(200).json({
            success: true,
            message: "Task updated",
        })
    }
    return response.status(200).json({
        success: false,
        message: "Task not updated",
    })
}