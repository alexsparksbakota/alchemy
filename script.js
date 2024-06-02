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
