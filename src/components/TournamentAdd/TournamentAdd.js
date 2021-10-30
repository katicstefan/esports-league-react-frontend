import React from 'react';
import PropTypes from 'prop-types';
//import styles from './TournamentAdd.module.scss';

import { Autocomplete } from '@material-ui/lab';
import { Button, createMuiTheme, Input, makeStyles, TextField, ThemeProvider, Typography, withStyles } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';

import axios from 'axios';
import { red } from '@material-ui/core/colors';

const datePickerTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: red
  },
});

const styles = theme => ({
  input: {
    color: 'red',
  }
});

class TournamentAdd extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      games: [],
      tournament: {
        name: '',
        dateStart: '',
        dateEnd: '',
        gameId: { }
      },
      error: null,
    };
  }

  componentDidMount = async () => {
    await this.fetchGames();
  };

  fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:1337/games');
      this.setState({games: response.data});
    } catch (error) {
      this.setState({ error });
    }
  };

  handlerSubmit = async (event) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if(user && user.jwt) {
      event.preventDefault();
      try {
      await axios.post(
        'http://localhost:1337/tournaments', 
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
        name: event.target.value,
        gameId: this.state.tournament.gameId,
        dateStart: this.state.tournament.dateStart,
        dateEnd: this.state.tournament.dateEnd,
      },
    });
  }

  onAutocompleteChange = (event, value) => {
    this.setState({
      tournament: {
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
          name: this.state.tournament.name,
          gameId: this.state.tournament.gameId,
          dateStart: this.state.tournament.dateStart,
          dateEnd: format(date, 'yyyy-MM-dd'),
        },
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={styles.TournamentAdd}>
        <div className={styles.Container}>
          <form onSubmit={this.handlerSubmit}>
            <Typography variant="h4">Add new tournament</Typography>
            <Typography variant="body1">Name</Typography>
            <Input
              id="tournament-name"
              name="name"
              type="text"
              onChange={this.onNameChange}
              classes={{ input: classes.input }}
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
                variant="outlined"/>
              )}
              onChange={this.onAutocompleteChange}
              fullWidth={false}
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
                <Typography variant="body1">End date</Typography>
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
            <Button variant="contained" color="primary" size="small" type="submit">Submit</Button>
            
          </form>
        </div>
      </div>
    )
  }
};

TournamentAdd.propTypes = {
  classes: PropTypes.object.isRequired,
};

TournamentAdd.defaultProps = {};

export default withStyles(styles) (TournamentAdd);
