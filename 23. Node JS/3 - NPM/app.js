import superheroes from "superheroes";

const superheroesList = [];

superheroes.forEach((value) => {
	superheroesList.push(value);
});

const randomNumber = Math.floor(Math.random() * superheroesList.length) + 1;

const generateSuperHeroes = superheroesList[randomNumber];

console.log(`I am ${generateSuperHeroes}!`);
