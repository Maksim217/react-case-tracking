import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskById, updateTask, comleteTask } from '../redux/actions/tasks';

const Task = () => {
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state.tasks);

  const chipsRef = useRef();
  const datepickerRef = useRef();

  const [updateData, setUpdateData] = useState({
    description: '',
    chips: null,
    date: null,
  });

  const taskId = +useParams().id;

  useEffect(() => {
    dispatch(fetchTaskById(taskId));

    window.M.updateTextFields();

    const chips = window.M.Chips.init(chipsRef.current, {
      placeholder: 'Task tags',
      data: task ? task.tags : [],
    });

    const date = window.M.Datepicker.init(datepickerRef.current, {
      format: 'dd.mm.yyyy',
      defaultDate: task ? new Date(task.date) : new Date(),
      setDefaultDate: true,
    });

    setUpdateData({ ...updateData, chips, date });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  const changeHandler = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const updatedTask = {
      id: task.id,
      description: updateData.description,
      tags: updateData.chips.chipsData,
      date: updateData.date.date,
    };

    dispatch(updateTask(updatedTask));
    history.push('/tasks');
  };

  const completeTaskHandler = () => {
    dispatch(comleteTask(taskId));
    history.push('/tasks');
  };

  return (
    <Fragment>
      {task ? (
        <div className="row">
          <div className="col s6 offset-s3">
            <h1>{task.title}</h1>{' '}
            <form onSubmit={submitHandler}>
              <div className="chips" ref={chipsRef}></div>
              <div className="input-field">
                <textarea
                  id="description"
                  name="description"
                  style={{ minHeight: '300px' }}
                  className="materialize-textarea"
                  defaultValue={task.description}
                  onChange={changeHandler}></textarea>
                <label htmlFor="description">Description</label>
                <span className="character-counter">{task.description.length}/2048</span>
              </div>
              <input type="text" name="datepicker" ref={datepickerRef} />
              {task.status !== 'completed' && (
                <div>
                  <button style={{ marginRight: '1rem' }} className="btn" type="submit">
                    Update task
                  </button>
                  <button className="btn" onClick={completeTaskHandler}>
                    Complete task
                  </button>
                </div>
              )}
            </form>{' '}
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </Fragment>
  );
};

export default Task;
