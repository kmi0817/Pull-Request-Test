const books = [
    "Harry Potter and the Sorcerer's Stone",
    "The Maze Runner"
]

const borrowBook = (title) => {
    return books.filter(book => book !== title);
}

const returnBook = (currentBooks, title) => {
    return [...currentBooks, title];
}

const leftBooks = borrowBook("The Maze Runner");
console.log(leftBooks);

const leftBooks2 = returnBook(leftBooks, "The Maze Runner");
console.log(leftBooks2);