//Dependencies
const jolicitron = require("jolicitron");
const fs = require('fs');

//Read File
const data = fs.readFileSync("./examples/f_libraries_of_the_world.txt", "utf8")
//Parse Config here
const parser = jolicitron((save, n) => [
  save(),
  save(),
  "scanningDays",
  n("books", "score"),
  n("libraries", save(), "signUpTime", "scannedBooksPerDay", n("books", "id"))
]);

//Write File
const res = parser(data);
fs.writeFileSync('ouput.json', JSON.stringify(res));