import React from 'react';
// import PropTypes from 'prop-types';
import styles from './TeamAdd.module.scss';
import axios from 'axios';
import { Button, Input, Typography } from '@material-ui/core';

class TeamAdd extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      team: {
        name: '',
        description: '',
      }
    }
  }

  componentDidMount = async () => {

  };

  handlerSubmit = async (event) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user && user.jwt) {
      event.preventDefault();
      try {
      await axios.post(
        'http://localhost:1337/teams', 
        { 
          name: this.state.team.name,
          description: this.state.team.description,
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

  onNameChange = (event) => {
    this.setState({
      team: {
        name: event.target.value,
        description: this.state.team.description,
      },
    });
  };

  onDescriptionChange = (event) => {
    this.setState({
      team: {
        name: this.state.team.name,
        description: event.target.value,
      },
    });
  };

  render() {
    return (
      <div className={styles.TeamAdd}>
        <div className={styles.Container}>
          <form onSubmit={this.handlerSubmit}>
            <Typography>Enter team name:</Typography>
            <Input
              id="team-name"
              name="name"
              type="text"
              onChange={this.onNameChange}
            />
            <Typography>Enter team description:</Typography>
            <Input
              id="team-description"
              name="description"
              type="text"
              onChange={this.onDescriptionChange}
            />
            <Button variant="contained" color="primary" size="small" type="submit">Submit</Button>
          </form>
        </div>
      </div>
    )
  }
};

TeamAdd.propTypes = {};

TeamAdd.defaultProps = {};

export default TeamAdd;
