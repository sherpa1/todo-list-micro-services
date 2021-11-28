import React, { useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Master from './components/tasks-master/tasks-master';
import Details from './components/tasks-details/tasks-details';
import Form from './components/tasks-form/tasks-form';


function App() {

  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <header>
            <Link to="/">
              <h1>Todo List
                <span className="subtitle">Micro services version</span>
              </h1>
            </Link>
          </header>
          <Routes>
            <Route path="/tasks/create" element={
              <Form />}
            />
            <Route path="/tasks/:uuid" element={
              <Details />}
            />
            <Route path="/tasks" element={
              <Master filter_by="created_at" />}
            />
            <Route path="/" element={
              <Master filter_by="created_at" />}
            />
          </Routes>
        </BrowserRouter>
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
