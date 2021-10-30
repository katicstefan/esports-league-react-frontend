import React from "react";
import { Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import styles from './Home.module.scss';

import { Button, Grid, Link as MaterialLink, Typography, withStyles } from "@material-ui/core";

import hero from '../../media/esport.png';

const StyledLink = withStyles({
  root: {
    color: 'white',
  }
}) (MaterialLink);

const HugeButton = withStyles({
  root: {
    width: '45%',
    height: '45%',
    fontSize: '24px',
    marginRight: '5%',
  },
}) (Button);

const OutlinedWhiteButton = withStyles({
  root: {
    borderColor: 'white',
    color: 'white',
  },
}) (HugeButton);

class Home extends React.Component {
  
  render() {
    return (
      <div className={styles.Home} >
        <div className={styles.Container} >
          <div className={styles.GridContainer} >
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item xs={6} >
                <Typography variant="h2" align="left">
                  FUTURE OF GAMING<br/>
                  Online eSports League
                </Typography>
                <Typography variant="h4" align="left" style={{fontFamily: 'Share Tech'}}>
                  Join today and participate in online hosted
                  tournaments in many eSport games.
                  Create a team, dominate and reap the rewards.
                </Typography>

                <div className={styles.GridButtons} >
                  <StyledLink component={RouterLink} to="/register">
                    <HugeButton variant="contained" color="primary" >
                      Join now
                    </HugeButton>
                  </StyledLink>

                  <StyledLink component={RouterLink} to="/about">
                    <OutlinedWhiteButton variant="outlined" color="secondary" >
                      Learn more
                    </OutlinedWhiteButton>
                  </StyledLink>
                </div>
              </Grid>

              <Grid item xs={6}>
                <img src={hero} alt="hero" />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
