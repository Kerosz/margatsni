/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState } from 'react';
import EditProfile from './edit-profile';
import ChangePassword from './change-password';
import PrivacyAndSecurity from './privacy-and-security';
import Sidebar from './sidebar';

export default function Settings({ user }) {
  const [currentPanel, setCurrentPanel] = useState('edit-profile');

  if (!user.userId) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-primary grid grid-cols-4 gap-0 rounded">
      <div className="border-r border-gray-primary">
        <Sidebar setActivePanel={setCurrentPanel} activePanel={currentPanel} />
      </div>
      <div className="col-span-3">
        {currentPanel === 'edit-profile' && <EditProfile data={user} />}
        {currentPanel === 'change-password' && (
          <ChangePassword username={user.username} photo={user.photoURL} />
        )}
        {currentPanel === 'security' && <PrivacyAndSecurity />}
      </div>
    </div>
  );
}

Settings.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    docId: PropTypes.string,
    followers: PropTypes.arrayOf(PropTypes.string),
    following: PropTypes.arrayOf(PropTypes.string),
    userInfo: PropTypes.shape({
      bio: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }),
    photoURL: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};
