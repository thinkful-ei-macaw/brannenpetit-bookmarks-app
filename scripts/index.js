
// import api from './api';
// import 'normalize.css';
// import store from './store';
import bookmarklist from './bookmarks-list.js';

const main = function () {
 /*api.getBookmarks()
  .then((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addItem(bookmark));
    bookmarklist.render();
  });
  bookmarklist.bindEventListeners(); */
  bookmarklist.render();
  bookmarklist.bindEventListeners();
  
};

$(main);
