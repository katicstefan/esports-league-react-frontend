import React from 'react';
import PropTypes from 'prop-types';
import styles from './MatchAdd.module.scss';
import axios from 'axios';
import { Button, createMuiTheme, TextField, ThemeProvider, Typography, withStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { format } from 'date-fns';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { red } from '@material-ui/core/colors';

const pickerTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: red,
  },
  typography: {
    fontFamily: 'Teko',
    fontSize: 16
  },
  overrides: {
    MuiInputBase: {
      input: {
        color: 'white',
      },
    },
    MuiStandardnput: {
      input: {
        color: 'white',
      }
    },
    MuiFilledInput: {
      input: {
        color: 'white',
      }
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: 'darkred',
        '& $notchedOutline': {
          borderColor: 'red',
        },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
            borderColor: 'red',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                borderColor: 'red',
            },
        },
        '&$focused $notchedOutline': {
            borderColor: 'red',
            borderWidth: 1,
        },
      },
      input: {
        color: 'white',
      }
    },
    MuiFormLabel: {
      root: {
        color: 'white'
      }
    }
  }
});

class MatchAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      match: {
        homeId: {},
        awayId: {},
        date: '',
        time: '',
        tournamentId: {},
        winnerId: {},
      },
      teams: [],
      tournament: {
        name: '',
        dateStart: '',
        dateEnd: '',
        gameId: {},
      },
      error: null,
    }
  };

  componentDidMount = async () => {
    await this.fetchTeams();
    await this.fetchTournament();
    this.setState({ match: {
      tournamentId: this.state.tournament.id,
      winnerId: 1
    }});
  };

  fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:1337/teams');
      this.setState({ teams: response.data });
    } catch(error) {
      console.log(error);
      this.setState(error);
    }
  };

  fetchTournament = async () => {
    try {
      const response = await axios.get('http://localhost:1337/tournaments', {
        params: {
          id: this.props.match.params.id,
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
      try {
        await axios.post('http://localhost:1337/matches',
        {
          homeId: this.state.match.homeId,
          awayId: this.state.match.awayId,
          date: this.state.match.date,
          time: format(this.state.match.time, 'HH:mm:00.000'),
          tournamentId: this.state.match.tournamentId,
          winnerId: this.state.match.winnerId,
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
  };

  onHomeTeamAutocompleteChange = (event, value) => {
    this.setState({
      match: {
        homeId: this.state.teams.find(team => {
          return team.name === value;
        }),
        awayId: this.state.match.awayId,
        date: this.state.match.date,
        time: this.state.match.time,
        tournamentId: this.state.match.tournamentId,
        winnerId: this.state.match.winnerId,
      }
    });
  };

  onAwayTeamAutocompleteChange = (event, value) => {
    this.setState({
      match: {
        homeId: this.state.match.homeId,
        awayId: this.state.teams.find(team => {
          return team.name === value;
        }),
        date: this.state.match.date,
        time: this.state.match.time,
        tournamentId: this.state.match.tournamentId,
        winnerId: this.state.match.winnerId,
      }
    });
  };

  onDateChange = (date) => {
    this.setState({
      match: {
        homeId: this.state.match.homeId,
        awayId: this.state.match.awayId,
        date: format(date, 'yyyy-MM-dd'),
        time: this.state.match.time,
        tournamentId: this.state.match.tournamentId,
        winnerId: this.state.match.winnerId,
      }
    });
  }

  onTimeChange = (time) => {
    this.setState({
      match: {
        homeId: this.state.match.homeId,
        awayId: this.state.match.awayId,
        date: this.state.match.date,
        time: time,
        tournamentId: this.state.match.tournamentId,
        winnerId: this.state.match.winnerId,
      }
    });
  }

  render() {

    return (
      <div className={styles.MatchAdd}>
        <div className={styles.Container}>
          <form onSubmit={this.handlerSubmit}>
            <ThemeProvider theme={pickerTheme}>
              <Typography variant="h4">Add new match</Typography>
              <Typography variant="body1">Choose home team</Typography>
              <div className={styles.DropdownContainer}>
                <Autocomplete
                  id="match-homeId"
                  name="homeId"
                  options={this.state.teams.map((team) => team.name)}
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                    label="Choose home team"
                    variant="outlined"/>
                  )}
                  onChange={this.onHomeTeamAutocompleteChange}
                />
              </div>
              <Typography variant="body1">Choose away team</Typography>
              <div className={styles.DropdownContainer}>
                <Autocomplete
                  id="match-awayId"
                  name="awayId"
                  options={this.state.teams.map((team) => team.name)}
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                    label="Choose away team"
                    variant="outlined"/>
                  )}
                  onChange={this.onAwayTeamAutocompleteChange}
                />
              </div>
              
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Typography variant="body1">Date</Typography>
                <DatePicker
                  variant="inline"
                  inputVariant="outlined"
                  format="yyyy-MM-dd"
                  label="Choose date"
                  value={this.state.match.date}
                  onChange={this.onDateChange}
                />
                <Typography variant="body1">Time</Typography>
                <TimePicker
                  variant="inline"
                  inputVariant="outlined"
                  openTo="hours"
                  format="HH:mm:00.000"
                  ampm={false}
                  label="Choose time"
                  value={this.state.match.time}
                  onChange={time => this.onTimeChange(time)}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider><br/>
            <Button variant="contained" color="primary" size="small" type="submit">Submit</Button>
          </form>
        </div>
      </div>
    )
  };

};

MatchAdd.propTypes = {};

MatchAdd.defaultProps = {};

export default MatchAdd;
