// Function to select an element by its selector
const select = (selector) => document.querySelector(selector);

// DOM elements
const counter = select("p.counter");
const goalInput = select("#goal-input");
const setButton = select("#set-button");
const goalButton = select("#goal-button");
const goalContainer = select("#goal-container");
const counterContainer = select("#counter-container");
const winPhrase = select("#win");
const buttonWrapper = select("#btns");
const tailwindClasses =
  "flex flex-col items-center p-3 bg-gray-100 hover:bg-gray-200 font-bold text-purple-500 w-full rounded m-2";

const createDOMElement = (tag, className, innerHTML) => {
  const element = document.createElement(tag);
  element.classList.add(...className.split(" "));
  element.innerHTML = innerHTML;
  console.log(className);
  return element;
};

// Create number display
const number = createDOMElement(
  "h1",
  "text-9xl font-bold text-gray-700 mt-2",
  "0"
);

// Add number as 2nd child
counterContainer.insertBefore(number, counterContainer.childNodes[2]);

// State variables
let goal = 0;
let count = 0;

// Initialize the counter display
counter.textContent = `${count} of ${goal}`;

// Function to toggle display between goal and counter
const changeDisplay = () => {
  goalContainer.classList.toggle("hidden");
  counterContainer.classList.toggle("hidden");
  goalButton.classList.toggle("hidden");
};

// Function to change the color of the number and show/hide win phrase
const changeColor = () => {
  if (count >= goal) {
    number.style.color = "green";
    winPhrase.classList.remove("hidden");
  } else if (count < 0) {
    number.style.color = "red";
    counter.textContent = `0 of ${goal}`;
  } else {
    number.style.color = "black";
  }
};

const updateCounter = () => {
  number.textContent = count;
  counter.textContent = `${count} di ${goal}`;
  changeColor();
};

// Object mapping button classes to actions
const buttonActions = {
  increase: () => {
    count += 1;
    updateCounter();
  },
  decrease: () => {
    count -= 1;
    updateCounter();
  },
  reset: () => {
    count = 0;
    winPhrase.classList.add("hidden");
    updateCounter();
  },
};

// Array of objects to define the buttons
const buttonsData = [
  {
    className: "decrease",
    innerHTML: "-",
    onClick: buttonActions.decrease,
    tailwind: tailwindClasses,
  },
  {
    className: "reset",
    innerHTML: "Reset",
    onClick: buttonActions.reset,
    tailwind: tailwindClasses,
  },
  {
    className: "increase",
    innerHTML: "+",
    onClick: buttonActions.increase,
    tailwind: tailwindClasses,
  },
];

// Function to create a button with specific classes and onClick action
const createButton = (tag, className, innerHTML, onClick, tailwind) => {
  const element = document.createElement(tag);

  if (tailwind && typeof tailwind === "string") {
    element.classList.add(className, ...tailwind.split(" "));
  } else {
    element.classList.add(className);
  }

  element.innerHTML = innerHTML;
  element.addEventListener("click", onClick);
  return element;
};

buttonsData.forEach(({ className, innerHTML, onClick, tailwind }) => {
  const button = createButton("button", className, innerHTML, onClick);
  button.classList.add(...tailwind.split(" "));
  buttonWrapper.appendChild(button);
});

// Event listener for operator buttons
buttonWrapper.addEventListener("click", (event) => {
  const clickedButton = event.target;

  if (clickedButton.tagName === "button") {
    const action = clickedButton.classList[0];
    if (buttonActions[action]) {
      buttonActions[action]();
    }
  }

  number.textContent = count;
  counter.textContent = `${count} di ${goal}`;
  changeColor();
});

// Event listener for "Set Goal" button click
setButton.addEventListener("click", () => {
  const newGoal = parseInt(goalInput.value);
  if (!isNaN(newGoal)) {
    goal = newGoal;
    counter.textContent = `${count} of ${goal}`;
  }
  winPhrase.classList.add("hidden");
  changeDisplay();
});

// Event listener for "Goal" button click
goalButton.addEventListener("click", () => {
  count = 0;
  number.textContent = count;
  changeDisplay();
});
