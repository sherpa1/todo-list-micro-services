import React, { useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Master from './components/tasks-master/tasks-master';
import Details from './components/tasks-details/tasks-details';
import Form from './components/tasks-form/tasks-form';


function App() {

  const [direction, setDirection] = useState('desc');

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Todo List
            <span class="subtitle">Micro services version</span>
          </h1>
        </header>
        <BrowserRouter>
          <Routes>
            <Route path="/tasks/create" element={
              <Form />}
            />
            <Route path="/tasks/:uuid" element={
              <Details />}
            />
            <Route path="/tasks" element={
              <Master filter_by="created_at" direction={direction} />}
            />
          </Routes>
        </BrowserRouter>
        <div>
          <button onClick={() => (direction === 'asc') ? setDirection('desc') : setDirection('asc')}>Order by date of creation ({(direction === 'asc') ? 'desc' : 'asc'})</button>
        </div>
        <footer>
          <p>
            Alexandre Leroux (alex@sherpa.one) - Todo List - Micro services version
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
