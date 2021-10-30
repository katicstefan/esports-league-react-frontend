import React from 'react';
import PropTypes from 'prop-types';
import styles from './Leaderboard.module.scss';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import axios from 'axios';

import prize from '../../media/prize.png';

class Leaderboard extends React.Component {

  // State of your application
   state = {
    leaderboards: [],
    tournament: [],
    error: null,
  };

  // Fetch your restaurants immediately after the component is mounted
  componentDidMount = async () => {
    try {
      const resp = await axios.get('http://localhost:1337/tournaments', {
        params: {
          id: this.props.match.params.id
        }
      });
      this.setState({ tournament: resp.data });
      console.log(resp.data);

      const response = await axios.get('http://localhost:1337/leaderboards', {
        params: {
          tournamentId: this.props.match.params.id
        }
      });
      this.setState({ leaderboards: response.data });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { error, leaderboard } = this.state;

    // Print errors if any
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }

    return (
      <div className={styles.Leaderboard}>
        <div className={styles.Container}>
          <div className={styles.Header}>
          <Grid container>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                {this.state.tournament.map(tournament => (
                  <Typography variant="h3">{tournament.name} - Leaderboard</Typography>
                ))}
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </div>

          <div className={styles.GridContainer}>
            <Grid container spacing={0}>
                <Grid item xs={6} >
                  <TableContainer >
                    <Table>
                      <TableHead>
                        <TableRow style={{backgroundColor:'darkred'}}>
                          <div /*<TableCell>Tournament</TableCell>*/></div>
                          <TableCell>Team</TableCell>
                          <TableCell>Wins</TableCell>
                          <TableCell>Losses</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.leaderboards.map(leaderboard => (
                          <TableRow key={leaderboard.id}>
                            <div /*<TableCell> {leaderboard.tournamentId.name} </TableCell>*/></div>
                            <TableCell> {leaderboard.teamId.name} </TableCell>
                            <TableCell> {leaderboard.wins} </TableCell>
                            <TableCell> {leaderboard.losses} </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={6} >
                  <img src={prize} alt="prize"></img>
                  <Typography variant="h5">
                    1st place award - ASUS ROG Strix PC<br/>
                    2nd place award - HyperX Gaming Set<br/>
                    3rd place award - Razer Headset<br/>
                  </Typography>
                </Grid>
              </Grid>
            </div>
        </div>
      </div>
    )
  }
};

Leaderboard.propTypes = {};

Leaderboard.defaultProps = {};

export default Leaderboard;
