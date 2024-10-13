import { v4 as uuidv4 } from "uuid";

const reducer = (state, action) => {
    switch (action.action) {
        case "task/onInput":
            return {
                ...state,
                task: {
                    ...state.task,
                    [action.payload.name]: action.payload.value,
                },
            };
        case "tasks/onSave":
            return {
                ...state,
                tasks: [...state.tasks, state.task],
                task: {
                    id: uuidv4(),
                    name: "",
                    completed: false,
                },
            };
        case "task/onCompleted":
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.id) {
                        return {
                            ...task,
                            completed: !task.completed,
                        };
                    }
                    return task;
                }),
            };
        case "tasks/load":
            return {
                ...state,
                tasks: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
