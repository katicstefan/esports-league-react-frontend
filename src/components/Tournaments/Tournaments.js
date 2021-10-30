import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Tournaments.module.scss';

import axios from 'axios';
import { Button, /* ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, */ Link as MaterialLink, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography/* , withStyles */ } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';
import Tournament from '../Tournament/Tournament';

// const user = JSON.parse(localStorage.getItem('user'));

class Tournaments extends React.Component {
  // State of your application
  state = {
    open: false,
    tournaments: [],
    error: null,
  };

  // Fetch your restaurants immediately after the component is mounted
  componentDidMount = async () => {
    try {
      const response = await axios.get('http://localhost:1337/tournaments');
      this.setState({ tournaments: response.data });
    } catch (error) {
      this.setState({ error });
    }
  };

  onDialogSuccessCallback = (id) => {
    const tournaments = this.state.tournaments.filter(item => item.id !== id);
    this.setState({ tournaments });
  };

  render() {
    const { error, tournaments } = this.state;

    // Print errors if any
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }

    return (
      <div className={styles.Tournaments}>
        <div className={styles.Container}>
          <div className={styles.Header}>
            <div className={styles.HeaderLeft}>
              <Typography variant="h3">Open Tournaments</Typography>
            </div>
            <div className={styles.HeaderRight}>
              <MaterialLink component={RouterLink} to={`/tournaments/add`} underline='none'>
                <Button variant="contained" color="primary" style={{backgroundColor: 'royalblue' }}>
                  <AddIcon />
                  <Typography variant="body1" className={styles.LinkTypography} >Add new</Typography>
                </Button>
              </MaterialLink>
            </div>
          </div>
          <div className={styles.TableContainer}>
            <TableContainer >
              <Table>
                <TableHead>
                  <TableRow style={{backgroundColor: 'darkred'}} >
                    <TableCell>Name</TableCell>
                    <TableCell>Game</TableCell>
                    <TableCell>Start date</TableCell>
                    <TableCell>End date</TableCell>
                    <TableCell>Matches</TableCell>
                    <TableCell>Leaderboard</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* this.state. */tournaments.map(tournament => (
                    <Tournament tournament={tournament} key={tournament.id} onClose={this.onDialogSuccessCallback}/>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    );
  }
};

Tournaments.propTypes = {};

Tournaments.defaultProps = {};

export default Tournaments;
