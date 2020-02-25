const bookmarks = {
    bookmarks: [
      {
        id: 'x56w',
        title: 'Title 1',
        rating: 3,
        url: 'http://www.title1.com',
        description: 'lorem ipsum dolor sit',
        expanded: false
      },
      {
        id: '6ffw',
        title: 'Title 2',
        rating: 5,
        url: 'http://www.title2.com',
        description: 'dolorum tempore deserunt',
        expanded: false
      } 
    ],
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

function addBookmark(title) {
    //this function will add a bookmark to the store
};

function findAndDeleteBookmark() {
    //this function will find a bookmark by id and delete that bookmark from the store
}

function addRating() {
    //this function will set the rating value of the bookmark
};

export default {
    bookmarks,
    error,
    filterByRating,
    findById,
    addBookmark,
    findAndDeleteBookmark,
    addRating,
}
