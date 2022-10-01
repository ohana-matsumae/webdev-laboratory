import '../sass/styles.scss';
import ILIstData from './ILIstData';
import IListFormElements from './IListFormElements';
import stringIsEmptyOrNull from '../utils/stringIsEmptyOrNull';
import { Dropdown } from 'bootstrap'

// Prepare stuff
new Dropdown('[data-bs-toggle="dropdown"]');

// Yeet
if (!localStorage.getItem('logged-in')) {
  const header = document.getElementById('some-text');
  const description = document.getElementById('some-description');

  if (header && description) {
    header.innerText = 'Access Denied';
    description.innerText = 'Bro why you here, you supposed to be in ur mom\'s basement!';
  }

  setTimeout(() => {
    window.location.href = '/login.html';
  }, 4000);
} else {
  document.getElementById('list-container')?.classList.remove('d-none');
}

// Data
const listData: ILIstData[] = [];

function generateListItem(title: string, information: string, listContainer: HTMLElement) {
  const el = document.createElement('li');
  ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start'].forEach(x => {
    el.classList.add(x);
  });

  const innerDiv = document.createElement('div');
  ['ms-2', 'me-auto'].forEach(x => {
    innerDiv.classList.add(x);
  });

  const subheading = document.createElement('div');
  subheading.innerText = title;
  subheading.classList.add('fw-bold');

  innerDiv.appendChild(subheading);
  innerDiv.innerHTML += information;

  el.appendChild(innerDiv);
  listContainer.appendChild(el);
}

function repaintList(listContainer: HTMLElement) {
  listContainer.innerHTML = "";
  console.log(listData);

  for (const data of listData) {
    generateListItem(data.title, data.contents, listContainer);
  }
}

function doErrored(message: string, titleField: HTMLInputElement, contentField: HTMLTextAreaElement) {
  const alertElement = document.getElementById('alert-element');
  if (alertElement) {
    alertElement.innerText = message;
    alertElement.classList.remove('d-none');
  }

  titleField.classList.add('errored');
  contentField.classList.add('errored');

  setTimeout(() => {
    if (alertElement) alertElement.classList.add('d-none');
    titleField.classList.remove('errored');
    contentField.classList.remove('errored');
  }, 10000);
}

document.getElementById('add-action')?.addEventListener('click', () => {
  // Hide list-container
  document.getElementById('list-container')?.classList.add('d-none');
  // Show add-container
  document.getElementById('add-container')?.classList.remove('d-none');
});

document.getElementById('logout-fr')?.addEventListener('click', () => {
  localStorage.removeItem('logged-in');
  window.location.href = '/login.html';
});

function exitEditor() {
  // Hide add-container
  document.getElementById('add-container')?.classList.add('d-none');
  // Show list-container
  document.getElementById('list-container')?.classList.remove('d-none');
}

document.getElementById('exit-action')?.addEventListener('click', () => {
  exitEditor();
});

document.getElementById('add-form')?.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  const targets = e.target as unknown as IListFormElements;

  const title = targets.title.value;
  const contents = targets.contents.value;

  if (stringIsEmptyOrNull(title) || stringIsEmptyOrNull(contents)) {
    doErrored('Empty title or contents', targets.title, targets.contents);
    return;
  }

  // Save.
  listData.push({
    title,
    contents
  });

  // Repaint.
  const listElement = document.getElementById('list-contents');
  if (listElement) repaintList(listElement);

  // Clear values.
  targets.title.value = "";
  targets.contents.value = "";

  // Close.
  exitEditor();
});
