
var status = 0;
//changing edit button to modify button

function changingEditbutton(el){
    var editbutton = el.parentElement.parentElement.querySelector(".edit");
        editbutton.setAttribute("class", "modify" );
        editbutton.setAttribute("type","modify");
        editbutton.innerHTML=("modify" );
  }

//changing edit delete to cancel button

function changingDeletebutton(el){
    var deletebutton = el.parentElement.parentElement.querySelector(".delete");
        deletebutton.setAttribute("class", "cancel" );
        deletebutton.setAttribute("type","cancel");
        deletebutton.innerHTML=("cancel" );
  }

function changingCancelbutton(el){
    var cancelbutton = el.parentElement.parentElement.querySelector(".cancel");
        cancelbutton.setAttribute("class", "delete" );
        cancelbutton.setAttribute("type","delete");
        cancelbutton.innerHTML=("delete" );
  }


function changingModifybutton(el){
    var editbutton = el.parentElement.parentElement.querySelector(".modify");
        editbutton.setAttribute("class", "edit" );
        editbutton.setAttribute("type","edit");
        editbutton.innerHTML=("edit" );
  }



// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="booktitle">${book.title}</td>
      <td class="bookauthor">${book.author}</td>
      <td class="bookisbn">${book.isbn}</td>
      <td><a href="#" class="delete">delete</a></td>
      <td><a href="#" class="edit">edit</a></td>
    `;

    list.appendChild(row);
  }


  static modifyBook(el) {
    if(status == 1){
      if(el.className == 'modify') {
        // Show success message
        var booktitle = el.parentElement.parentElement.querySelector(".booktitle");
        booktitle.innerHTML = booktitle.querySelector('#booktitleInput').value;

        var bookauthor = el.parentElement.parentElement.querySelector(".bookauthor");
        bookauthor.innerHTML = bookauthor.querySelector('#bookauthorInput').value;

        var bookisbn = el.parentElement.parentElement.querySelector(".bookisbn");
        bookisbn.innerHTML = bookisbn.querySelector('#bookisbnInput').value;
        
        status = 0;
        changingCancelbutton(el);
        changingModifybutton(el);
      }
    }
  }



  static deleteBook(el) {

    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
        // Show success message
      UI.showAlert('Removed', 'success');
    }
  }


  static cancelBook(el) {
 
    if(el.classList.contains('cancel')) {
        var booktitle = el.parentElement.parentElement.querySelector(".booktitle");
        booktitle.innerHTML = booktitle.getAttribute("value");

        var bookauthor = el.parentElement.parentElement.querySelector(".bookauthor");
        bookauthor.innerHTML = bookauthor.getAttribute("value");

        var bookisbn = el.parentElement.parentElement.querySelector(".bookisbn");
        bookisbn.innerHTML = bookisbn.getAttribute("value");

        changingCancelbutton(el);
        changingModifybutton(el);
        status = 0;
    }
  }

// UI editBook
  static editBook(el) {
    if(status == 0){
      if(el.classList.contains('edit')) {
        
        var booktitle = el.parentElement.parentElement.querySelector(".booktitle");
        booktitle.setAttribute("value", booktitle.textContent);
        booktitle.innerHTML = ("<input id = booktitleInput>");



        var bookauthor = el.parentElement.parentElement.querySelector(".bookauthor");
        bookauthor.setAttribute("value", bookauthor.textContent);
        bookauthor.innerHTML = ("<input id = bookauthorInput>");

        var bookisbn = el.parentElement.parentElement.querySelector(".bookisbn");
        bookisbn.setAttribute("value", bookisbn.textContent);
        bookisbn.innerHTML = ("<input id = bookisbnInput>");
        changingEditbutton(el);
        changingDeletebutton(el);
        status = 1;
    }
    }
    
  }



  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if(title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);


    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store

    // Show success message
    UI.showAlert('Saved', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  if (status == 0){
    UI.editBook(e.target);
    UI.deleteBook(e.target);
  }
  else{
    //Cancel book from UI
    UI.cancelBook(e.target);
    //Modify book form UI
    UI.modifyBook(e.target);
  }
  


});