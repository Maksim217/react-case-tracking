import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './TasksList.module.css';
import { deleteTask } from '../../redux/actions/tasks';

const TasksList = ({ tasks }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.tasks);

  const deleteTaskById = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <Fragment>
      {tasks
        .filter((task) => {
          if (filter === 'all') {
            return true;
          }
          return task.status === filter;
        })
        .map((task, idx) => (
          <tr key={task.id}>
            <td>{idx + 1}</td>
            <td>{task.title}</td>
            <td>{new Date(task.date).toLocaleDateString()}</td>
            <td className={classes.description}>
              <div className={classes.description__text}>{task.description}</div>
            </td>
            <td>{task.status}</td>
            <td>
              <NavLink to={`/task/${task.id}`}>
                <button className="btn btn-small" style={{ marginRight: '1rem' }}>
                  Open
                </button>
              </NavLink>
              <button
                className="btn btn-small red darken-4"
                onClick={() => deleteTaskById(task.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
    </Fragment>
  );
};

export default TasksList;
