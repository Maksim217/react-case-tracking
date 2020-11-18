import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterTasks } from '../../redux/actions/tasks';

const TasksFilter = () => {
  const dispatch = useDispatch();
  const filterRef = useRef();

  useEffect(() => {
    window.M.FormSelect.init(filterRef.current);
  }, []);

  const filterHandler = (event) => {
    dispatch(setFilterTasks(event.target.value));
  };

  return (
    <div className="row">
      <div className="input-field s6 col">
        <select ref={filterRef} onChange={filterHandler}>
          <option value="all">All tasks</option>
          <option value="active">Active</option>
          <option value="outdated">Outdated</option>
          <option value="completed">Completed</option>
        </select>
        <label>Status filter</label>
      </div>
    </div>
  );
};

export default TasksFilter;
