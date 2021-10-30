import React from 'react';
// import PropTypes from 'prop-types';
import styles from './TeamEdit.module.scss';
import { Button, Input, Typography } from '@material-ui/core';
import axios from 'axios';

class TeamEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      team: {
        id: null,
        name: '',
        description: '',
      },
      error: null,
    };
  };

  componentDidMount = async () => {
    this.fetchTeam(this.props.match.params.id);
  };

  fetchTeam = async (id) => {
    try {
      const response = await axios.get('http://localhost:1337/teams', {
        params: {
          id: id,
        },
      });
      this.setState({team: response.data[0]});
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
        console.log(this.state.team);
        await axios.put(`http://localhost:1337/teams/${this.state.team.id}`,
        {
          id: this.state.team.id,
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

  onNameChange = (event, value) => {
    this.setState({
      team: {
        id: this.state.team.id,
        name: event.target.value,
        description: this.state.team.description,
      },
    });
  };

  onDescriptionChange = (event, value) => {
    this.setState({
      team: {
        id: this.state.team.id,
        name: this.state.team.name,
        description: event.target.value,
      },
    });
  };
  render() {

    return (
      <div className={styles.TeamEdit}>
        <div className={styles.Container}>
          <form onSubmit={this.handlerSubmit}>
            <Typography variant="h4">Edit team</Typography>
            <Typography variant="h5">Name</Typography>
            <Input 
              id="team-name"
              name="name"
              value={this.state.team.name}
              onChange={this.onNameChange}
            />
            <Typography variant="h5">Description</Typography>
            <Input 
              id="team-description"
              name="description"
              value={this.state.team.description}
              onChange={this.onDescriptionChange}
            /><br/>
            <Button variant="contained" color="primary" size="small" type="submit">
              <Typography>Submit</Typography>
            </Button>
          </form>
        </div>
      </div>
    )
  }

};

TeamEdit.propTypes = {};

TeamEdit.defaultProps = {};

export default TeamEdit;
