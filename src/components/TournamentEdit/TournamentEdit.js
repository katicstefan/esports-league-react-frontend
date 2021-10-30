import React from 'react';
import PropTypes from 'prop-types';
import styles from './TournamentEdit.module.scss';

import axios from 'axios';
import { Button, createMuiTheme, Input, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete } from '@material-ui/lab';
import { red } from '@material-ui/core/colors';
import { format } from 'date-fns';

const datePickerTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: red
  },
});

class TournamentEdit extends React.Component {
  state = {
    games: [],
    tournament: {
      id: null,
      name: '',
      dateStart: '',
      dateEnd: '',
      gameId: { 
        name: '',
      },
    },
    error: null,
  }

  componentDidMount = async () => {
    await this.fetchGames();
    await this.fetchTournament();
  }
  
  fetchGames = async() => {
    try {
      const response = await axios.get('http://localhost:1337/games');
      this.setState({ games: response.data });
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  };

  fetchTournament = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/tournaments/`, {
      params: {
        id: this.props.match.params.id
      },
    });
    this.setState({ tournament: response.data[0] });
    } catch(error) {
      console.log(error);
      this.setState({ error });
    }
  };

  handlerSubmit = async (event) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user && user.jwt) {
      event.preventDefault();
      //console.log(this.state.tournament);
      //console.log(user.jwt);
      try {
        //console.log(this.state.tournament);
      await axios.put(
        `http://localhost:1337/tournaments/${this.state.tournament.id}`, 
        { 
          name: this.state.tournament.name,
          gameId: this.state.tournament.gameId,
          dateStart: this.state.tournament.dateStart,
          dateEnd: this.state.tournament.dateEnd,
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.jwt,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log(response);
        });
      } catch(error) {
        console.log(error);
        this.setState({ error });
      }
    }
  }

  onNameChange = (event) => {
    this.setState({
      tournament: {
        id: this.state.tournament.id,
        name: event.target.value,
        gameId: this.state.tournament.gameId,
        dateStart: this.state.tournament.dateStart,
        dateEnd: this.state.tournament.dateEnd,
      },
    });
  }

  onGameChange = (event, value) => {
    this.setState({
      tournament: {
        id: this.state.tournament.id,
        name: this.state.tournament.name,
        gameId: this.state.games.find(game => {
          return game.name === value;
        }),
        dateStart: this.state.tournament.dateStart,
        dateEnd: this.state.tournament.dateEnd,
      },
    });
  }

  onDateStartChange = (date) => {
    this.setState({
        tournament: {
          id: this.state.tournament.id,
          name: this.state.tournament.name,
          gameId: this.state.tournament.gameId,
          dateStart: format(date, 'yyyy-MM-dd'),
          dateEnd: this.state.tournament.dateEnd,
        },
    });
  }

  onDateEndChange = (date) => {
    this.setState({
        tournament: {
          id: this.state.tournament.id,
          name: this.state.tournament.name,
          gameId: this.state.tournament.gameId,
          dateStart: this.state.tournament.dateStart,
          dateEnd: format(date, 'yyyy-MM-dd')
        },
    });
  }

  render() {
  
    return (
      <div className={styles.TournamentEdit}>
        <div className={styles.Container}>
          <form onSubmit={this.handlerSubmit}>
            <Typography variant="h4">Edit a tournament</Typography>
            <Typography variant="body1">Name</Typography>
            <Input
              id="tournament-name"
              name="name"
              type="text"
              onChange={this.onNameChange}
              value={this.state.tournament.name}
            />
            
            <div className={styles.DropdownContainer}>
            <Typography variant="body1">Game</Typography>
            <Autocomplete
              id="tournament-game"
              name="game"
              options={this.state.games.map((game) => game.name)}
              renderInput={(params) => (
                <TextField 
                {...params}
                label="Choose a game"
                variant="outlined"
                />
              )}
              onChange={this.onGameChange}
              fullWidth={false}
              value={this.state.tournament.gameId.name}
              disableClearable={true}
            />
            </div>
            
            <ThemeProvider theme={datePickerTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className={styles.DatePickerContainer}>
                <Typography variant="body1">Start Date</Typography>
                <KeyboardDatePicker 
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Start date"
                  format="yyyy-MM-dd"
                  value={this.state.tournament.dateStart}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={date => this.onDateStartChange(date)}
                />
                </div>
                <div className={styles.DatePickerContainer}>
                <Typography variant="body1">End Date</Typography>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="End date"
                  format="yyyy-MM-dd"
                  value={this.state.tournament.dateEnd}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={date => this.onDateEndChange(date)}
                />
                </div>
              </MuiPickersUtilsProvider>
            </ThemeProvider>
            <Button variant="contained" color="primary" size="small" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    )
  }
};

TournamentEdit.propTypes = {};

TournamentEdit.defaultProps = {};

export default TournamentEdit;
