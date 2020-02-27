'use strict'
// export function to index.js


const BASE_URL = 'https://thinkful-list-api.herokuapp.com/brannen'
function getBookmarks() {
    //return bookmarksApiFetch(base url/items)
    // this function will GET the current server store to display in landing page or any updates
    return bookmarksApiFetch(`${BASE_URL}/bookmarks`)
}
function createBookmark(title, url, description = 'placeholder', rating) {
    //this function will create a new bookmark and turn it into JSON
    //then post to the server store
    const newBookmark = {
        'title': title,
        'url': url,
        'desc': description
    }
    if(rating) {
        newBookmark.rating = rating;
    }
    
    const jsonText = JSON.stringify(newBookmark);
    return bookmarksApiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json'} ,
        body: jsonText
    })
}

function deleteBookmark(id) {
    //this function will delete a current bookmark from the server store
    return bookmarksApiFetch(BASE_URL + `/bookmarks/${id}`, {
        method: 'DELETE'
    })
}

// option-extension function editBookmark() {
    //this function will edit the rating and/or description of the bookmark}

function bookmarksApiFetch(...args){
    //this function will fetch the required information from the server store or return error handling messages to user depending on result of fetching from server
    let error;
    return fetch(...args).then(res => {
        if(!res.ok) {
            error = { code: res.status };
            if (!res.headers.get('content-type').includes('json')) {
                error.message = res.statusText;
                return Promise.reject(error)
            }
        }
    return res.json(); }).then(data => {
        if(error) {
            error.message = data.message;
            return Promise.reject(error);
        }
        return data;
    })
    }


export default {
 getBookmarks,
 createBookmark,
 deleteBookmark,
};