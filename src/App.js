import React from "react";
import { Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Tournaments from './components/Tournaments/Tournaments';
import TournamentAdd from "./components/TournamentAdd/TournamentAdd";
import TournamentEdit from "./components/TournamentEdit/TournamentEdit";

import Matches from './components/Matches/Matches';
import MatchAdd from './components/MatchAdd/MatchAdd';
import MatchEdit from './components/MatchEdit/MatchEdit';

import Leaderboard from './components/Leaderboard/Leaderboard';

import Teams from './components/Teams/Teams';
import TeamAdd from './components/TeamAdd/TeamAdd';
import TeamEdit from './components/TeamEdit/TeamEdit';

import Page404 from './components/Page404/Page404';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, CssBaseline } from '@material-ui/core';

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import BoardModerator from "./components/BoardModerator/BoardModerator";
import BoardAuthenticated from "./components/BoardAuthenticated/BoardAuthenticated";

import { history } from "./helpers/history";

const theme = createMuiTheme({
  palette: {
    primary: {
        light: '#cb4747',
        main: '#a4110d',
        dark: '#880c09',
        contrastText: '#fff',
    },
    secondary: {
        light: '#707070',
        main: '#3e3e3e',
        dark: '#1f1e1f',
        contrastText: '#fff',
    },
    text: {
      primary: '#fff'
    }
  },
  typography: {
    fontFamily: [
      'Teko',
      'Share Tech',
      'sans-serif'
    ].join(','),
    fontSize: 16,
  },
});

const App = () => {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Navbar />
          
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardAuthenticated} />
            <Route path="/mod" component={BoardModerator} />

            <Route exact path={"/tournaments"} component={Tournaments} />
            <Route exact path={"/tournaments/add"} component={TournamentAdd} />
            <Route exact path={"/tournaments/:id/edit"} component={TournamentEdit} />
            
            <Route exact path={`/tournaments/:id/matches`} component={Matches} />
            <Route exact path={`/tournaments/:id/matches/add`} component={MatchAdd} />
            <Route exact path={`/matches/:id/edit`} component={MatchEdit} />

            <Route exact path={`/tournaments/:id/leaderboard`} component={Leaderboard} />
            
            <Route exact path={"/teams"} component={Teams} />
            <Route exact path={"/teams/add"} component={TeamAdd} />
            <Route exact path={"/teams/:id/edit"} component={TeamEdit} />

            <Route component={Page404} />
          </Switch>

          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;