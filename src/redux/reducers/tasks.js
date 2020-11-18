import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASK_SUCCESS,
  ADD_TASK,
  UPDATE_TASKS,
  CLEAR_TASK,
  COMPLETE_TASK_SUCCESS,
  SET_FILTER,
} from '../actions/actionTypes';

const initialState = {
  tasks: [],
  task: null,
  filter: 'all',
};

export function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
      };
    case FETCH_TASK_SUCCESS:
      return {
        ...state,
        task: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case UPDATE_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case CLEAR_TASK:
      return {
        ...state,
        task: null,
      };
    case COMPLETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}
