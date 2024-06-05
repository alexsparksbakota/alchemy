## Name
Alchemy

## Description
Alchemy is a web application that allows its users to classify their fridge and pantry ingredients from a single scanned image to produce multiple recipes using different combinations of those ingredients.

Using two powerful APIs, Alchemy intends to empower individuals with a limited variety of ingredients to unlock innovative recipes and reduce food waste.

Our web app also accomodates for dietary preferences, dietary restrictions, and ingredient quantities to produce recipes that fit your personal needs.

## Set Up 
- Ensure the server environment has Node.js and npm installed.
- Clone the repository on the server.
- Install dependencies using npm install.
- Start the server using npm start.

## Dependencies
Node.js: JavaScript runtime environment.
Express: Web framework for Node.js.
Multer: Middleware for handling file uploads.

## Integrations
File System: For storing uploaded files locally in the public/uploads directory.

## Changing the Codebase and Contributing
1. Add New Features
- Create a new branch for the feature.
- Implement the feature.
- Open a pull request for review.

2. Fix Bugs
- Open an issue describing the bug.
- Create a branch to fix the bug.
- Implement the fix and open a pull request.
3. Code Review
- All changes should be reviewed by at least one other team member before merging.

## Usage
To use the Alchemy web application, follow these steps:

**Homepage:**

Navigate to the homepage's single upload button to upload an image of the ingredients that you would like to be scanned.

For your image, ingredients should ideally be spread evenly across a clean, blank surface.

Once the image is successfully uploaded you will receive a confirmation. The website also displays a preview of the image for your reference. 

Then navigate to the ‘continue’ button to move on to the next page.

**Modify Ingredients:**

This page will allow you to view and edit the scanned ingredient list, which is to create your generated recipes.

Click on the '✏️' button of any ingredient to modify ingredient's quantity or unit of measurement. The classification model is not yet able to identify these properties.

Click on the '❌' button of any ingredient to delete that ingredient.

**Specify Dietary Preferences:**

Click the checkboxes of any of the dietary preferences to indicate this selection for use in recipe generation.

Scroll down to access the calorie and time limit sliders, which can be used as additional parameters for your recipe.

Scroll down to the 'Other Preferences' section, an open ended textbox that allows for additional preferences.

An example of this request may look like: 'I don't have access to a frying pan'

After all forms are filled, navigate to the 'Submit' button to continue to the next page.

**Explore Recipes:**

Here, all of the recipes are displayed with their titles shown above. 

The recipes list all of the ingredients along with the measurement required to create the recipe, the cooking time required, and the cooking instructions.

## Support
For any questions or issues, please contact the project maintainers at ajs656@drexel.edu or bc973@drexel.edu

## Authors and acknowledgment
Alchemy's authors are listed below:
- Bhavika Choudhary: Full Stack Developer
- Alex Sparks-Bakota: Back End Developer
- Kabir Bhakta: Front End Developer

## License
This project was created as a university course assignment by undergraduate students. It does not have a formal open source license.

## Project status
This project is currently under active development and is not open for contribution.
