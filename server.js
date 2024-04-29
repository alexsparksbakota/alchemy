const express = require('express');
const app = express();
const port = 3000;

// Require the upload middleware
const upload = require('./upload');

// Set up a route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // Handle the uploaded file
  res.json({ message: 'File uploaded successfully!' });
  const imagePath = req.file.path;
  console.log(`image path is ${imagePath}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Serve the index.html file

});







// Require the Google Cloud Vision library
const vision = require('@google-cloud/vision');

// Asynchronously analyze an image using Google Cloud Vision API
async function analyzeImage(image){
    try{
        // Initialize the ImageAnnotatorClient with your service account credentials
        const client = new vision.ImageAnnotatorClient({
            keyFilename: 'mineral-oxide-419922-cde5deff9645.json' // Replace with your actual JSON key file
        });
    
        // Perform label detection on the image to identify objects, locations, activities, and more
        // const [result] = await client.objectLocalization('test-photo.jpg');
        // const labels = result.localizedObjectAnnotations;
        // console.log('Labels:');
        // labels.forEach(label => console.log(label.description));
        const [result] = await client.objectLocalization(image);
        const objects = result.localizedObjectAnnotations;
        objects.forEach(object => {
            ingredientsList.push(object.name);


        
        // return {labels, safeSearch};
        })}catch(error){
        // Log any errors that occur during the API call
        console.error('Error:', error);
    }
}

// Self-invoking anonymous function to use top-level await (since Node.js does not allow await outside async functions)
(async()=>{
    // Call the analyzeImage function with the name of the image file
    const imageAn = await analyzeImage('test-photo.jpg');
    // Log the results of the analysis
    console.log(imageAn);
})()
