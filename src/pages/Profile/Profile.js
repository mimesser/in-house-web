import React from 'react';
import PropTypes from 'prop-types';
import { Section } from 'components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import pageWrapper from 'utils/page-wrapper';

function Profile({ email }) {
   return (
      <Section style={{ color: '#eee' }} container maxWidth={400}>
         <div style={{ display: 'flex', padding: '10px' }}>
            <div style={{ flex: '1' }}>
               <div>email</div>
               <div>{email}</div>
            </div>
            <Link to="/profile/email">edit</Link>
         </div>
         <div style={{ display: 'flex', padding: '10px' }}>
            <div style={{ flex: '1' }}>
               <div>password</div>
               <div>*********</div>
            </div>
            <Link to="/profile/password">edit</Link>
         </div>
      </Section>
   );
}

Profile.propTypes = {
   email: PropTypes.string.isRequired,
};

function mapStateToProps({ user: { email } }) {
   return {
      email,
   };
}

export default pageWrapper('10A')(connect(mapStateToProps)(Profile));
