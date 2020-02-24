'use strict'
// export function to index.js


const BASE_URL = ''
function getBookmarks() {
    //return bookmarksApiFetch(base url/items)
    // this function will GET the current server store to display in landing page or any updates
}
function createBookmark() {
    //this function will create a new bookmark and turn it into JSON
    //then post to the server store
}

function deleteBookmark() {
    //this function will delete a current bookmark from the server store
}

// option-extension function editBookmark() {
    //this function will edit the rating and/or description of the bookmark}

function bookmarksApiFetch(){
    //this function will fetch the required information from the server store or return error handling messages to user depending on result of fetching from server
}
export default {
 getBookmarks,
 createBookmark,
 deleteBookmark,
};