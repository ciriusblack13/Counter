const counter = document.querySelector("p.counter");
const number = document.querySelector("#number");
const operators = document.querySelectorAll(".btns button");
const goalInput = document.querySelector("#goal-input");
const setButton = document.querySelector("#set-button");
const goalButton = document.querySelector("#goal-button");
const goalContainer = document.querySelector(".goal-container");
const counterContainer = document.querySelector(".counter-container");
const winPhrase = document.querySelector("#win");
let goal = 0;
let count = 0;

counter.innerHTML = `${count} di ${goal}`;

const changeDisplay = () => {
  goalContainer.classList.toggle("hidden");
  counterContainer.classList.toggle("hidden");
  goalButton.classList.toggle("hidden");
};

const changeColor = () => {
  if (count >= goal) {
    number.style.color = "green";
    winPhrase.classList.remove("hidden");
  } else if (count < 0) {;
    number.style.color = "red";
    counter.textContent = `0 di ${goal}`;
  } else {
    number.style.color = "black";
  }
};

setButton.addEventListener("click", () => {
  const newGoal = parseInt(goalInput.value);
  if (!isNaN(newGoal)) {
    goal = newGoal;
    counter.textContent = `${count} of ${goal}`;
  }
  winPhrase.classList.add("hidden");
  number.style.color = "black";
  changeDisplay();
});

goalButton.addEventListener("click", () => {
  count = 0;
  number.textContent = count;
  changeDisplay();
});

operators.forEach((button) => {
  button.addEventListener("click", (e) => {
    const styles = e.currentTarget.classList;
    if (styles.contains("increase")) { count++; };
    if (styles.contains("decrease")) { count--;};
    if (styles.contains("reset")) { count = 0; winPhrase.classList.add("hidden");};

    number.textContent = count;
    counter.textContent = `${count} di ${goal}`;
    changeColor();
  });
});
