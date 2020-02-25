
// import api from './api';
// import 'normalize.css';
// import store from './store';
import bookmarklists from './bookmarks-list.js';

const main = function () {
 /*api.getBookmarks()
  .then((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addItem(bookmark));
    bookmarklist.render();
  });
  bookmarklist.bindEventListeners(); */
  bookmarklists.render();
  bookmarklists.bindEventListeners();
  
};

$(main);
