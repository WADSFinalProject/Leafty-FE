import React from 'react';
import { Notifications} from 'react-push-notification';
import addNotification from 'react-push-notification';

const PushNotif = () => {
  const showNotification = () => {
    addNotification({
      title: 'Notification Title',
      subtitle: 'Subtitle here',
      message: 'This is the main message',
      theme: 'darkblue'
    });
  };

  return (
    <div>
      <Notifications />
      <button onClick={showNotification}>Show Notification</button>
    </div>
  );
};

export default PushNotif;
