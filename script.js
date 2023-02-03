"use strict";
let myLibrary = [];

class Book {
  constructor({ title, author, pages, isRead }) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = Boolean(isRead);
  }

  info() {
    const readStatus = this.isRead ? "Already read" : "Not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  }

  toggleRead() {
    this.isRead = !this.isRead;
  }
}

const addBookButton = document.querySelector('button[data-id="add_book"');
const booksSection = document.querySelector('section[data-id="books"]');
const submitButton = document.querySelector('button[data-id="submit_book"]');
const modal_overlay = document.querySelector('div[data-id="modal_overlay"');
const modal = document.querySelector('div[data-id="modal"');
modal.addEventListener("click", (e) => e.stopPropagation());

addBookButton.addEventListener("click", (e) => {
  if (modal_overlay.classList.contains("invisible")) {
    modal_overlay.classList.remove("invisible");
    submitButton.addEventListener("click", submitBook);
  } else {
    modal_overlay.classList.add("invisible");
    submitButton.removeEventListener("click", submitBook);
  }

  function submitBook(e) {
    e.preventDefault();
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#pages");
    const isReadInput = document.querySelector("#read");

    addBookToLibrary({
      title: titleInput.value,
      author: authorInput.value,
      pages: pagesInput.value,
      isRead: isReadInput.checked,
    });

    modal_overlay.classList.add("invisible");
    submitButton.removeEventListener("click", submitBook);
  }
});

modal_overlay.addEventListener("click", () => {
  modal_overlay.classList.add("invisible");
});

function addBookToLibrary({ title, author, pages, isRead }) {
  const book = new Book({ title, author, pages, isRead });
  const length = myLibrary.push(book);
  renderNewBook({ book, index: length - 1 });
}

function renderNewBook({ book, index }) {
  console.log(myLibrary);
  const div = makeBookCard(book, index);
  booksSection.appendChild(div);
}

function renderBooks() {
  booksSection.innerHTML = "";
  console.log(myLibrary);

  myLibrary.forEach((book, index) => {
    const div = makeBookCard(book, index);
    booksSection.appendChild(div);
  });
}

function makeBookCard(book, index) {
  const div = document.createElement("div");
  div.classList.add("book", "card");
  div.setAttribute("data-id", index);
  const h2 = document.createElement("h2");
  h2.innerText = book.title;
  const authorNode = document.createElement("p");
  authorNode.innerText = book.author;
  const pagesNode = document.createElement("p");
  pagesNode.innerText = book.pages;
  const isReadButton = document.createElement("button");
  isReadButton.innerText = book.isRead ? "Read" : "Not Read";
  book.isRead
    ? isReadButton.classList.add("read")
    : isReadButton.classList.add("unread");
  isReadButton.addEventListener("click", () => {
    book.toggleRead();
    if (book.isRead) {
      isReadButton.innerText = "Read";
      isReadButton.classList.remove("unread");
      isReadButton.classList.add("read");
    } else {
      isReadButton.innerText = "Not Read";
      isReadButton.classList.remove("read");
      isReadButton.classList.add("unread");
    }
  });

  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.addEventListener("click", (e) => {
    const bookElement = e.target.parentElement;
    myLibrary = myLibrary.filter(
      (_, index) => index !== +bookElement.getAttribute("data-id")
    );
    renderBooks();
  });

  div.append(h2, authorNode, pagesNode, isReadButton, removeButton);
  return div;
}
