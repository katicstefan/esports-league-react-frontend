import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styles from './BoardAuthenticated.module.scss';

import UserService from "../../services/user.service";

const BoardAuthenticated = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
        console.log("User Dashboard " + response.toString());
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className={styles.BoardAuthenticated} >
      <header className={styles.Container} >
        <h3>{content}</h3>
      </header>
    </div>
  );
};

BoardAuthenticated.propTypes = {};

BoardAuthenticated.defaultProps = {};

export default BoardAuthenticated;
