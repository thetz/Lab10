// script.js

import { router } from './router.js';

const headerText = document.querySelector('header > h1');
const settings = document.querySelector('header > img');

// When the back button is hit, set the state with the new page
window.addEventListener('popstate', e => {
  if (e.state?.page && e.state.page.startsWith('entry')) {
    router.setState('entry', true, Number(e.state.page.substr(5, e.state.page.length)));
  } else {
    router.setState(e.state?.page, true);
  }
});

// Go to header page when header button is clicked
headerText.addEventListener('click', () => {
  router.setState('home', false);
});

// Go to settings page when settings button is clicked
settings.addEventListener('click', () => {
  router.setState('settings', false);
});

document.addEventListener('DOMContentLoaded', () => {
  if(id == null){
    localStorage.setItem("id", 0);
    id = 0;
  } else {
    id = localStorage.getItem("id") + 1;
    localStorage.setItem("id", id);
  }
  
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.addEventListener('click', () => {
          let numEntry = Array.from(document.querySelector('main').childNodes).indexOf(newPost);
          router.setState('entry', false, numEntry + 1);
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});

var id = localStorage.getItem("id");

var factory = splitio({
  core: {
     authorizationKey: 'a4l7lgqgasr7f2fbvbr2i1md7p0l5ldbqln9',
     key: id
  }
});

// And get the client instance you'll use
var client = factory.client();

client.on(client.Event.SDK_READY, function() {
  var treatment = client.getTreatment('CSE110-Lab10');

  console.log(treatment);

  if (treatment === 'on') {
    document.getElementsByTagName("H1")[0].id = "";
  } else if (treatment === 'off') {
    document.getElementsByTagName("H1")[0].id = "blueify";
  } else {
    // Insert code for control treatment
  }
});

// client.destroy().then(function() {
//   // Your data is successfully flushed.
// });