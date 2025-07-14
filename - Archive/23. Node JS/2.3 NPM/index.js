import superheroes, { randomSuperhero } from "superheroes";

import supervillains, { randomSupervillain } from "supervillains";

function battleOfCentury() {
  let superheroesName = randomSuperhero();
  let supervillainsName = randomSupervillain();

  console.log(
    supervillainsName.toUpperCase() +
      " emerges from the darkness, intent on wreaking havoc and destroying the city... But just as all hope seems lost, " +
      superheroesName.toUpperCase() +
      " arrives, a beacon of justice, ready to defend the city at all costs!"
  );

  let superheroesPower = Math.floor(Math.random() * 1000) + 1;
  let supervillainsPower = Math.floor(Math.random() * 1000) + 1;

  setTimeout(function () {
    console.log(
      "Battle of Century: " + superheroesName + "(" + superheroesPower + ") " + "VS " + supervillainsName + "(" + supervillainsPower + ")."
    );
  }, 1000);

  setTimeout(function () {
    console.log("... They are fighting!");
  }, 3000);

  setTimeout(function () {
    if (superheroesPower > supervillainsPower) {
      console.log(superheroesName + " defeats " + supervillainsName + "! The city is saved!");
    } else if (superheroesPower < supervillainsPower) {
      console.log(superheroesName + " is defeated by " + supervillainsName + "! The city is doomed!");
    } else {
      console.log("Their powers seemed perfectly matched, and the battle raged on endlessly, neither side willing to yield....");
    }
  }, 5000);
}

battleOfCentury();
