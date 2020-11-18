import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRoutes } from './routes';
import { Navbar } from './components/index';
import { fetchTasks } from './redux/actions/tasks';

function App() {
  const routes = useRoutes();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className="container">{routes}</div>
    </Fragment>
  );
}

export default App;
