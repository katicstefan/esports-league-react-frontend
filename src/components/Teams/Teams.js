import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Teams.module.scss';

import axios from 'axios';
import { Link as MaterialLink, Button, /* Card, */ Grid, /* IconButton, */ Typography/* , withStyles */ } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';
import Team from '../Team/Team';

class Teams extends React.Component {
  // State of your application
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      error: null,
    };
  }

  // Fetch your restaurants immediately after the component is mounted
  componentDidMount = async () => {
    try {
      const response = await axios.get('http://localhost:1337/teams');
      this.setState({ teams: response.data });
    } catch (error) {
      this.setState({ error });
    }
  };

  onDialogSuccessCallback = (id) => {
    const teams = this.state.teams.filter(item => item.id !== id);
    this.setState({ teams });
  }

  render() {
    const { error, teams } = this.state;

    if (error) {
      return <div>An error occured: {error.message}</div>;
    }

    return (
    <div className={styles.Teams}>
      <div className={styles.Container}>
        <div className={styles.Header}>
          <div className={styles.HeaderLeft}>
            <Typography variant="h3">Competing Teams</Typography>
          </div>
          <div className={styles.HeaderRight}>
              <MaterialLink component={RouterLink} to={`/teams/add`} underline='none'>
                <Button variant="contained" color="primary" style={{backgroundColor: 'royalblue' }}>
                  <AddIcon />
                  <Typography variant="body1" className={styles.LinkTypography} >Add new</Typography>
                </Button>
              </MaterialLink>
            </div>
        </div>

        <div className={styles.CardContainer}>
        <Grid container>
          {/* this.state. */teams.map(team => (
            <Team team={team} key={team.id} onClose={this.onDialogSuccessCallback} />
          ))}
        </Grid>
        </div>
      </div>
    </div>
    );
  }
};

Teams.propTypes = {};

Teams.defaultProps = {};

export default Teams;
