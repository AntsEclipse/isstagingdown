window.onload = () => {
  fetch('https://api-staging.compass-srp.com/auth',  {
    method: 'OPTION'
  }).then(response => {
    if (response.ok) {
      document.getElementById('status').textContent = 'No'
    } else {
      document.getElementById('status').textContent = 'Staging is Down'
    }
  }).catch(() => {
    document.getElementById('status').textContent = 'Staging is Down';
  });
};
