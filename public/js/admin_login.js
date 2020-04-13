const redirect = function({err, location}) {
  console.log(err, location)
  if(!err) return window.location.replace(location);
}

const loginAdmin = function() {
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();
  if(!username || !password) return;
  const body = JSON.stringify({username, password});
  fetch('loginAdmin', {method: 'POST', headers: {'Content-Type': 'application/json'}, body})
    .then(res => res.json()).then(redirect);
}

const addListeners = function() {
  const loginButton = document.querySelector('#login');
  loginButton.onclick = loginAdmin;
};

window.onload = addListeners;
