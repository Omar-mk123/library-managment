function isValidText(value) {
    return value.trim().length >= 2;
}

function isValidNumber(value) {
    return value !== "" && Number.isFinite(Number(value));
}

function toNumber(value) {
    return Number(value);
}

function displayHeader() {

    console.log("");
    console.log("==============================");
    console.log("     LIBRARY MANAGEMENT");
    console.log("==============================");
    console.log("");
}

function displayMenu() {

    console.log("1. Add Book");
    console.log("2. List Books");
    console.log("3. Search Book");
    console.log("4. Borrow Book");
    console.log("5. Return Book");
    console.log("6. Delete Book");
    console.log("7. Exit");
    console.log("");
}

function displayBooks(books) {

    if (books.length === 0) {
        console.log("No books found.");
        return;
    }

    console.log("");

    books.forEach((book) => {

        console.log(
            `ID: ${book.id} | ` +
            `Title: ${book.title} | ` +
            `Author: ${book.author} | ` +
            `Year: ${book.year} | ` +
            `Status: ${book.available ? "Available" : "Borrowed"}`
        );
    });

    console.log("");
}

function displaySuccess(message) {
    console.log(`\nSuccess: ${message}\n`);
}

function displayError(message) {
    console.log(`\nError: ${message}\n`);
}

module.exports = {
    isValidText,
    isValidNumber,
    toNumber,
    displayHeader,
    displayMenu,
    displayBooks,
    displaySuccess,
    displayError
};
