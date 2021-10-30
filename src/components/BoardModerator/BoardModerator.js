import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './BoardModerator.module.scss';

import UserService from "../../services/user.service";
import { useSelector } from 'react-redux';

const BoardModerator = () => {
  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    UserService.getModeratorBoard().then(
      (response) => {
        setContent(response.data);
        console.log("Moderator Dashboard " + response.toString());
        console.log(response.data);
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

  return(
    <div className={styles.BoardModerator}>
      {content === 'Moderator' && 
      <div>BoardModerator Component</div>
      }
    </div>
  )
};

BoardModerator.propTypes = {};

BoardModerator.defaultProps = {};

export default BoardModerator;
