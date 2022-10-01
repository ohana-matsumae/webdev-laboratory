import '../sass/styles.scss';
import '../sass/login.scss';
import IFormElements from './IFormElements';
import stringIsEmptyOrNull from '../utils/stringIsEmptyOrNull';
import stringMixer from '../utils/stringMixer';
import { Dropdown } from 'bootstrap'

new Dropdown('[data-bs-toggle="dropdown"]');

const formElement = document.getElementById('login-form');

function doErrored(message: string, usernameField: HTMLInputElement, passwordField: HTMLInputElement) {
  const alertElement = document.getElementById('alert-element');
  if (alertElement) {
    alertElement.innerText = message;
    alertElement.classList.remove('d-none');
  }

  usernameField.classList.add('errored');
  passwordField.classList.add('errored');

  setTimeout(() => {
    if (alertElement) alertElement.classList.add('d-none');
    usernameField.classList.remove('errored');
    passwordField.classList.remove('errored');
  }, 10000);
}

formElement?.addEventListener('submit', (e: Event) => {
  // fetch information from the form data.
  e.preventDefault();

  const targets: IFormElements = e.target as unknown as IFormElements;

  const username = targets.username.value;
  const password = targets.password.value;

  if (stringIsEmptyOrNull(username) || stringIsEmptyOrNull(password)) {
    doErrored('Empty username or password', targets.username, targets.password)
    return;
  }

  if (username.length < 4 || password.length < 4) {
    doErrored('Username and password is not on desired length.', targets.username, targets.password);
    return;
  }

  const key = 'NmYlRUYlQkYlQkQlRUYlQkYlQkQlRUYlQkYlQkQ=';
  if (stringMixer(username) !== key || stringMixer(password) !== key) {
    doErrored('Invalid username and password.', targets.username, targets.password);
    return;
  }

  // When all passes, redirect.
  localStorage.setItem('logged-in', 'yes');
  window.location.href = '/main-page.html';
});
