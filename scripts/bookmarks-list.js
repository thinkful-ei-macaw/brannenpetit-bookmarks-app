// import api from './api';
import store from './store.js';

function generateLandingPage() {
    return `<h1>Bookmarks App</h1>
    <form id="js-bookmarks-form">
      <div class="error-container" hidden>Some error text</div>
      <label for="bookmarks-entry"></label>
      <button type="submit" name="bookmarks-entry" class="js-bookmarks-entry">Add bookmark</button>
      <label for="filter-rating"></label>
      <select id="filter-rating" name="filter-rating" value="Rating" class="dropdown">
          <option value="0">Filter Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
      </select>
      <ul class="bookmarks-list js-bookmarks-list">
        ${generateBookmarksString(store.bookmarks.bookmarks)}



      </ul>
    </form>`
}
function generateBookmarkElement(bookmark) {
    //this function will generate the bookmark element for individual bookmarks
    return `<li class="bookmark" name="${bookmark.title}" id="${bookmark.id}">
    <button class="bookmarks">${bookmark.title} ${bookmark.rating}/5</button>
  </li>`
}

function generateBookmarksString(bookmarklist){
    const bookmarks = bookmarklist.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
}

function generateExtendedView(bookmark) {
    //this function will generate html and return it for the generation of extended view
    return `<div class="dropdown-expanded">
    <a href="${bookmark.url}">Visit Site</a>
    <p class="description">$${bookmark.url}</p>
  </div>`
}

function generateCreateBookmarkPage() {
    //this function will return the html necessary for the submission of a new bookmark into the store
    return `<div class="container">
    <h1>Bookmarks App</h1>
    <form id="js-new-bookmarks-form">
      <div class="error-container" hidden>Some error text</div>
      <label for="adding-bookmarks-entry">Add New Bookmark</label><br>
      <input type="text" name="bookmarks-entry" class="js-bookmarks-entry"><br>
      <label for="title-input"></label><br>
      <input type="text" name="bookmark-title-entry" class="bookmark-title-entry" placeholder="Add Title for Bookmark">
      <section>
        <select id="choose-rating" name="choose-rating" value="choose-rating" class="dropdown" required>
          <option value="0">Select Bookmark Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div class='expandable-description-box'>
          <input type="text" class="enter-description" name="enter-description" placeholder="Add a descritiopn (optional)">
        </div>
      </section>
      <button type="submit" class="cancel-button" name="cancel-button">Cancel</button>
      <button type="submit" class="create-button" name="create-button">Create</button>
    </form>
  </div>`
}

function render() {
    
    //renderError
    //this function will check if a filter has been applied for rating then place the generated bookmarks string in the index.html
    $('.main-container').append(generateLandingPage());
}

function renderAddBookmarkPage() {
    $("main").html(generateCreateBookmarkPage())
}

function renderExtendedView(id){
    const bookmark = store.findById(id);
    $(`#${id}`).append(generateExtendedView(bookmark));
}

function handleNewBookmarkSubmit() {
    //this function will look for a submit on the new bookmark button, prevent default, and then render the create new bookmark page
    $(".js-bookmarks-entry").on("click",  event => {
        event.preventDefault();
        renderAddBookmarkPage();
        console.log('its all coming together')

    })
}

function handleExtendedViewSelection(){
   
    $('ul').on('click', '.bookmarks', event => {
        event.preventDefault();
        const id = getBookmarkIdFromElement(event.target);
        renderExtendedView(id);
    })
}



function handleCreatedBookmarkSubmit() {
    // this function will listen for a submission on the create bookmark page and submit the inputs provided into the factory function for bookmark objects and send that to the server store and current store
}

function getBookmarkIdFromElement(button) {
    //this function will return the id from the bookmark that gets clicked
    return $(button).closest('.bookmark').attr('id');
}

function generateError() {}
function renderError() {}
function handleCloseError() {}

function handleDeleteBookmarkClicked() {
    //this function will listen for a delete on a specific bookmark element and remove that from the store
}

function handleRatingSelect() {
    // this function will listen for a selection on the rating selector and filter the bookmark list
}


function bindEventListeners() {
    //This function will call all event listeners that contain everything else to be use by user
    handleNewBookmarkSubmit();
    handleExtendedViewSelection();
   
}

export default {
    render,
    bindEventListeners,
}