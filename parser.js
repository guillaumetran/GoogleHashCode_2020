//Dependencies
const jolicitron = require("jolicitron");
const fs = require('fs');

//Read File
const rawData = fs.readFile("data-center")
const data = JSON.parse(rawData);

//Parse Config here
const parser = jolicitron((save, n) => [

]);

//Write File
const res = parser(data);
fs.writeFileSync('ouput.json', JSON.stringify(res));