import React from 'react';
import PropTypes from 'prop-types';
import styles from './Matches.module.scss';

import axios from 'axios';
import { Link as MaterialLink, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles, IconButton, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';
import Match from '../Match/Match';

class Matches extends React.Component {

  // State of your application
  constructor(props) {
    super(props);
    this.state = {
      open: null,
      matches: [],
      tournament: [],
      error: null,
    };
  }

  // Fetch your restaurants immediately after the component is mounted
  componentDidMount = async () => {
    try {
      const resp = await axios.get(`http://localhost:1337/tournaments/`, {
        params: {
          id: this.props.match.params.id
        }
      });
      this.setState({ tournament: resp.data[0] });

      const response = await axios.get('http://localhost:1337/matches', {
        params: {
          tournamentId: this.props.match.params.id
        }
      });
      this.setState({ matches: response.data });

    } catch (error) {
      this.setState({ error });
    }
  };

  onDialogSuccessCallback = (id) => {
    const matches = this.state.matches.filter(item => item.id !== id);
    this.setState({ matches });
  };

  render() {
    const { error, match } = this.state;

    // Print errors if any
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }

    return (
    <div className={styles.Matches}>
      <div className={styles.Container}>
        <div className={styles.Header}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            
              <Typography variant="h3">{this.state.tournament.name} - Matches</Typography>
            
          </Grid>
          <Grid item xs={1}>
            <MaterialLink component={RouterLink} to={`/tournaments/${this.props.match.params.id}/matches/add`} underline='none'>
              <Button variant="contained" color="primary" style={{backgroundColor: 'royalblue' }}>
                <AddIcon />
                <Typography variant="body1" className={styles.LinkTypography} >Add new</Typography>
              </Button>
            </MaterialLink>
          </Grid>
        </Grid>
        </div>

        <div className={styles.TableContainer}>
          <TableContainer >
              <Table>
                <TableHead>
                  <TableRow style={{backgroundColor: 'darkred'}}>
                    <TableCell >Home</TableCell>
                    <TableCell >Away</TableCell>
                    <TableCell >Date</TableCell>
                    <TableCell >Time</TableCell>
                    <TableCell >Winner</TableCell>
                    <TableCell >Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.matches.map(match => (
                    <Match match={match} onClose={this.onDialogSuccessCallback} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
      </div>
    </div>
    )
  }
};

Matches.propTypes = {};

Matches.defaultProps = {};

export default Matches;
