(function (w) {

/* DOM Elements */
const
form     = document.getElementById('bookmark-form'),
siteName = document.getElementById('site-name'),
siteUrl  = document.getElementById('site-url'),
results  = document.getElementById('results');


// Display current year
document.getElementById('year').innerText = (new Date).getFullYear();


/**
* Functions
*/
const saveBookmark = (e) => {
  e.preventDefault();   // Prevent form from being submitted

  // Get input values and create object
  const name     = siteName.value;
  const url      = siteUrl.value;
  const bookmark = {name, url}

  // Initialize bookmarks array variable
  let bookmarks;

  // Get bookmarks from local storage
  if (! localStorage.getItem('bookmarks'))
    bookmarks = [];
  else 
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Add new bookmark to bookmarks array
  bookmarks.push(bookmark);

  // Put new array into local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Reset form
  form.reset();

  // Reload bookmarks
  displayBookmarks();
}

// Get bookmarks from local storage and display them in results div
const displayBookmarks = () => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  if (! bookmarks) return;

  results.innerHTML = '';

  bookmarks.forEach(b => {
    results.innerHTML += `
      <div class="well">
        <span class="title">${b.name}</span>
        <div class="links">
          <a href="${b.url}" class="btn btn-default" target="_blank">Visit</a>
          <a class="btn btn-danger" onclick="deleteBookmark('${b.name}')">Delete</a>
        </div>
      </div>
    `;
  });
}

w.deleteBookmark = (name) => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Cycle through bookmarks
  bookmarks.forEach((v, k) => {
    // Confirm and delete
    if (v.name === name) {
      if (! confirm(`Are you sure you want to delete "${name}"`)) return;

      bookmarks.splice(k, 1);
    }
  });

  // Set new bookmarks array in local storage and display it
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displayBookmarks();
}


/* Events */
form.addEventListener('submit', saveBookmark);
document.addEventListener('DOMContentLoaded', displayBookmarks);


}(window))
