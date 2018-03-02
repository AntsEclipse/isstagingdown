let timeout = 30000; // 30 second
let up = true;

const getStatus = () => {
  fetch('https://api-staging.compass-srp.com/trades')
  .then(response => {
    if (response.ok) {
      timeout = 120000; // 2 minut
      document.getElementById('status').textContent = 'No'
      if (!up) {
        up = true;
        sendNotification('Staging is back up');
      }
    } else {
      timeout = 30000;
      document.getElementById('status').textContent = 'Staging is Down'
      if (up) {
        up = false;
        sendNotification('Staging went down');
      }
    }
  }).catch(() => {
    timeout = 30000;
    document.getElementById('status').textContent = 'Staging is Down';
    if (up) {
      up = false;
      sendNotification('Staging went down');
    }
  });
};

const sendNotification = (msg) => {
  if (Notification.permission === 'granted') {
    const title = 'isstagingdown';
    const options = {
      body: msg
    };
    const notification = new Notification(title, options);
    Notification.requestPermission()
  }
}

window.onload = () => {
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
  getStatus();
}
window.setInterval(getStatus, timeout);
