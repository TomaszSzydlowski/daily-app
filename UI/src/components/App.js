import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import PageNotFound from './PageNotFound';
import NotesPage from './notes/NotesPage';
// eslint-disable-next-line import/no-named-as-default
import ManageNotePage from './notes/ManageNotePage';
import { ToastContainer } from 'react-toastify';
import authService from '../services/authService';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [ user, setUser ] = useState({});

  useEffect(() => {
    // BUG
    // const newUser = authService.getCurrentUser();
    // setUser(newUser);
  });
  return (
    <React.Fragment>
      <Header user={user} />
      <main className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/notes" component={NotesPage} />
          <Route path="/note/:id" component={ManageNotePage} />
          <Route path="/note" component={ManageNotePage} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
      <ToastContainer autoClose={3000} hideProgressBar />
    </React.Fragment>
  );
}

export default App;
