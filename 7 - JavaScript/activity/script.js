// Library ---------------------
let library = [
  {
    title: "Game of Thrones",
    author: "George R.R. Martin",
    isAvailable: true,
  },
  {
    title: "Harry Potter",
    author: "J. K. Rowling",
    isAvailable: true,
  },
  {
    title: "Broken Glass",
    author: "Alain Mabanckou",
    isAvailable: true,
  },
];

// Displaying Available Books

const displayAvailableBooks = function () {
  for (let i = 0; i < library.length; i++) {
    console.log(library[i].title);
  }
};

console.log("List of Available Books:");
displayAvailableBooks();

//Borrowing Books

const borrowBook = function (title) {
  let presentInLibrary = false;
  for (let i = 0; i < library.length; i++) {
    if (library[i].title == title) {
      presentInLibrary = true;

      if (library[i].isAvailable == true) {
        console.log(
          "This book is Available, Thank you for borrowing and trusting our library"
        );
        library[i].isAvailable = false;
        break;
      } else {
        console.log("This book is Already Borrowed by someone");
        break;
      }
    }
  }
  if (!presentInLibrary) {
    console.log("Book is not found in the Library List");
  }
};

console.log("Borrowing of Book:");
borrowBook("Harry Potter");
borrowBook("Harry Potter");
borrowBook("Broken Glass");
borrowBook("Broken Glass");
borrowBook("1984");
