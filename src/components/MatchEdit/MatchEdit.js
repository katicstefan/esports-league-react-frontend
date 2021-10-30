import React from 'react';
// import PropTypes from 'prop-types';
import styles from './MatchEdit.module.scss';
import { Button, createMuiTheme, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import { Autocomplete } from '@material-ui/lab';
import { red } from '@material-ui/core/colors';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';

const user = JSON.parse(localStorage.getItem('user'));

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

class MatchEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      match: {
        homeId: {
          name: '',
        },
        awayId: {
          name: '',
        },
        date: '',
        time: '',
        tournamentId: {},
        winnerId: {
          id: '',
          type: '',
        },
      },
      winners: [],
    }
  }

  componentDidMount = async () => {
    await this.fetchWinners();
    await this.fetchTeams();
    await this.fetchMatch();
  };

  fetchWinners = async () => {
    try {
      const response = await axios.get('http://localhost:1337/winners',
      {
        headers: {
          Authorization: 'Bearer ' + user.jwt,
          'Content-Type': 'application/json'
        }
      });
      this.setState({ winners: response.data });
    } catch(error) {
      console.log(error);
      this.setState({ error });
    }
  };

  fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:1337/teams');
      this.setState({ teams: response.data });
    } catch(error) {
      console.log(error);
      this.setState({ error });
    }
  };

  fetchMatch = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/matches/${this.props.match.params.id}`);
      this.setState({ match: response.data });
      console.log(response.data);
    } catch(error) {
      console.log(error);
      this.setState({ error });
    }
  };

  handlerSubmit = async (event) => {

    if(user && user.jwt) {
      event.preventDefault();
      try {
      await axios.put(
        `http://localhost:1337/matches/${this.state.match.id}`, 
        { 
          homeId: this.state.match.homeId,
          awayId: this.state.match.awayId,
          date: this.state.match.date,
          time: format(this.state.match.time, 'HH:mm:00.000'),
          tournamentId: this.state.match.tournamentId,
          winnerId: this.state.match.winnerId.id,
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

  onHomeTeamChange = (event, value) => {
    this.setState({
      match: {
        id: this.state.match.id,
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

  onAwayTeamChange = (event, value) => {
    this.setState({
      match: {
        id: this.state.match.id,
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
        id: this.state.match.id,
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
        id: this.state.match.id,
        homeId: this.state.match.homeId,
        awayId: this.state.match.awayId,
        date: this.state.match.date,
        time: time,
        tournamentId: this.state.match.tournamentId,
        winnerId: this.state.match.winnerId,
      }
    });
  }

  onWinnerChange = (event, value) => {
    this.setState({
      match: {
        id: this.state.match.id,
        homeId: this.state.match.homeId,
        awayId: this.state.match.awayId,
        date: this.state.match.date,
        time: this.state.match.time,
        tournamentId: this.state.match.tournamentId,
        winnerId: this.state.winners.find(winner => {
          return winner.type === value;
        }),
      }
    });
  };

 loadTime = (time) => {
  format(new Date())
 }

  render() {
    return (
    <div className={styles.MatchEdit}>
      <div className={styles.Container}>
        <form onSubmit={this.handlerSubmit}>
          <ThemeProvider theme={pickerTheme}>
            <Typography variant="h4">Edit a match</Typography>
            <div className={styles.DropdownContainer}>
              <Typography variant="body1">Home team</Typography>
              <Autocomplete
                id="match-homeId"
                name="homeId"
                options={this.state.teams.map((team) => team.name)}
                renderInput={(params) => (
                  <TextField 
                  {...params}
                  label="Choose home team"
                  variant="outlined"
                  />
                )}
                onChange={this.onHomeTeamChange}
                fullWidth={false}
                value={this.state.match.homeId.name}
                disableClearable={true}
              />
              </div>

              <div className={styles.DropdownContainer}>
              <Typography variant="body1">Away team</Typography>
              <Autocomplete
                id="match-awayId"
                name="awayId"
                options={this.state.teams.map((team) => team.name)}
                renderInput={(params) => (
                  <TextField 
                  {...params}
                  label="Choose away team"
                  variant="outlined"
                  />
                )}
                onChange={this.onAwayTeamChange}
                fullWidth={false}
                value={this.state.match.awayId.name}
                disableClearable={true}
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

              <div className={styles.DropdownContainer}>
              <Typography variant="body1">Winner</Typography>
              <Autocomplete
                id="match-winnerId"
                name="winnerId"
                options={this.state.winners.map((winner) => winner.type)}
                renderInput={(params) => (
                  <TextField 
                  {...params}
                  label="Choose a winner"
                  variant="outlined"
                  />
                )}
                onChange={this.onWinnerChange}
                fullWidth={false}
                value={this.state.match.winnerId.type}
                disableClearable={true}
              />
              </div>
          </ThemeProvider><br/>
          <Button variant="contained" color="primary" size="small" type="submit">
              Submit
            </Button>
        </form>
      </div>
    </div>
    )
  }
};

MatchEdit.propTypes = {};

MatchEdit.defaultProps = {};

export default MatchEdit;
