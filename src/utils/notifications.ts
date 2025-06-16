export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const scheduleNotification = (title: string, body: string, time: string): void => {
  if (Notification.permission !== 'granted') {
    return;
  }

  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(hours, minutes, 0, 0);

  // If the time has passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime();

  setTimeout(() => {
    new Notification(title, {
      body,
      icon: '/habit-icon-192.png',
      badge: '/habit-icon-192.png',
    });
  }, timeUntilNotification);
};

export const showInstantNotification = (title: string, body: string): void => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/habit-icon-192.png',
      badge: '/habit-icon-192.png',
    });
  }
};