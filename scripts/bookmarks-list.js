import api from './api.js';
import store from './store.js';

function generateLandingPage() {
    return `<h1>Bookmarks App</h1>
    <div class="form-container">
    <form id="js-bookmarks-form">
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
     <button class="bookmarks">${bookmark.title} ${bookmark.rating}/5</button>
        <div class="dropdown-expanded hidden">
         <a href="${bookmark.url}">Visit Site</a>
         <button type="submit" class="delete-button" name="delete-button">Delete</button>
         <p class="description">${bookmark.desc}</p>
       </div>
    </li>`
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

/*function generateExtendedView(bookmark) {
    //this function will generate html and return it for the generation of extended view
    return `<div class="dropdown-expanded">
    <a href="${bookmark.url}">Visit Site</a>
    <button type="submit" class="delete-button" name="delete-button">Delete</button>
    <p class="description">$${bookmark.url}</p>
  </div>`
} */

function generateCreateBookmarkPage() {
    //this function will return the html necessary for the submission of a new bookmark into the store
    return `
    <h1>Bookmarks App</h1>
    <form id="js-new-bookmarks-form">
      <div class="error-container" hidden>Some error text</div>
      <label for="adding-bookmarks-entry">Add New Bookmark</label><br>
      <input type="url" name="bookmarks-entry" class="js-bookmarks-url-entry" required><br>
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
  `
}

function handleCreateButton() {
    console.log('why isnt this working')
    $('main').on('click', '.create-button', event => {
        event.preventDefault();
        const newBookmarkTitle = $('.bookmark-title-entry').val();
        const newBookmarkUrl = $('.js-bookmarks-url-entry').val();
        const newBookmarkRating = $('#choose-rating').val();
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
    //renderError
    //this function will check if a filter has been applied for rating then place the generated bookmarks string in the index.html
    $('main').html(generateLandingPage());
}

function renderAddBookmarkPage() {
    $('main').html(generateCreateBookmarkPage())
}

/* function renderExtendedView(id){
    const bookmark = store.findById(id);
    $(`#${id}`).append(generateExtendedView(bookmark));
} */

function handleNewBookmarkSubmit() {
    //this function will look for a submit on the new bookmark button, prevent default, and then render the create new bookmark page
    $('main').on('click', '.js-bookmarks-entry',  event => {
        event.preventDefault();
        renderAddBookmarkPage();
        store.bookmarks.adding = true
        console.log('its all coming together')

    })
}

function getBookmarkIdFromElement(button) {
    //this function will return the id from the bookmark that gets clicked
    return $(button).closest('.bookmark').attr('id');
}

function handleExtendedViewSelection(){
   /*if(store.bookmarks.expanded === false) { */
    
    $('main').on('click', '.bookmarks', event => {
        console.log('function runnin');
        event.preventDefault();
        $(event.target).closest('li').find('div').toggleClass('hidden');
        if (store.expanded === false) {
            store.expanded = true;
        } if (store.expanded === true){
            store.expanded = false;
        }
    })
} /* if(store.expanded === true) {
    $('ul').on('click', '.bookmarks', event => {
        event.preventDefault();
        render();
        store.expanded = false;
})
}
} */



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