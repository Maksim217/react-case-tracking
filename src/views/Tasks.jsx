import React from 'react';
import { useSelector } from 'react-redux';
import { TasksList, TasksFilter } from '../components/index';

const Tasks = () => {
  const { tasks } = useSelector((state) => state.tasks);

  const renderTableHead = () => {
    const listTitles = ['#', 'Title', 'Date', 'Description', 'Status', 'Open / Delete'];

    return listTitles.map((title, idx) => <th key={idx + title}>{title}</th>);
  };

  return (
    <div>
      <h1>Tasks List</h1>
      <TasksFilter />
      <hr />
      {tasks.length ? (
        <table className="centered">
          <thead>
            <tr>{renderTableHead()}</tr>
          </thead>
          <tbody>
            <TasksList tasks={tasks} />
          </tbody>
        </table>
      ) : (
        <p>No tasks</p>
      )}
    </div>
  );
};

export default Tasks;
