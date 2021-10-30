import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import styles from './Register.module.scss';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className={styles.Alert} role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className={styles.Alert} role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className={styles.Alert} role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className={styles.Alert} role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className={styles.Register} >
      <div className={styles.Card} >
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className={styles.ProfileCard}
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className={styles.FormGroup} >
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className={styles.FormGroup}
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className={styles.FormGroup} >
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className={styles.FormGroup}
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className={styles.FormGroup} >
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className={styles.FormGroup}
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className={styles.FormGroup} >
                <button className={styles.Button} >Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className={styles.FormGroup} >
              <div className={ successful ? styles.AlertSuccess : styles.Alert } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
