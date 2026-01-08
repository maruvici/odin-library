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
 * Dark Mode Toggling
 */
window.onload = function () {
  let currentTheme = localStorage.getItem("theme");

  // Adjust visual theme of page
  if (currentTheme == "dark-mode") {
    document.body.classList.toggle("dark-mode");
    document.getElementById("toggleIcon").textContent = "sunny";
  } else {
    document.getElementById("toggleIcon").textContent = "bedtime";
  }
};

function toggleMode() {
  // Toggle dark mode on and off
  document.body.classList.toggle("dark-mode");

  // Save current theme for other webpages
  let theme = document.body.classList.contains("dark-mode")
    ? "dark-mode"
    : "light-mode";
  localStorage.setItem("theme", theme);

  // Change toggle icon to opposite theme icon
  if (theme == "dark-mode") {
    document.getElementById("toggleIcon").textContent = "sunny";
  } else {
    document.getElementById("toggleIcon").textContent = "bedtime";
  }
}

/**
 * Main Functions, Constructors
 * and Global Variables
 */

class Library {
  constructor(booksArr) {
    this.library = booksArr;
  }

  addBook(book) {
    this.library.push(book);
    this.refreshDisplay(this.library);
  }

  displayBooks() {
    this.library.forEach((book) => book.displayBook());
  }

  removeBook(event) {
    const bookCard = event.target.parentElement.parentElement.parentElement; // card -> buttons -> button -> icon
    const bookId = bookCard.dataset.id;
    const removedBook = this.library.find((book) => book.id === bookId);

    if (removedBook === undefined) {
      alert("No book exists to remove.");
      return;
    }

    const removedBookIndex = this.library.indexOf(removedBook);
    if (removedBookIndex > -1) {
      // splice if index/book in library
      this.library.splice(removedBookIndex, 1);
    }
    this.refreshDisplay(this.library);
  }

  readBook(event) {
    const bookCard = event.target.parentElement.parentElement.parentElement; // card -> buttons -> button -> icon
    const bookId = bookCard.dataset.id;
    const readBook = this.library.find((book) => book.id === bookId);

    if (readBook === undefined) {
      alert("No book exists to read.");
      return;
    }
    readBook.toggleRead();
    this.refreshDisplay(this.library);
  }

  refreshDisplay() {
    const messageContainer = document.querySelector(
      "h1[class=messageContainer]"
    );
    const bookContainer = document.querySelector(".bookContainer");
    bookContainer.replaceChildren();
    if (this.library.length === 0) {
      messageContainer.textContent = "NO BOOKS ADDED";
    } else {
      messageContainer.textContent = "MY LIBRARY";
    }
    this.displayBooks();
  }
}

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.id = crypto.randomUUID();
  }

  toggleRead() {
    this.read = !this.read;
  }

  displayBook() {
    const bookContainer = document.querySelector(".bookContainer");
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    bookCard.setAttribute("data-id", this.id);

    const bookDetails = document.createElement("div");
    bookDetails.classList.add("bookDetails");

    const pTitle = document.createElement("p");
    pTitle.classList.add("bookTitle");
    pTitle.textContent = `${this.title}`;

    const pAuthor = document.createElement("p");
    pAuthor.classList.add("bookAuthor");
    pAuthor.textContent = `by ${this.author}`;

    const pPages = document.createElement("p");
    pPages.classList.add("bookPages");
    pPages.textContent = `Pages: ${this.pages}`;

    const pRead = document.createElement("p");
    pRead.classList.add("bookRead");
    pRead.textContent = `${
      this.read
        ? "You've already read this book."
        : "You haven't read this book yet."
    }`;

    bookDetails.appendChild(pTitle);
    bookDetails.appendChild(pAuthor);
    bookDetails.appendChild(pPages);
    bookDetails.appendChild(pRead);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const removeButton = document.createElement("button");
    const removeIcon = document.createElement("i");
    removeIcon.classList.add("material-symbols-outlined");
    removeIcon.textContent = "cancel";
    removeButton.addEventListener("click", myLibrary.removeBook);

    const readButton = document.createElement("button");
    const readIcon = document.createElement("i");
    readIcon.classList.add("material-symbols-outlined");
    if (this.read) {
      readIcon.textContent = "visibility_off";
    } else {
      readIcon.textContent = "visibility";
    }
    readButton.addEventListener("click", myLibrary.readBook);

    removeButton.appendChild(removeIcon);
    readButton.appendChild(readIcon);
    buttons.appendChild(removeButton);
    buttons.appendChild(readButton);

    bookCard.appendChild(bookDetails);
    bookCard.appendChild(buttons);
    bookContainer.appendChild(bookCard);
  }
}

const myLibrary = new Library([]);
/**
 * Main application logic
 */
function init() {
  myLibrary.refreshDisplay();
}

/**
 * Event Listeners
 */
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#dialogIcon");
const addButton = document.querySelector("#addButton");
const closeButton = document.querySelector("#closeButton");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

/**
 * Form Handling
 */
const myForm = document.querySelector("#bookForm");
myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  const newBook = new Book(data.bookTitle, data.bookAuthor, data.bookPages);
  myLibrary.addBook(newBook);
  this.reset();
  dialog.close();
});
