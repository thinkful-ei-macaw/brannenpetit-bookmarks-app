const bookmarks = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0
  };

let error = null;
let filterByRating = false;

function findById(id){
    //this function will find a bookmark by id in order to show a detailed view from the default landing page
    return bookmarks.bookmarks.find(item => item.id === id)
};

function addBookmark(newBook) {
    //this function will add a bookmark to the store
    bookmarks.bookmarks.push(newBook);
};

function setError(error) {
  bookmarks.bookmarks.error = error;
}

function findAndDeleteBookmark(id) {
    //this function will find a bookmark by id and delete that bookmark from the store
    bookmarks.bookmarks = bookmarks.bookmarks.filter(currentBook => currentBook.id !== id);
}

/*function addRating(rating) {
    //this function will set the rating value of the bookmark
};*/

export default {
    bookmarks,
    error,
    filterByRating,
    findById,
    addBookmark,
    findAndDeleteBookmark,
    setError
}
