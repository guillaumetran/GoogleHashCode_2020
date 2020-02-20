//Dependencies
const fs = require('fs');

//Read File
const data = fs.readFileSync("./parsed_file/f_libraries_of_the_world.json", "utf8")
const json = JSON.parse(data);
const { parsedValue } = json
const { books, scanningDays, libraries } = parsedValue

function calcPotentialScore(maxBooks, books) {
  let potentialScore = 0;
  books.map((book, index) => {
    potentialScore += book.score;
  });
  return (potentialScore)
};

function sortLibraries(libraries) {
  libraries.map((library, index) => {
    let potentialScore = 0;
    const { signUpTime, scannedBooksPerDay, books } = library

    //Sort Books by score
    let sortedBooks = [];
    books.map((book, index) => {
      let score = getBookScore(book.id)
      potentialScore += score;
      sortedBooks.push({ score, id: index })
    });
    sortedBooks.sort((a, b) => { return b.score - a.score });

    //Check Maximum Books Scanned
    let maxBooksScanned = scanningDays - signUpTime;
    maxBooksScanned *= scannedBooksPerDay
    maxBooksScanned = maxBooksScanned > books.length ? books.length : maxBooksScanned;

    //Calc Potential Score
    potentialScore = calcPotentialScore(maxBooksScanned, sortedBooks);
    library.potentialScore = potentialScore;
    library.id = index;
  });
  libraries.sort((a, b) => { return b.potentialScore - a.potentialScore });
  return libraries;
};

function getBookScore(id) {
  let score = books[id].score
  return (score);
}

function getMaxLibrary(libraries) {
  let remainingDays = scanningDays;
  let maxLibrary = 0;
  for (let i = 0; i < libraries.length; i++) {
    remainingDays -= libraries[i].signUpTime;
    if (remainingDays <= 0) {
      maxLibrary = i;
      break;
    }
    else
      maxLibrary = i + 1;

  }
  return (maxLibrary);
}

let sortedLibrairies = sortLibraries(libraries);
let maxLibrary = getMaxLibrary(sortedLibrairies);

let scannedBooks = [];

function writeLibraries(sortedLibrairies, maxLibrary) {
  var stream = fs.createWriteStream("result.txt");



  stream.once('open', function (fd) {
    stream.write(maxLibrary + "\n");
    for (let i = 0; i < maxLibrary; i++) {
      sortedLibrairies[i].books = sortedLibrairies[i].books.filter((book) => {
        return !scannedBooks.includes(book.id)
      }
      );
      stream.write(sortedLibrairies[i].id + " " + sortedLibrairies[i].books.length + "\n");

      sortedLibrairies[i].books.map((book, index) => {
        scannedBooks.push(book.id)
        if (index > 0)
          stream.write(" ");
        stream.write(book.id.toString());
      });
      stream.write("\n");
    }




    stream.end();
  });
}

writeLibraries(sortedLibrairies, maxLibrary)

//Write File
//fs.writeFileSync('res.json', JSON.stringify(res));