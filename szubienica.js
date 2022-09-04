const words = [
  "javascript",
  "monkey",
  "amazing",
  "pancake",
  "monitor",
  "program",
  "application",
  "keyboard",
  "gaming",
  "network",
];
const yesSound = new Audio("yes.wav");
const noSound = new Audio("no.wav");
const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
let counter = 0;
const getAllIndexes = (arr, val) => {
  let indexes = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      indexes.push(i);
    }
  }
  return indexes;
};

const loadImage = (id) => {
  const images = document.querySelector(".images img");
  const imageSource = images.src.split("/");
  imageSource[imageSource.length - 1] = `s${id}.jpg`;
  images.src = imageSource.join("/");
};

const createGame = () => {
  counter = 0;
  const randomWord =
    words[Math.floor(Math.random() * words.length)].toUpperCase();
  let password = randomWord
    .split("")
    .map((letter) => (letter != " " ? "_" : ""))
    .join("");
  const lettersDOM = document.getElementById("letters");
  lettersDOM.innerHTML = "";
  lettersDOM.style.display = "grid";
  alphabet.forEach((letter) => {
    const letterElement = document.createElement("div");
    letterElement.innerHTML = letter;
    letterElement.classList.add("letter");

    letterElement.addEventListener("click", () => {
      let elem = randomWord.split("");
      if (elem.includes(letter)) {
        yesSound.play();
        letterElement.classList.add("green", "disabled");
        let indexes = getAllIndexes(randomWord, letter);
        let newPassword = password.split("");
        indexes.forEach((index) => {
          newPassword[index] = letter;
        });

        password = newPassword.join("");
        document.querySelector(".password").innerHTML = password;
        if (password === randomWord) {
          // TODO: WIN
          lettersDOM.innerHTML = `<div class='lose'>Gratulacje, wygrałeś!<br/> Czy chcesz zagrać jeszcze raz? <br/>
          <button class='play-again'>Tak</button>
          </div>`;
          lettersDOM.style.display = "flex";
          lettersDOM.style.justifyContent = "center";
          lettersDOM.style.alignItems = "center";
          lettersDOM.style.textAlign = "center";
          lettersDOM
            .querySelector(".lose > .play-again")
            .addEventListener("click", () => {
              createGame();
              loadImage(0);
            });
        }
      } else {
        counter += 1;
        noSound.play();
        loadImage(counter);
        letterElement.classList.add("red", "disabled");
        if (counter >= 9) {
          // TODO: LOSE
          lettersDOM.innerHTML = `<div class='lose'>Przegrałeś!<br/> Czy chcesz zagrać jeszcze raz? <br/>
          <button class='play-again'>Tak</button>
          </div>`;
          lettersDOM.style.display = "flex";
          lettersDOM.style.justifyContent = "center";
          lettersDOM.style.alignItems = "center";
          lettersDOM.style.textAlign = "center";
          lettersDOM
            .querySelector(".lose > .play-again")
            .addEventListener("click", () => {
              createGame();
              loadImage(0);
            });
        }
      }
    });

    lettersDOM.appendChild(letterElement);
  });
  document.querySelector(".password").innerHTML = password;
};

createGame();
