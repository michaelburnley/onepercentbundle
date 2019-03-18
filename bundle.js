{/* <script src="https://unpkg.com/axios/dist/axios.min.js"></script> */}
// https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#youre-building-a-quick-order-form-beware
const headers = {
    'X-Shopify-Storefront-Access-Token': ''
};

const bookContainer = document.querySelector("#book-container");
const form = document.querySelector("#book-search");

const getBooksQuery = (keyword) => `{ allBooks(filter: { q:"${keyword}"}) { author title url } }`;

const renderBooks = ({ data }) => {
  const { allBooks = [] } = data;

  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.firstChild);
  }

  const bookFragment = document.createDocumentFragment();
  const booksList = document.createElement('ul');

  allBooks.forEach((book) => {
    const booksListItem = document.createElement('li');
    const booksListLink = document.createElement('a');
    booksListLink.href = book.url;
    booksListLink.textContent = "Click To View";
    booksListItem.textContent = `${book.title} - ${book.author}`;
    booksListItem.appendChild(booksListLink);
    booksList.appendChild(booksListItem);
  });

  bookFragment.appendChild(booksList);
  bookContainer.appendChild(bookFragment);
}

const loadBooks = (ev) => {
  ev.preventDefault();
  const keyword = form.elements["search"].value;

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: getBooksQuery(keyword)
    })
  };

  fetch(`http://localhost:3000`, options)
    .then(res => res.json())
    .then(renderBooks);

  form.reset();
}

form.addEventListener("submit", loadBooks)