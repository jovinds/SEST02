let books = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    genre: "Action",
    status: "available",
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    genre: "Comedy",
    status: "available",
  },
  { title: "Dune", genre: "Fantasy", status: "available" },
  { title: "Ready Player One", genre: "Fantasy", status: "available" },
  { title: "The Martian", genre: "Fantasy", status: "available" },
  { title: "The Hunger Games", genre: "Action", status: "available" },
  { title: "Guardians of the Galaxy", genre: "Action", status: "available" },
  { title: "The Three-Body Problem", genre: "Fantasy", status: "available" },
  { title: "Good Omens", genre: "Comedy", status: "available" },
  { title: "The Matrix: The Awakening", genre: "Action", status: "available" },
  { title: "Doctor Who", genre: "Fantasy", status: "available" },
  { title: "Edge of Tomorrow", genre: "Fantasy", status: "available" },
  { title: "Pacific Rim", genre: "Action", status: "available" },
  { title: "Logan", genre: "Action", status: "available" },
  { title: "The Umbrella Academy", genre: "Action", status: "available" },
];

// const bookList = document.querySelector(".book-list");
const bookAvailable = document.querySelector(".books");
const genreFilter = document.querySelector("#genre-filter");

const inputTitle = document.querySelector(".input-title");
const inputGenre = document.querySelector("#genre-selection");
const saveBookButton = document.querySelector(".save-button");

genreFilter.addEventListener("change", filterBooks);
saveBookButton.addEventListener("click", addNewBooktoList);
bookAvailable.addEventListener("click", borrowAndReturn);
document.addEventListener("DOMContentLoaded", displayAllBooks);

// Adding books to the library

//combine the library to the newly added book
function addNewBooktoList(event) {
  event.preventDefault();
  const trimmedTitle = inputTitle.value.trim();
  const selectedGenre = inputGenre.value;
  saveBooksToLocal(trimmedTitle, selectedGenre);
  if (trimmedTitle !== "" && selectedGenre !== "default") {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");
    bookContainer.classList.add(selectedGenre);

    const bookName = document.createElement("li");
    bookName.classList.add("book-name");
    bookName.textContent = trimmedTitle;

    const borrowButton = document.createElement("button");
    borrowButton.classList.add("borrow-button");
    borrowButton.textContent = "Borrowed";

    bookContainer.appendChild(bookName);
    bookContainer.appendChild(borrowButton);
    bookAvailable.appendChild(bookContainer);
  } else alert("Book Name is empty or Genre is not Selected");
  // const newBook = {
  //   title: trimmedTitle,
  //   genre: selectedGenre,
  //   status: "available",
  // };
  // const combinedBooks = [...booksFromLibrary, newBook];
  inputTitle.value = "";
  inputGenre.value = "default";
  // console.log(combinedBooks);
  // return combinedBooks;
}
function getBooksFromLocal() {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
}

function saveBooksToLocal(title, genre) {
  let libraryBooks = getBooksFromLocal();
  const newBook = {
    title: title,
    genre: genre,
    status: "available",
  };

  libraryBooks.push(newBook);
  const serializedBooks = JSON.stringify(libraryBooks);
  localStorage.setItem("books", serializedBooks);
}

// Displaying all Books on the container
function displayAllBooks() {
  const books = getBooksFromLocal();
  books.forEach(function (book) {
    if (book.title !== "" && book.genre !== "default") {
      const bookContainer = document.createElement("div");
      bookContainer.classList.add("book-container");
      bookContainer.classList.add(book.genre);

      const bookName = document.createElement("li");
      bookName.classList.add("book-name");
      bookName.textContent = book.title;

      const borrowButton = document.createElement("button");
      borrowButton.classList.add("borrow-button");
      borrowButton.textContent = "Borrowed";

      bookContainer.appendChild(bookName);
      bookContainer.appendChild(borrowButton);
      bookAvailable.appendChild(bookContainer);
    }
  });
}

function borrowBook() {}

// Filtering the books based on genre

function filterBooks(event) {
  const selectedValue = event.target.value;
  const filteredBooks = bookAvailable.children;

  // Loop through all the book containers

  Array.from(filteredBooks).forEach(function (bookContainer) {
    if (selectedValue === "all") {
      bookContainer.style.display = "flex";
    } else if (bookContainer.classList.contains(selectedValue)) {
      bookContainer.style.display = "flex";
    } else {
      bookContainer.style.display = "none";
    }
  });
}

function borrowAndReturn(event) {
  const button = event.target;
  if (event.target.classList.contains("borrow-button")) {
    const bookDiv = button.parentElement;
    if (button.classList.contains("returned")) {
      const title = bookDiv.innerText;
      button.classList.remove("returned");
      button.textContent = "Borrowed";
      // updateBookStatus(title, "unavailable");
    } else {
      const title = bookDiv.innerText;
      button.classList.add("returned");
      button.textContent = "Returned";
      // updateBookStatus(title, "available");
      console.log(bookDiv);
    }
  }
}
// function updateBookStatus(title, status) {
//   const books = getBooksFromLocal();
//   const book = books.find((book) => {
//     return book.title === title;
//   });
//   book.status = status;
//   const serializedTodos = JSON.stringify(books);
//   localStorage.setItem("books", serializedTodos);
// }
