import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Create, Tasks, Task } from './views/index';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Create />
      </Route>
      <Route path="/tasks">
        <Tasks />
      </Route>
      <Route path="/task/:id">
        <Task />
      </Route>
    </Switch>
  );
};
