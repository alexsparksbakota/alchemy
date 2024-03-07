var calorieSlider = document.getElementById("calorie-slider");
var calorieCount = document.getElementById("calorie-count");
calorieCount.innerHTML = calorieSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
calorieSlider.oninput = function () {
    calorieCount.innerHTML = this.value;
}
var timeSlider = document.getElementById("timelimit");
var timeLimitCount = document.getElementById("time-limit-count");
timeLimitCount.innerHTML = timeSlider.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
timeSlider.oninput = function () {
    timeLimitCount.innerHTML = this.value;
}

const listContainer = document.getElementById('list-container');

const ingredients = [
    ["Apples", 2, "lbs"],
    ["Bananas", 3, "pcs"],
    ["Milk", 1, "gal"],
];

function createListItem(ingredient, quantity, unit) {
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');

    const ingredientElement = document.createElement('span');
    ingredientElement.classList.add('ingredient');
    ingredientElement.textContent = ingredient;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = '❌';

    listItem.appendChild(ingredientElement);
    listItem.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        listContainer.removeChild(listItem);
    });
    return listItem;
}

ingredients.forEach(ingredient => {
    const listItem = createListItem(...ingredient);
    listContainer.appendChild(listItem);
});

