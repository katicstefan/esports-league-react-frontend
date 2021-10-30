import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Team.module.scss';

import { Link as MaterialLink, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

const StyledCard = withStyles({
  root: {
    width: '100%',
    height: 'auto',
    typography: {
      fontFamily: [
        'Teko'
      ].join(','),
    },
  },
}) (Card);

const StyledIconButton = withStyles({
  root: {
    color: 'white',
  }
}) (IconButton);

class Team extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      team: this.props.team,
    };
  };

  onDeleteButton = () => {
    this.setState({ 
      open: true,
    });
  }
  
  onDialogSuccess = async (id) => {
    try {
      await axios.delete(
        `http://localhost:1337/teams/${id}`,
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
          //const teams = this.state.teams.filter(item => item.id !== id);
          //this.setState({ teams });
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

  onJoinButton = async (teamId) => {
    //console.log(123);
    try {
      await axios.put(`http://localhost:1337/users/${user.user.id}`,
      {
        teamId: teamId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + user.jwt,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response.data);
      });
    } catch(error) {
      console.log(error);
      this.setState({ error });
    }
  }

  render() {
    
    return (
      <Grid item xs={4} style={{ padding: '1%'}}>
        <StyledCard key={this.state.team.id} >
          <CardHeader style={{backgroundColor: 'darkred', color: 'white', fontFamily: 'Teko'}} title={this.state.team.name} />
          <CardContent style={{backgroundColor: 'red', width: '100%', }}>
            <Typography variant="body2" style={{fontFamily: 'Share Tech', textAlign: 'left', marginLeft: '5%'}}>{this.state.team.description}</Typography>
          </CardContent>
          <CardActions style={{backgroundColor: 'dimgrey', margin: 'auto', width: '100%', justifyContent: 'space-between',}}>
            <div className={styles.LeftActionButtons}>
            <ButtonGroup variant="contained" color="secondary" style={{backgroundColor: 'grey' }}>
              <MaterialLink component={RouterLink} to={`/teams/${this.state.team.id}/edit`}>
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
                <DialogTitle id="dialog-title" style={{color: 'red'}}>Are you sure you want to delete team?</DialogTitle>
                <DialogContent>
                  <DialogContentText id="dialog-description">
                    <Typography><strong>ID:</strong> {this.state.team.id}</Typography>
                    <Typography><strong>Name:</strong> {this.state.team.name}</Typography>
                    <Typography><strong>Description:</strong> {this.state.team.description}</Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.onDialogClose} color="primary" variant="outlined">
                    Cancel
                  </Button>
                  <Button onClick={() => this.onDialogSuccess(this.state.team.id)} color="primary" variant="contained" autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </ButtonGroup>
            </div>

            <div className={styles.RightActionButtons} >
              <Button onClick={() => this.onJoinButton(this.state.team.id)} variant="contained" color="primary" >Join</Button>
            </div>
          </CardActions>
        </StyledCard>
      </Grid>
    )
  }
};

Team.propTypes = {};

Team.defaultProps = {};

export default Team;
