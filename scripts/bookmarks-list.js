import api from './api.js';
import store from './store.js';

function generateLandingPage() {
    // this function generates the html for the landing page
    return `<h1>Bookmark Library App</h1>
    <div class="form-container">
    <form id="js-bookmarks-form">
      <label for="bookmarks-entry"></label>
      <button type="submit" name="bookmarks-entry" class="js-bookmarks-entry">Add bookmark</button>
      <label for="filter-rating" aria-label="filter-rating-dropdown"></label>
      <select id="filter-rating" name="filter-rating" value="Rating" class="dropdown">
          <option value="1">Current filter: ${store.bookmarks.filter}</option>
          <option value="0">No filter</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
      </select>
      </form>
      </div>
      <ul class="bookmarks-list js-bookmarks-list">
        ${generateBookmarksString(store.bookmarks.bookmarks, store.bookmarks.filter)}
      </ul>
    `
}
function generateBookmarkElement(bookmark) {
    //this function will generate the bookmark element for individual bookmarks
    return`
    <li class="bookmark" name="${bookmark.title}" id="${bookmark.id}">
     <button class="bookmark-button"><span class="title-span">${bookmark.title}</span> ${renderRating(bookmark.rating)}</button>
        <div class="dropdown-expanded hidden">
         <a href="${bookmark.url}">Visit Site</a>
         <p class="description">${bookmark.desc}</p>
         <button type="submit" class="delete-button" name="delete-button">Delete</button>
       </div>
    </li>`   
}

function renderRating(rating) {
    return rating ? `<span class="rating-span">${rating}/5</span>` : '';
}

function generateBookmarksString(bookmarklist, filter){
    let bookmarks = bookmarklist
    if(filter){ 
        bookmarks = bookmarks.filter(function(item) {
            return item.rating >= filter;    
        })
    }
    bookmarks = bookmarks.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
}

function generateCreateBookmarkPage() {
    //this function will return the html necessary for the submission of a new bookmark into the store
    return `
    <h1>Create A New Bookmark</h1>
    <form id="js-new-bookmarks-form">
      <div class="error-container" hidden>Some error text</div>
      <label for="adding-bookmarks-entry">Add New Bookmark URL</label>
      <input type="url" name="bookmarks-entry" class="js-bookmarks-url-entry" placeholder="https://www.exampleurl.com" required>
      <label for="title-input">Add Bookmark Title</label>
      <input type="text" name="bookmark-title-entry" class="bookmark-title-entry" placeholder="Add Title for Bookmark">
      <section class="rating-box">
        <select id="choose-rating" name="choose-rating" class="dropdown">
          <option disabled selected value>Select Bookmark Rating</option>
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
      <button type="submit" class="create-button" name="create-button">Create</button>
      <button type="submit" class="cancel-button" name="cancel-button">Cancel</button>
    </form>
  `
}

function handleCreateButton() {
    $('main').on('click', '.create-button', event => {
        event.preventDefault();
        const newBookmarkTitle = $('.bookmark-title-entry').val();
        const newBookmarkUrl = $('.js-bookmarks-url-entry').val();
        const newBookmarkRating = $('#choose-rating').val();
        console.log(`${newBookmarkRating}`);
        const newBookmarkDescription = $('.enter-description').val();
        store.bookmarks.adding = false
        api.createBookmark(newBookmarkTitle, newBookmarkUrl, newBookmarkDescription, newBookmarkRating).then((newBookmark) => {
            store.addBookmark(newBookmark);
            render();
        }).catch((error) => {
            store.setError(error.message);
            renderError();
        })
    })
}

function handleDeleteBookmarkClicked() {
    //this function will listen for a delete on a specific bookmark element and remove that from the store
    console.log('ive got this');
    $('main').on('click', '.delete-button', event => {
        const id = getBookmarkIdFromElement(event.currentTarget);
        event.preventDefault();
        api.deleteBookmark(id).then(() => {
            store.findAndDeleteBookmark(id);
            render();
        }).catch((error) => {
            store.setError(error.message);
            renderError();
        })
    })
}

function render() {
    renderError();
    $('main').html(generateLandingPage());
}

function renderAddBookmarkPage() {
    $('main').html(generateCreateBookmarkPage())
}


function handleNewBookmarkSubmit() {
    //this function will look for a submit on the new bookmark button, prevent default, and then render the create new bookmark page
    $('main').on('click', '.js-bookmarks-entry',  event => {
        event.preventDefault();
        renderAddBookmarkPage();
        store.bookmarks.adding = true
        

    })
}

function getBookmarkIdFromElement(button) {
    //this function will return the id from the bookmark that gets clicked
    return $(button).closest('.bookmark').attr('id');
}

function handleExtendedViewSelection(){
   /*if(store.bookmarks.expanded === false) { */
    
    $('main').on('click', '.bookmark-button', event => {
        $(event.target).closest('li').find('div').toggleClass('hidden');
        if (store.expanded === false) {
            store.expanded = true;
        } if (store.expanded === true){
            store.expanded = false;
        }
    })
} 


function handleCancelCreateBookmark() {
    // this function will listen for a submission on the create bookmark page and submit the inputs provided into the factory function for bookmark objects and send that to the server store and current store
    $('main').on('click', '.cancel-button', event => {
        event.preventDefault();
        render();
    })
}



function generateError(message) {
    return `
    <section class="error-text">
        <button id="cancel-error">X</button>
        <p>${message}</p>
    </section>
    `;
};
function renderError() {
    if(store.bookmarks.error) {
        const el = generateError(store.bookmarks.error);
        console.log(store.bookmarks.error);
        $('main').append(el);
    } else {
        $('.error-text').remove()
    };
};
function handleCloseError() {
    $('main').on('click', '#cancel-error', () => {
        store.setError(null);
        renderError();
    });
};



function handleRatingSelect() {
    // this function will listen for a selection on the rating selector and filter the bookmark list
    $("main").on('change', '#filter-rating', function() {
        console.log($(this).val());
        let selectedVal = $(this).find(':selected').val();
        store.bookmarks.filter = parseInt(selectedVal);
        render();
    } )
}


function bindEventListeners() {
    //This function will call all event listeners that contain everything else to be use by user
    handleNewBookmarkSubmit();
    handleExtendedViewSelection();
    handleRatingSelect();
    handleCreateButton();
    handleCancelCreateBookmark();
    handleDeleteBookmarkClicked();
    handleCloseError();
   
}

export default {
    render,
    bindEventListeners,
}