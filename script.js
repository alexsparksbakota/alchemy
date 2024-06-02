document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('list_container');
  
    // Function to fetch ingredient list from server
    async function fetchIngredients() {
      try {
        const response = await fetch('/api/ingredients');
        if (!response.ok) {
          throw new Error(`Error fetching ingredients: ${response.statusText}`);
        }
        const ingredientList = await response.json();
        return ingredientList;
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    }
  
    // Function to create a list item element
    function createListItem(ingredient, quantity, unit, editButton, deleteButton) {
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
  
      listItem.appendChild(ingredientElement);
      listItem.appendChild(quantityElement);
      listItem.appendChild(unitElement);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
  
      // Attach elements to buttons for proper functionality
      editButton.setElements(quantityElement, unitElement);
      deleteButton.setElement(listItem);
  
      return listItem;
    }
  
    // Function to create the edit button
    function createEditButton() {
      const editButton = document.createElement('button');
      editButton.classList.add('edit_btn');
      editButton.textContent = '✏️';
  
      // Add functionality for edit button
      editButton.setElements = (quantityElement, unitElement) => {
        editButton.addEventListener('click', () => {
          const newQuantity = prompt("Enter new quantity:", quantityElement.textContent);
          const newUnit = prompt("Enter new unit (e.g., lbs, pcs, gal):", unitElement.textContent);
          if (newQuantity) {
            quantityElement.textContent = newQuantity;
          }
          if (newUnit) {
            unitElement.textContent = newUnit;
          }
        });
      };
  
      return editButton;
    }
  
    // Function to create the delete button
    function createDeleteButton() {
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete_btn');
      deleteButton.textContent = '❌';
  
      // Add functionality for delete button
      deleteButton.setElement = (listItem) => {
        deleteButton.addEventListener('click', () => {
          listContainer.removeChild(listItem);
          console.log('Delete button clicked for ingredient:', listItem.querySelector('.ingredient').textContent);
        });
      };
  
      return deleteButton;
    }

    // Fetch ingredients and populate the list
    fetchIngredients()
      .then(ingredients => {
        // Filter out unwanted ingredients 
        const filteredIngredients = ingredients.filter(ingredientData => {
          return ![
            "Drink", "Fruit", "Cuisine", "Curring board", 'Food', 'Tableware', 'Dishware',
            'Ingredient', 'Natural foods', 'Recipe', 'Cutting board', 'Dish', 'Food group', 'Vegetable', 'Whole food',
            'Superfood', 'Produce', 'Plant', 'Local food', 'Serveware', 'Bowl', 'Knife', 'Finger food', 'Comfort food',
            'Vegan nutrition', 'Plate', 'Kitchen utensil',
            'Wood', 'Platter', 'Table', 'Meal', 'Fashion accessory',
            'Still life photography', 'Lunch', 'Nightshade family', 'Delicacy', 'Spoon',
            'Still life', 'Root vegetable', 'Supper', 'Japanese cuisine', 'Side dish', 'Brunch', 'Breakfast', 'Vegetarian food', 'appetizer'
          ].includes(ingredientData.name || ingredientData);
        });
  
        filteredIngredients.forEach(ingredientData => {
          const processedIngredient = [
            ingredientData.name || ingredientData, // Handle potential absence of a "name" property
            1, // Default quantity
            "unit", // Default unit
            createEditButton(),
            createDeleteButton()
          ];
          const listItem = createListItem(...processedIngredient);
          listContainer.appendChild(listItem);
        });
      });
    // Function to send prompt to server and handle response
    async function generateRecipes(prompt) {
      try {
        const response = await fetch('/generate-recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        });
    
        if (!response.ok) {
          throw new Error(`Error generating recipes: ${response.statusText}`);
        } else {
          console.log(response)
        }
    
        const recipeData = await response.json();
        // Handle the response data here
        console.log('Generated recipes:', recipeData);
    
        // Redirect user to recipes.html and pass the generated recipes as URL parameters
        const queryParams = new URLSearchParams();
        queryParams.append('recipes', JSON.stringify(recipeData.recipes));
        window.location.href = `recipes.html?${queryParams.toString()}`;
      } catch (error) {
        console.error('Error generating recipes:', error);
      }
    }
    

  
    // Handle form submission
    const preferencesForm = document.getElementById('preferences_form');
    preferencesForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const preferences = {
        mealType: {
        breakfast: document.getElementById('breakfast').checked,
        lunch: document.getElementById('lunch').checked,
        dinner: document.getElementById('dinner').checked
        },
        dietaryRestrictions: {
        vegetarian: document.getElementById('vegetarian').checked,
        vegan: document.getElementById('vegan').checked,
        keto: document.getElementById('keto').checked,
        eggetarian: document.getElementById('eggetarian').checked,
        pescatarian: document.getElementById('pescatarian').checked,
        paleo: document.getElementById('paleo').checked
        },
        allergies: {
        peanuts: document.getElementById('peanuts').checked,
        milk: document.getElementById('milk').checked,
        gluten: document.getElementById('gluten').checked,
        fish: document.getElementById('fish').checked,
        treenuts: document.getElementById('treenuts').checked,
        soy: document.getElementById('soy').checked
        },
        calories: document.getElementById('calorie_slider').value,
        timeLimit: document.getElementById('timelimit').value,
        otherPreferences: document.getElementById('other_preferences').value
    };


    // Extract Relevant Variables
    const ingredientElements = listContainer.querySelectorAll('.ingredient');
    const quantityElements = listContainer.querySelectorAll('.quantity');
    const unitElements = listContainer.querySelectorAll('.unit');

    const ingredientsList = [];
    ingredientElements.forEach((ingredientElement, index) => {
        const ingredient = ingredientElement.textContent;
        const quantity = quantityElements[index].textContent;
        const unit = unitElements[index].textContent;
        ingredientsList.push(`${quantity} ${unit} ${ingredient}`);
    });

    // Convert mealType object to a string
    const selectedMealTypes = Object.entries(preferences.mealType)
        .filter(([_, isSelected]) => isSelected)
        .map(([mealType]) => mealType)
        .join(', ');

    // Format dietaryRestrictions as key-value pairs
    const dietaryRestrictions = Object.entries(preferences.dietaryRestrictions)
        .filter(([_, isSelected]) => isSelected)
        .map(([restriction, _]) => restriction)
        .join(', ');

    const timeLimit = preferences.timeLimit;
    const otherPreferences = preferences.otherPreferences;

    console.log('Ingredients List:', ingredientsList);
    console.log('Selected Meal Types:', selectedMealTypes);
    console.log('Time Limit:', timeLimit);
    console.log('Dietary Restrictions:', dietaryRestrictions);
    console.log('Other Preferences:', otherPreferences);

    // Construct the Prompt String 
    const prompt = `Generate a list of recipes that can be made using the following ingredients:\n\n${ingredientsList.join('\n')}\n\nAdditional Considerations:\n\nMeal Type: Please consider recipes suitable for ${selectedMealTypes}\nCooking Time: The recipes should ideally have a cooking time of around ${timeLimit} minutes\nDietary Restrictions: Please take into account the following dietary restrictions: ${dietaryRestrictions}\nAdditional Directions: ${otherPreferences}\n\nOutput Format:\n\nFor each recipe, please provide the following information:\n\nRecipe Title: A clear and concise title for the recipe.\nIngredients: List of ingredients with quantities and units, matching the provided list as closely as possible.\nInstructions: Step-by-step instructions for preparing the recipe.\nCooking Time: Estimated cooking time in minutes.\n\nMake sure that no ingredient, other than the ones in ingredientsList are used in the recipe.`;

    console.log('Prompt:', prompt);
    // Call the function to send the prompt to the server
    await generateRecipes(prompt);
    });
  });  

// Update calorie count in real time
const calorieSlider = document.getElementById('calorie_slider');
const calorieCount = document.getElementById('calorie_count');
calorieCount.textContent = calorieSlider.value;
calorieSlider.addEventListener('input', () => {
    calorieCount.textContent = calorieSlider.value;
});

// Update time limit count in real time
const timeLimitSlider = document.getElementById('timelimit');
const timeLimitCount = document.getElementById('time_limit_count');
timeLimitCount.textContent = timeLimitSlider.value;
timeLimitSlider.addEventListener('input', () => {
    timeLimitCount.textContent = timeLimitSlider.value;
});













document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipesParam = urlParams.get('recipes');
    let recipes;

    try {
        recipes = JSON.parse(decodeURIComponent(recipesParam));
    } catch (error) {
        console.error('Failed to parse recipes:', error);
        return;
    }

    const recipesContainer = document.getElementById('recipes-container');

    recipes.forEach((recipeText, index) => {

        // Parse individual recipe
        const recipeParts = recipeText.split('\n');
        const recipeTitle = recipeParts[1].split(': ')[1];
        const ingredientsIndex = recipeParts.findIndex(part => part.startsWith('Ingredients:'));
        const instructionsIndex = recipeParts.findIndex(part => part.startsWith('Instructions:'));
        
        const ingredients = recipeParts.slice(ingredientsIndex + 1, instructionsIndex).map(ingredient => ingredient.replace('- ', ''));
        const instructions = recipeParts.slice(instructionsIndex + 1);
        
        // Construct recipe object
        const recipe = {
            title: recipeTitle,
            ingredients: ingredients,
            instructions: instructions,
            cookingTime: recipeParts[recipeParts.length - 1].split(': ')[1]
        };

        console.log('Recipe:', recipe); // Log the recipe object to verify its structure

        // Ensure the recipe has ingredients property
        if (!recipe.ingredients) {
            console.error('Recipe is missing ingredients:', recipe);
            return;
        }

        // Create recipe element
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        
        const titleElement = document.createElement('h2');
        titleElement.textContent = recipe.title;
        
        const ingredientsElement = document.createElement('ul');
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsElement.appendChild(li);
        });

        const instructionsElement = document.createElement('ol');
        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            instructionsElement.appendChild(li);
        });

        const cookingTimeElement = document.createElement('p');
        cookingTimeElement.textContent = `Cooking Time: ${recipe.cookingTime}`;
        
        recipeElement.appendChild(titleElement);
        recipeElement.appendChild(ingredientsElement);
        recipeElement.appendChild(instructionsElement);
        recipeElement.appendChild(cookingTimeElement);
        recipesContainer.appendChild(recipeElement);
    });
});

