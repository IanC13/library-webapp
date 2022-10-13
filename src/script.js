let myLibrary = []

let modal = document.getElementById('add-book-modal');
let addBookBtn = document.getElementById('addBookBtn');
let modalClose = document.getElementById('close-button');

let cardContainer = document.querySelector('.card-container');

const cardTemplate = document.getElementsByClassName('book-card')[0];

const modalAddBookBtn = document.getElementById('modalAddBook');


// Global variable
let currPos = 0;

// Constructor
function Book(title, author, pages, read, pos){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.pos = pos;
}

Book.prototype.info = function(){
    console.log(this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + (this.read ? 'read' : 'not yet read'))
}

function addBook(title, author, pages, read, pos){
    let book = new Book(title, author, pages, read, pos);
    myLibrary.push(book);
}

let b1 = new Book('The Godfather', 'Mario Puzo', '445', false, currPos)


let b2 = new Book('Old Man and the Sea', 'Ernest Hemmingway', '129', true);
//myLibrary.push(b2);


// Add book Modal
addBookBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
})

// Close modal using x
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
})

// Close modal by clicking blank space
window.addEventListener('click', (event) => {
    if (event.target == modal){
        modal.style.display = 'none';
    }
})

// Add book from form to array
// listener
modalAddBookBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let form_id = document.getElementById('form_id');

    let formTitle = document.getElementById('formTitle').value;
    let formAuthor = document.getElementById('formAuthor').value;
    let formPages = document.getElementById('formPages').value;
    let formRead = document.getElementById('formRead').checked;

    if (formTitle != '' && formAuthor != '' && formPages != ''){
        // Add book to array
        addBook(formTitle, formAuthor, formPages, formRead, currPos);
        form_id.reset();
        modal.style.display = 'none';
        currPos += 1;

        // make card and display; parameter is an object
        generate_card(myLibrary[myLibrary.length - 1]);
    }
    else{
        alert('Please enter all fields');
    }
})


// Book Card Functions
function changeCardReadBtn(event){
    if (event.target.classList.contains('true') == false){
        event.target.classList.toggle('true');
        event.target.textContent = 'Read';
    }
    else{
        // Back to not read
        event.target.classList.toggle('true')
        event.target.textContent = 'Not Read';
    }
}


// Create book card for every book
function generate_card(book_object){
    let newCard = cardTemplate.cloneNode(true);

    pTags = newCard.querySelectorAll('p');

    // Edit display elements
    pTags[0].textContent = book_object.title;
    pTags[1].textContent = book_object.author;
    pTags[2].textContent = book_object.pages + ' pages';

    // Read status
    let readStatus = newCard.querySelectorAll('button')[0];

    if (book_object.read == true){
        readStatus.classList.add('true');
        readStatus.textContent = 'Read';
    } 

    // remove card button
    let removeCardBtn = newCard.querySelectorAll('button')[1];

    // data position attribute
    newCard.setAttribute('data-pos', book_object.pos);
    removeCardBtn.setAttribute('data-pos', book_object.pos);
    
    newCard.style.display = 'flex';
    readStatus.addEventListener('click', changeCardReadBtn);
    removeCardBtn.addEventListener('click', removeCardFn);
    cardContainer.appendChild(newCard);
}


// Removing an entry

function removeCardFn(event){
    myLibrary.splice(event.target.dataset.pos, 1);
    currPos -= 1;
    let childToBeRemoved = cardContainer.querySelector(`[data-pos="${event.target.dataset.pos}"]`)
    cardContainer.removeChild(childToBeRemoved);
}

