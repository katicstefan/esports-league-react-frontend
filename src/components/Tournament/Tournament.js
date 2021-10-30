import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tournament.module.scss';

import { Link as MaterialLink, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableCell, TableRow, Typography, ButtonGroup, withStyles, IconButton } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

const StyledIconButton = withStyles({
  root: {
    color: 'white',
    fontFamily: 'Teko'
  }
}) (IconButton);

class Tournament extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tournament: this.props.tournament,
    };
  };

  onDeleteButton = () => {
    this.setState({ open: true });
  }
  
  onDialogSuccess = async (id) => {
    try {
      await axios.delete(
        `http://localhost:1337/tournaments/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.jwt,
            'Content-Type': 'application/json'
          }
        })
        .then(response => 
        {
          console.log(response);
          this.props.onClose(id);
          //const tournaments = this.state.tournaments.filter(item => item.id !== id);
          //this.setState({ tournaments });
        });
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
    this.setState({ open: false });
  }

  onDialogClose = () => {
    this.setState({ open: false });
  }

  render() {

    return (
      <TableRow key={this.state.tournament.id}>
        <TableCell> {this.state.tournament.name} </TableCell>
        <TableCell> {this.state.tournament.gameId.name} </TableCell>
        <TableCell> {this.state.tournament.dateStart} </TableCell>
        <TableCell> {this.state.tournament.dateEnd} </TableCell>

        <TableCell> 
          <MaterialLink component={RouterLink} to={`/tournaments/${this.state.tournament.id}/matches`}>
            <Button variant="contained" color="primary">View</Button> 
          </MaterialLink>
        </TableCell>
        <TableCell> 
          <MaterialLink component={RouterLink} to={`/tournaments/${this.state.tournament.id}/leaderboard`}>
            <Button variant="contained" color="primary">View</Button> 
          </MaterialLink>
        </TableCell>

        <TableCell>
          <ButtonGroup variant="contained" color="secondary" style={{backgroundColor: 'royalblue' }}>
            <MaterialLink component={RouterLink} to={`/tournaments/${this.state.tournament.id}/edit`}>
              <StyledIconButton >
                <EditIcon />
              </StyledIconButton>
            </MaterialLink>
            <div onClick={this.onDeleteButton}>
            <StyledIconButton >
              <DeleteIcon />
            </StyledIconButton>
            </div>
            <Dialog
              open={this.state.open}>
              <DialogTitle id="dialog-title" style={{color: 'red'}}>Are you sure you want to delete tournament?</DialogTitle>
              <DialogContent>
                <DialogContentText id="dialog-description">
                  <Typography><strong>ID:</strong> {this.state.tournament.id}</Typography>
                  <Typography><strong>Name:</strong> {this.state.tournament.name}</Typography>
                  <Typography><strong>Game:</strong> {this.state.tournament.gameId.name}</Typography>
                  <Typography><strong>Start date:</strong> {this.state.tournament.dateStart}</Typography>
                  <Typography><strong>End date:</strong> {this.state.tournament.dateEnd}</Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.onDialogClose} color="primary" variant="outlined">
                  Cancel
                </Button>
                <Button onClick={() => this.onDialogSuccess(this.state.tournament.id)} color="primary" variant="contained" autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </ButtonGroup>
        </TableCell>
        
      </TableRow>
    
    )
  }
};

Tournament.propTypes = {};

Tournament.defaultProps = {};

export default Tournament;
