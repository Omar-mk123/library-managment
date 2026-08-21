let books = [];

let nextId = 1;

function addBook(title, author, year) {

    const book = {
        id: nextId,
        title,
        author,
        year,
        available: true
    };

    books.push(book);

    nextId++;

    return book;
}

function getAllBooks() {
    return books;
}

function searchBooks(keyword) {

    const search = keyword.toLowerCase();

    return books.filter((book) =>
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search)
    );
}

function findBookById(id) {

    return books.find((book) => book.id === id);
}

function borrowBook(id) {

    const book = findBookById(id);

    if (!book) {
        throw new Error("Book not found.");
    }

    if (!book.available) {
        throw new Error("Book is already borrowed.");
    }

    book.available = false;

    return book;
}

function returnBook(id) {

    const book = findBookById(id);

    if (!book) {
        throw new Error("Book not found.");
    }

    if (book.available) {
        throw new Error("Book is already available.");
    }

    book.available = true;

    return book;
}

function deleteBook(id) {

    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
        throw new Error("Book not found.");
    }

    const deletedBook = books.splice(index, 1);

    return deletedBook[0];
}

module.exports = {
    addBook,
    getAllBooks,
    searchBooks,
    findBookById,
    borrowBook,
    returnBook,
    deleteBook
};

