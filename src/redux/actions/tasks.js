import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASK_SUCCESS,
  ADD_TASK,
  UPDATE_TASKS,
  CLEAR_TASK,
  COMPLETE_TASK_SUCCESS,
  SET_FILTER,
} from './actionTypes';

export function fetchTasks() {
  return (dispatch) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    dispatch(fetchTasksSuccess(tasks));
  };
}

export function fetchTaskById(taskId) {
  return (dispatch, getState) => {
    const { tasks } = getState().tasks;
    const task = tasks.find((task) => task.id === taskId);
    dispatch(fetchTaskSuccess(task));
  };
}

export function createTask(task) {
  return (dispatch, getState) => {
    dispatch(addTask(task));
    const { tasks } = getState().tasks;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
}

export function updateTask({ id, description, date, tags }) {
  return (dispatch, getState) => {
    const { tasks } = getState().tasks;
    const copyTasks = [...tasks];
    const idx = copyTasks.findIndex((task) => task.id === id);
    const task = copyTasks[idx];
    const status = new Date(date) > new Date() ? 'active' : 'outdated';
    copyTasks[idx] = { ...task, date, description, tags, status };
    dispatch(updateTasks(copyTasks));
    dispatch(clearTask());
    localStorage.setItem('tasks', JSON.stringify(copyTasks));
  };
}

export function comleteTask(taskId) {
  return (dispatch, getState) => {
    const { tasks } = getState().tasks;
    const copyTasks = [...tasks];
    const idx = copyTasks.findIndex((task) => task.id === taskId);
    copyTasks[idx].status = 'completed';
    dispatch(comleteTaskSuccess(copyTasks));
    localStorage.setItem('tasks', JSON.stringify(copyTasks));
  };
}

export function setFilterTasks(filter) {
  return {
    type: SET_FILTER,
    payload: filter,
  };
}

export function deleteTask(taskId) {
  return (dispatch, getState) => {
    const { tasks } = getState().tasks;
    const newTasksList = tasks.filter((task) => task.id !== taskId);
    dispatch(updateTasks(newTasksList));
    localStorage.setItem('tasks', JSON.stringify(newTasksList));
  };
}

function fetchTasksSuccess(tasks) {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
  };
}

function fetchTaskSuccess(task) {
  return {
    type: FETCH_TASK_SUCCESS,
    payload: task,
  };
}

function addTask(task) {
  return {
    type: ADD_TASK,
    payload: task,
  };
}

function updateTasks(tasks) {
  return {
    type: UPDATE_TASKS,
    payload: tasks,
  };
}

function clearTask() {
  return {
    type: CLEAR_TASK,
  };
}

function comleteTaskSuccess(tasks) {
  return {
    type: COMPLETE_TASK_SUCCESS,
    payload: tasks,
  };
}
