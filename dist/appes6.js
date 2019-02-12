class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML += `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        
        list.appendChild(row);
    }

    showAlert(massege, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(massege));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div,form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleateBook(target){
        if(target.className === 'delete'){
            // console.log(target);
            target.parentElement.parentElement.remove();
            
        }
    }

    clearFields(){
        document.getElementById('title').value = ''; 
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

}

class Storg{
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
          books = [];
        } else {
          books = JSON.parse(localStorage.getItem('books'));
        }
    
        return books;
      }
    
      static displayBooks() {
        const books = Storg.getBooks();
    
        books.forEach((book) => {
          const ui  = new UI;
    
          // Add book to UI
          ui.addBookToList(book);
        });
      }
    
      static addBooks(book) {
        const books = Storg.getBooks();
    
        books.push(book);
    
        localStorage.setItem('books', JSON.stringify(books));
      }
    
      static removeBook(isbn) {
        const books = Storg.getBooks();
    
        books.forEach((book, index) => {
         if(book.isbn === isbn) {
          books.splice(index, 1);
         }
        });
    
        localStorage.setItem('books', JSON.stringify(books));
      }
}

document.addEventListener('DOMContentLoaded', Storg.displayBooks);

document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        ui.addBookToList(book);
        Storg.addBooks(book);
        ui.showAlert('Book Added!', 'success');
        ui.clearFields();
    }
    

    
});


document.getElementById('book-list').addEventListener('click', e =>{
    e.preventDefault();
    const ui = new UI();

    ui.deleateBook(e.target);
    Storg.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book Removed!', 'success');

    
});