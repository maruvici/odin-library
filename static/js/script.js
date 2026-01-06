/**
 * Project: Odin Library
 * Author: maruvici
 */

"use strict";
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  init();
});

/**
 * Functions, Constructors and Global Variables
 */

const myLibrary = [ ];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

// Toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBook(title, author, pages) {
  const id = crypto.randomUUID();
  const book = new Book(title, author, pages, false, id);
  myLibrary.push(book);
  refreshDisplay();
}  

function displayBook(book) {
  const bookContainer = document.querySelector(".bookContainer");
  const bookCard = document.createElement("div");
  bookCard.classList.add("bookCard")
  bookCard.setAttribute("data-id", book.id);

  const pTitle = document.createElement("p");
  pTitle.classList.add("bookTitle");
  pTitle.textContent = `${book.title}`;

  const pAuthor = document.createElement("p");
  pAuthor.classList.add("bookAuthor");
  pAuthor.textContent = `${book.author}`;

  const pPages = document.createElement("p");
  pPages.classList.add("bookPages");
  pPages.textContent = `${book.pages}`;

  const pRead = document.createElement("p");
  pRead.classList.add("bookRead");
  pRead.textContent = `${
    book.read
      ? "You've already read this book."
      : "You haven't read this book yet."
  }`;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", removeBook);

  const readButton = document.createElement("button");
  if (book.read) {
    readButton.textContent = "Unread";
  } else {
    readButton.textContent = "Read";
  }
  readButton.addEventListener("click", readBook);

  bookCard.appendChild(pTitle);
  bookCard.appendChild(pAuthor);
  bookCard.appendChild(pPages);
  bookCard.appendChild(pRead);
  bookCard.appendChild(removeButton);
  bookCard.appendChild(readButton);
  bookContainer.appendChild(bookCard);
}

function displayBooksInLibrary() {
  myLibrary.forEach((book) => displayBook(book));
}

function removeBook(event) {
  const bookCard = event.target.parentElement;
  const bookId = bookCard.dataset.id;
  const removedBook = myLibrary.find((book) => book.id === bookId);

  if (removedBook === undefined) {
    alert("No book exists to remove.");
    return;
  }

  const removedBookIndex = myLibrary.indexOf(removedBook);
  if (removedBookIndex > -1) {
    // splice if index/book in library
    myLibrary.splice(removedBookIndex, 1);
  }

  refreshDisplay();
}

function readBook(event) {
  const bookCard = event.target.parentElement;
  const bookId = bookCard.dataset.id;
  const readBook = myLibrary.find((book) => book.id === bookId);

  if (readBook === undefined) {
    alert("No book exists to read.");
    return;
  }
  readBook.toggleRead();

  refreshDisplay();
}

function refreshDisplay() {
    const messageContainer = document.querySelector("h1[class=messageContainer]");
    const bookContainer = document.querySelector(".bookContainer");
    bookContainer.replaceChildren();
    if (myLibrary.length === 0) {
        messageContainer.textContent = "No books added. Add some!"
    } else {
        messageContainer.textContent = ""
    }
    displayBooksInLibrary();
}

/**
 * Main application logic
 */

function init() {
    refreshDisplay();
}