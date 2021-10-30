import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from 'prop-types';
import styles from './Navbar.module.scss';

import { AppBar, Button, /* ButtonGroup, */ createMuiTheme, IconButton, Link as MaterialLink, ThemeProvider, Toolbar, /* Typography, */ withStyles } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import logo from '../../media/logo.svg';
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { clearMessage } from '../../actions/message';
import { logout } from '../../actions/auth';
import { history } from '../../helpers/history';

const redTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#cb4747',
      main: '#a4110d',
      dark: '#880c09',
      contrastText: '#fff',
    },
    secondary: {
      light: '#707070',
      main: '#3e3e3e',
      dark: '#1f1e1f',
      contrastText: '#fff',
    },
  },
});

const appbarTheme = createMuiTheme({
  palette: {
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
    primary: {
      main: redTheme.palette.secondary.dark,
      contrastText: '#fff',
    },
    secondary: {
      main: redTheme.palette.primary.dark,
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Teko'
    ].join(','),
  },
});

const StyledLink = withStyles({
  root: {
    color: 'white',
  }
}) (MaterialLink);

const StyledIconButton = withStyles({
  root: {
    color: 'white',
    fontFamily: 'Teko',
  }
}) (IconButton);

const TopToolbar = withStyles({
  root: {
    margin: 'auto', 
    width: '100%', 
    justifyContent: 'space-between',
  }
}) (Toolbar);

const BottomToolbar = withStyles({
  root: {
    margin: 'auto',
    width: '25%',
    justifyContent: 'space-between',
  },
}) (Toolbar);

const Navbar = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.user.role.name.includes("Moderator"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
  <div className={styles.Navbar}>
    <ThemeProvider theme = {appbarTheme}>
        <AppBar position="fixed" color="primary">
          <TopToolbar disableGutters >
            <div className={styles.TopNavbarLeftItems} >
              <StyledLink component={RouterLink} to="/" >
                <img src={logo} className={styles.NavbarLogo} alt="logo"/>
              </StyledLink>
            </div>

            <div className={styles.TopNavbarRightItems} >

              {showModeratorBoard && 
                (
                  <StyledLink to={"/mod"} component={RouterLink} className={styles.NavbarItem}><Button>Moderator Dashboard</Button></StyledLink>
                )
              }

              {currentUser ? 
                <>
                  <StyledLink component={RouterLink} to={"/user"} className={styles.NavbarItem}><Button>User Dashboard</Button></StyledLink>
                  <Button to="/login" onClick={logOut} variant="contained" color="secondary" size="small" className={styles.NavbarItem}>Logout</Button>
                </>
                : 
                <>
                  <StyledLink component={RouterLink} to={"/login"} className={styles.NavbarItem}><Button>Login</Button></StyledLink>
                  <StyledLink component={RouterLink} to={"/register"} className={styles.NavbarItem}><Button>Sign Up</Button></StyledLink>
                </>
              }
              
              <StyledIconButton >
                <SearchIcon />
              </StyledIconButton>
              
              {currentUser && 
                (
                  <StyledLink component={RouterLink} to={"/profile"} className={styles.NavbarItem}>
                    <StyledIconButton >
                      <PersonOutlineIcon />
                      {currentUser.user.username}
                    </StyledIconButton>
                  </StyledLink>
                )
              }

              <StyledIconButton >
                <LocalMallIcon />
              </StyledIconButton>
            </div>
          </TopToolbar>
          
          <ThemeProvider theme = {appbarTheme}>
            <AppBar position="relative" color="secondary">
            <BottomToolbar disableGutters	>
              <StyledLink component={RouterLink} to="/" >Home</StyledLink>
              <StyledLink component={RouterLink} to="/tournaments" >Tournaments</StyledLink>
              <StyledLink component={RouterLink} to="/teams" >Teams</StyledLink>
              <StyledLink component={RouterLink} to="/players" >Players</StyledLink>
              <StyledLink component={RouterLink} to="/merch" >Merch</StyledLink>
              <StyledLink component={RouterLink} to="/about" >About</StyledLink>
            </BottomToolbar>
          </AppBar>
          </ThemeProvider>
        </AppBar>
      </ThemeProvider>
  </div>
  )
};

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
