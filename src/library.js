const readline = require("readline");

const {
    addBook,
    getAllBooks,
    searchBooks,
    borrowBook,
    returnBook,
    deleteBook
} = require("./book.service");

const {
    isValidText,
    isValidNumber,
    toNumber,
    displayHeader,
    displayMenu,
    displayBooks,
    displaySuccess,
    displayError
} = require("./utils");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {

    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function addBookHandler() {

    const title = await askQuestion("Enter book title: ");

    const author = await askQuestion("Enter author: ");

    const year = await askQuestion("Enter publication year: ");

    if (!isValidText(title)) {
        displayError("Invalid book title.");
        return;
    }

    if (!isValidText(author)) {
        displayError("Invalid author name.");
        return;
    }

    if (!isValidNumber(year)) {
        displayError("Invalid publication year.");
        return;
    }

    const book = addBook(
        title.trim(),
        author.trim(),
        toNumber(year)
    );

    displaySuccess(`Book "${book.title}" added successfully.`);
}

async function searchBookHandler() {

    const keyword = await askQuestion("Enter title or author: ");

    if (!isValidText(keyword)) {
        displayError("Search keyword cannot be empty.");
        return;
    }

    const results = searchBooks(keyword);

    displayBooks(results);
}

async function borrowBookHandler() {

    const id = await askQuestion("Enter book ID: ");

    if (!isValidNumber(id)) {
        displayError("Invalid book ID.");
        return;
    }

    const book = borrowBook(toNumber(id));

    displaySuccess(`Book "${book.title}" borrowed successfully.`);
}

async function returnBookHandler() {

    const id = await askQuestion("Enter book ID: ");

    if (!isValidNumber(id)) {
        displayError("Invalid book ID.");
        return;
    }

    const book = returnBook(toNumber(id));

    displaySuccess(`Book "${book.title}" returned successfully.`);
}

async function deleteBookHandler() {

    const id = await askQuestion("Enter book ID: ");

    if (!isValidNumber(id)) {
        displayError("Invalid book ID.");
        return;
    }

    const book = deleteBook(toNumber(id));

    displaySuccess(`Book "${book.title}" deleted successfully.`);
}

async function main() {

    displayHeader();

    let running = true;

    while (running) {

        displayMenu();

        const choice = await askQuestion("Choose an option: ");

        try {

            switch (choice) {

                case "1":
                    await addBookHandler();
                    break;

                case "2":
                    displayBooks(getAllBooks());
                    break;

                case "3":
                    await searchBookHandler();
                    break;

                case "4":
                    await borrowBookHandler();
                    break;

                case "5":
                    await returnBookHandler();
                    break;

                case "6":
                    await deleteBookHandler();
                    break;

                case "7":
                    running = false;
                    console.log("\nGoodbye! 👋\n");
                    break;

                default:
                    displayError("Invalid option.");
            }

        } catch (error) {

            displayError(error.message);
        }
    }

    rl.close();
}

main();
