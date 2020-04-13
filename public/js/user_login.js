const show = function(show, hide) {
  const showElement = document.querySelector(`#${show}`);
  const hideElement = document.querySelector(`#${hide}`);
  showElement.classList.remove('hidden');
  hideElement.classList.add('hidden');
}

const redirect = function({err, location}) {
  console.log(err, location)
  if(!err) return window.location.replace(location);
}

const login = function() {
  console.log('login');
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();
  if(!username || !password) return;
  const body = JSON.stringify({username, password});
  fetch('loginUser', {method: 'POST', headers: {'Content-Type': 'application/json'}, body})
    .then(res => res.json()).then(redirect);
}

const signup = function() {
  console.log('sign');
  const username = document.querySelector('#signup-username').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  if(!username || !password) return;
  const body = JSON.stringify({username, password});
  fetch('signupUser', {method: 'POST', headers: {'Content-Type': 'application/json'}, body})
    .then(res => res.json()).then(redirect);
}

const addListeners = function() {
  const loginButton = document.querySelector("#login");
  const signupButton = document.querySelector("#signup");
  loginButton.onclick = login;
  signupButton.onclick = signup;
};

const main = function() {
  addListeners();
}

window.onload = main;
