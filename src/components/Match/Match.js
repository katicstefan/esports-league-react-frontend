import React from 'react';
import PropTypes from 'prop-types';
import styles from './Match.module.scss';

import { Link as MaterialLink, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableCell, TableRow, Typography, IconButton, withStyles } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Link as RouterLink } from 'react-router-dom';

import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

const StyledIconButton = withStyles({
  root: {
    color: 'white',
    fontFamily: 'Teko'
  }
}) (IconButton);

class Match extends React.Component {
      
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      match: this.props.match,
    };
  };

  onDeleteButton = () => {
    this.setState({ open: true });
  };

  onDialogSuccess = async (id) => {
    try {
      await axios.delete(
        `http://localhost:1337/matches/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.jwt,
            'Content-Type': 'application/json'
          }
        })
        .then(response => 
        {
          console.log(response);
          this.props.onClose(this.state.match.id);
          //const matches = this.state.matches.filter(item => item.id !== id);
          //this.setState({ matches });
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
      <TableRow key={this.state.match.id}>
        <TableCell> {this.state.match.homeId.name} </TableCell>
        <TableCell> {this.state.match.awayId.name} </TableCell>
        <TableCell> {this.state.match.date} </TableCell>
        <TableCell> {this.state.match.time} </TableCell>
        <TableCell> {this.state.match.winnerId.type} </TableCell>
        <TableCell>
          <ButtonGroup variant="contained" color="secondary" style={{backgroundColor: 'royalblue' }}>
            <MaterialLink component={RouterLink} to={`/matches/${this.state.match.id}/edit`}>
              <StyledIconButton onClick={this.onDeleteButton}>
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
              <DialogTitle id="dialog-title" style={{color: 'red'}}>Are you sure you want to delete match?</DialogTitle>
              <DialogContent>
                <DialogContentText id="dialog-description">
                <Typography><strong>ID:</strong> {this.state.match.id}</Typography>
                <Typography><strong>Home team:</strong> {this.state.match.homeId.name}</Typography>
                <Typography><strong>Away team:</strong> {this.state.match.awayId.name}</Typography>
                <Typography><strong>Date:</strong> {this.state.match.date}</Typography>
                <Typography><strong>Time:</strong> {this.state.match.time}</Typography>
                <Typography><strong>Winner:</strong> {this.state.match.winnerId.type}</Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.onDialogClose} color="primary" variant="outlined">
                  Cancel
                </Button>
                <Button onClick={() => this.onDialogSuccess(this.state.match.id)} color="primary" variant="contained" autoFocus>
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

Match.propTypes = {};

Match.defaultProps = {};

export default Match;
