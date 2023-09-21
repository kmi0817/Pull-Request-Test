const books = [
    "Harry Potter and the Sorcerer's Stone",
    "The Maze Runner"
]

const borrowBook = (title) => {
    return books.filter(book => book !== title);
}

const leftBooks = borrowBook("The Maze Runner");
console.log(leftBooks);