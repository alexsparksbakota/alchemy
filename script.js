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

// Function to get form data
//AUTHORED BY ALEX SPARKS-BAKOTA: 5/10/2024
function getFormData() {
   const mealType = [];
   const dietaryRestrictions = [];
   const cookingTime = document.getElementById('timelimit').value;
   const otherPreferences = document.getElementById('other_preferences').value;
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
   for (const checkbox of checkboxes) {
     if (checkbox.checked) {
       if (checkbox.id.startsWith('meal')) {
         mealType.push(checkbox.id.slice(4)); // Extract meal type from checkbox id
       } else {
         dietaryRestrictions.push(checkbox.id);
       }
     }
   }
    return { mealType: mealType.join(', '), dietaryRestrictions: dietaryRestrictions.join(', '), cookingTime, otherPreferences };
 }

<<<<<<< HEAD
  // AUTHORED BY BHAVIKA CHOUDHARY
  // LAST UPDATED ON: MAY 9, 2024
  async function sendChatGPTRequest(ingredientsList, formData) {
    const apiKey = 'sk-nOehe2e8wB3jbskdyjdbjGjadHIDkhI'; // Replace with your actual OpenAI API key
    const url = 'https://api.openai.com/v1/completions';
  
    // Format ingredients list for the prompt
    const formattedIngredients = ingredientsList.join(', ');
  
    const prompt = `Generate a list of recipes that can be made using the following ingredients:
  
    ${formattedIngredients}
  
    Additional Considerations:
  
    Meal Type: Please consider recipes suitable for ${formData.mealType}
    Cooking Time: The recipes should ideally have a cooking time of around ${formData.cookingTime} minutes.
    Dietary Restrictions: Please take into account the following dietary restrictions: ${formData.dietaryRestrictions}
  
    Output Format:
  
    For each recipe, please provide the following information:
  
    * Recipe Title: A clear and concise title for the recipe.
    * Ingredients: List of ingredients with quantities and units, matching the provided list as closely as possible.
    * Instructions: Step-by-step instructions for preparing the recipe.
    * Cooking Time: Estimated cooking time in minutes.
  
    Make sure that no ingredient, other than the ones in ingredientsList, are used in the recipe.
    `;

  

    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error sending request to OpenAI: ${response.statusText}`);
      }
      const data = await response.json();
      const recipes = data.choices[0].text.split('\n\n'); // Split response by recipe separators
      return recipes;
    } catch (error) {
      console.error('Error sending request to OpenAI:', error);
      return []; // Return empty array on error
    }
  }
  
<<<<<<< HEAD


async function displayRecipes(recipes) {
  
    // Create a container element for the recipes
    const recipeContainer = document.createElement('div');
    recipeContainer.id = 'recipe-container';
  
    // Loop through each recipe
    for (const recipe of recipes) {
      // Parse the recipe data (assuming specific format)
      const recipeData = parseRecipeData(recipe); // Replace with your parsing logic
  
      // Create a recipe card element
      const recipeCard = createRecipeCard(recipeData);
  
      // Add the recipe card to the container
      recipeContainer.appendChild(recipeCard);
    }
  
    // Append the recipe container to the body (or new window)
    document.body.appendChild(recipeContainer);
  }
=======
function parseRecipeData(recipe) {
  const lines = recipe.split('\n');
  const recipeTitle = lines.shift(); // Assuming first line is the title
  const ingredients = [];
  const instructions = [];

  // Loop through remaining lines, separate ingredients and instructions
  for (const line of lines) {
    if (line.startsWith('- ')) {
      instructions.push(line.slice(2)); // Remove leading hyphen
    } else {
      ingredients.push(line);
    }
  }

  return { title: recipeTitle, ingredients, instructions };
}
>>>>>>> 9cace6ac97e84723014f19ae3ca2af1aebfacd08
>>>>>>> 27c57538a75aec14ce32400d3f7812bbd5870938
function createRecipeCard(recipeData) {
  const card = document.createElement('div');
  card.classList.add('recipe-card');

<<<<<<< HEAD
  // Title section
=======
>>>>>>> 27c57538a75aec14ce32400d3f7812bbd5870938
  const titleElement = document.createElement('h3');
  titleElement.textContent = recipeData.title;
  card.appendChild(titleElement);

<<<<<<< HEAD
  // Ingredients section
=======
>>>>>>> 27c57538a75aec14ce32400d3f7812bbd5870938
  const ingredientsList = document.createElement('ul');
  ingredientsList.classList.add('ingredients-list');
  for (const ingredient of recipeData.ingredients) {
    const ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient;
    ingredientsList.appendChild(ingredientItem);
  }
  card.appendChild(ingredientsList);

<<<<<<< HEAD
  const instructionsSection = document.createElement('section');
  instructionsSection.classList.add('instructions-section');
  const instructionsTitle = document.createElement('h4');
  instructionsTitle.textContent = 'Instructions';
  instructionsSection.appendChild(instructionsTitle);
=======
>>>>>>> 27c57538a75aec14ce32400d3f7812bbd5870938
  const instructionsList = document.createElement('ol');
  instructionsList.classList.add('instructions-list');
  for (const instruction of recipeData.instructions) {
    const instructionItem = document.createElement('li');
<<<<<<< HEAD
    // Emphasize step numbers (optional)
    instructionItem.textContent = `Step ${instructions.indexOf(instruction) + 1}: ${instruction}`;
    instructionsList.appendChild(instructionItem);
  }
  instructionsSection.appendChild(instructionsList);
  card.appendChild(instructionsSection);

  return card;
}
=======
    instructionItem.textContent = instruction;
    instructionsList.appendChild(instructionItem);
  }
  card.appendChild(instructionsList);

  return card;
}

// Call the function after receiving recipes from OpenAI
const recipes = await sendChatGPTRequest(ingredientsList, formData);
displayRecipes(recipes);
>>>>>>> 27c57538a75aec14ce32400d3f7812bbd5870938
