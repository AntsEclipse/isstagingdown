let timeout = 30000; // 30 second

const getStatus = () => {
  fetch('https://api-staging.compass-srp.com/auth',  {
    method: 'OPTION'
  }).then(response => {
    if (response.ok) {
      timeout = 120000; // 2 minute
      document.getElementById('status').textContent = 'No'
    } else {
      timeout = 30000;
      document.getElementById('status').textContent = 'Staging is Down'
    }
  }).catch(() => {
    timeout = 30000;
    document.getElementById('status').textContent = 'Staging is Down';
  })
};


window.onload = getStatus;
window.setInterval(getStatus, timeout);
