var calorieSlider = document.getElementById("calorie_slider");
var calorieCount = document.getElementById("calorie_count");
calorieCount.innerHTML = calorieSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
calorieSlider.oninput = function () {
    calorieCount.innerHTML = this.value;
}
var timeSlider = document.getElementById("timelimit");
var timeLimitCount = document.getElementById("time_limit_count");
timeLimitCount.innerHTML = timeSlider.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
timeSlider.oninput = function () {
    timeLimitCount.innerHTML = this.value;
}

//AUTHORED BY Alex Sparks-Bakota 4/28/2024 ('Create variables for dietary preference inputs')
const breakfastCheckbox = document.getElementById('breakfast');
const lunchCheckbox = document.getElementById('lunch');
const dinnerCheckbox = document.getElementById('dinner');
const vegetarianCheckbox = document.getElementById('vegetarian');
const veganCheckbox = document.getElementById('vegan');
const ketoCheckbox = document.getElementById('keto');
const eggetarianCheckbox = document.getElementById('eggetarian');
const pescatarianCheckbox = document.getElementById('pescatarian');
const paleoCheckbox = document.getElementById('paleo');
const peanutsCheckbox = document.getElementById('peanuts');
const milkCheckbox = document.getElementById('milk');
const glutenCheckbox = document.getElementById('gluten');
const fishCheckbox = document.getElementById('fish');
const treenutsCheckbox = document.getElementById('treenuts');
const soyCheckbox = document.getElementById('soy');
const calorieSlider = document.getElementById('calorie_slider');
const timeLimitSlider = document.getElementById('timelimit');
const otherPreferencesInput = document.getElementById('other_preferences');

const isBreakfastSelected = breakfastCheckbox.checked;
const isLunchSelected = lunchCheckbox.checked;
const isDinnerSelected = dinnerCheckbox.checked;
const isVegetarianSelected = vegetarianCheckbox.checked;
const isVeganSelected = veganCheckbox.checked;
const isKetoSelected = ketoCheckbox.checked;
const isEggetarianSelected = eggetarianCheckbox.checked;
const isPescatarianSelected = pescatarianCheckbox.checked;
const isPaleoSelected = paleoCheckbox.checked;
const isPeanutsSelected = peanutsCheckbox.checked;
const isMilkSelected = milkCheckbox.checked;
const isGlutenSelected = glutenCheckbox.checked;
const isFishSelected = fishCheckbox.checked;
const isTreenutsSelected = treenutsCheckbox.checked;
const isSoySelected = soyCheckbox.checked;
const otherPreferences = otherPreferencesInput.value;


const listContainer = document.getElementById('list_container');

const ingredients = [
    ["Avocado", 2, "pcs"],
    ["Garlic powder", 2, "gm"],
    ["Salt", 2, "gm"],
    ["Pepper", 2, "gm"],
    ["Lemon juice", 10, "ml"],
    ["Mustard", 200, "ml"],
    ["Bread Slice", 4, "pcs"],
    ["Cheese", 100, "gm"],
    ["Tomato", 3, "pcs"],
    ["Cucumber", 1, "pcs"],
    ["Red Onion", 2, "pcs"],
    ["Arugula", 3, "pcs"],
    ["Sprouts", 1, "cup"],
    ["Tomato", 2, "pcs"], // Duplicate ingredient
];

function createListItem(ingredient, quantity, unit) {
    const listItem = document.createElement('div');
    listItem.classList.add('list_item');

    const ingredientElement = document.createElement('span');
    ingredientElement.classList.add('ingredient');
    ingredientElement.textContent = ingredient;

    const quantityElement = document.createElement('span');
    quantityElement.classList.add('quantity');
    quantityElement.textContent = quantity;

    const unitElement = document.createElement('span');
    unitElement.classList.add('unit');
    unitElement.textContent = unit;

    const editButton = document.createElement('button');
    editButton.classList.add('edit_btn');
    editButton.textContent = '✏️';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete_btn');
    deleteButton.textContent = '❌';

    listItem.appendChild(ingredientElement);
    listItem.appendChild(quantityElement);
    listItem.appendChild(unitElement);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        listContainer.removeChild(listItem);
    });

    editButton.addEventListener('click', () => {
        const newQuantity = prompt("Enter new quantity:");
        const newUnit = prompt("Enter new unit (e.g., lbs, pcs, gal):");
        if (newQuantity) {
            quantityElement.textContent = newQuantity;
        }
        if (newUnit) {
            unitElement.textContent = newUnit;
        }
    });

    return listItem;
}

function removeRedundantIngredients(ingredientsList) {
  const seenIngredients = {};
  const filteredList = [];
  for (const ingredient of ingredientsList) {
    const [name, , ] = ingredient; // Destructure to get the ingredient name
    if (!seenIngredients[name]) {
      seenIngredients[name] = true;
      filteredList.push(ingredient);
    }
  }
  return filteredList;
}

// Apply the function before creating list items
const filteredIngredients = removeRedundantIngredients(ingredients);

// AUTHORED BY BHAVIKA CHOUDHARY 04/28/2024
// FUNCTION TO REMOVE COMMONLY MISIDENTIFIED LABELS FROM INGREDIENTS LIST
const inaccurateLabels = [
    "table",
    "bowl",
    "spoon",
    "package",
    "box",
    "basket",
    "chopsticks",
    "knife",
    "fork",
    "utensil",
    "plate",
    "dish",
    "food",
    "bottle",
    "tableware",
];

function removeInaccurateIngredients(ingredientList, inaccurateLabels) {
    return ingredientList.filter(ingredient => !inaccurateLabels.includes(ingredient[0].toLowerCase()));
  }

ingredients.forEach(ingredient => {
    const listItem = createListItem(...ingredient);
    listContainer.appendChild(listItem);
});
