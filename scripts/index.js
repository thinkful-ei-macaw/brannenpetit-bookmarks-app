
import api from './api.js';
// import 'normalize.css';
import store from './store.js';
import bookmarklists from './bookmarks-list.js';

const main = function () {
 api.getBookmarks()
  .then((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarklists.render();
  });
  bookmarklists.render();
  bookmarklists.bindEventListeners();
  
};

$(main);
