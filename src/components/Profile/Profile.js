import React from "react";
// import PropTypes from 'prop-types';
import styles from './Profile.module.scss';

import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  console.log(currentUser);
  return (
    <div className={styles.Profile}>
      <div className={styles.Container}>
        <div className={styles.Header}>
          <Typography variant="h3"> {currentUser.user.username}'s Profile </Typography>
        </div>
        <div className={styles.ProfileInfoContainer}>
          <Typography variant="body1">
            <strong className={styles.Left}>Id:</strong> {currentUser.user.id ? currentUser.user.id : '/'}
          </Typography>
  
          <Typography variant="body1">
            <strong>Username:</strong> {currentUser.user.username ? currentUser.user.username : '/'}
          </Typography>
      
          <Typography variant="body1">
            <strong>Email:</strong> {currentUser.user.email ? currentUser.user.email : '/'}
          </Typography>

          <Typography variant="body1">
            <strong>Role:</strong> {currentUser.user.role ? currentUser.user.role.name : '/'}
          </Typography>

          <Typography variant="body1">
            <strong>First name:</strong> {currentUser.user.firstName ? currentUser.user.firstName : '/'}
          </Typography>

          <Typography variant="body1">
            <strong>Last name:</strong> {currentUser.user.lastName ? currentUser.user.lastName : '/'}
          </Typography>

          <Typography variant="body1">
            <strong>In-game name:</strong> {currentUser.user.ign ? currentUser.user.ign : '/'}
          </Typography>

          <Typography variant="body1">
            <strong>Date of birth:</strong> {currentUser.user.dob ? currentUser.user.dob: '/'}
          </Typography>

          <Typography variant="body1">
            <strong>Team:</strong> {currentUser.user.teamId ? currentUser.user.teamId.name: '/'}
          </Typography>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
