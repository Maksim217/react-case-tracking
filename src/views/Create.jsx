import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTask } from '../redux/actions/tasks';

const Create = () => {
  const chipsRef = useRef();
  const datepickerRef = useRef();

  const [createData, setCreateData] = useState({
    title: '',
    description: '',
    chips: null,
    date: null,
  });

  useEffect(() => {
    const chips = window.M.Chips.init(chipsRef.current, {
      placeholder: 'Task tags',
    });

    const date = window.M.Datepicker.init(datepickerRef.current, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true,
    });

    setCreateData({ ...createData, chips, date });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeHandler = (event) => {
    setCreateData({ ...createData, [event.target.name]: event.target.value });
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const task = {
      id: Date.now(),
      title: createData.title,
      description: createData.description,
      status: 'active',
      tags: createData.chips.chipsData,
      date: createData.date.date,
    };

    dispatch(createTask(task));
    history.push('/tasks');
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Create task</h1>
        <form onSubmit={submitHandler}>
          <div className="input-field">
            <input
              id="title"
              name="title"
              type="text"
              className="validate"
              onChange={changeHandler}
              required
            />
            <label htmlFor="title">Title</label>
            <span className="helper-text" data-error="Title is required"></span>
          </div>
          <div className="chips" ref={chipsRef}></div>
          <div className="input-field">
            <textarea
              id="description"
              name="description"
              className="materialize-textarea"
              onChange={changeHandler}></textarea>
            <label htmlFor="description">Description</label>
            <span className="character-counter">{createData.description.length}/2048</span>
          </div>
          <input type="text" name="datepicker" ref={datepickerRef} />
          <button className="btn" type="submit">
            Create task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
