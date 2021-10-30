import React from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.scss';

const Footer = () => (
  <div className={styles.Footer}>
    <div className={styles.TopFooter}>
      <p>Join us on social media</p>
    </div>
    <div className={styles.BottomFooter}>
      <p>Sponsored by</p>
    </div>
  </div>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
