// Libraries
const path = require('path');
const express = require('express');
const multer = require('multer');
const { check, validationResult } = require('express-validator');

// Setup defaults for script
const app = express();
const storage = multer.diskStorage({
    // Logic where to upload file
    destination: function (request, file, callback) {
        callback(null, 'uploads/')
    },
    // Logic to name the file when uploaded
    filename: function (request, file, callback) {
        callback(null, path.parse(file.originalname).name + '-' + Date.now() + path.parse(file.originalname).ext)
    }
})
const upload = multer({
    storage: storage,
    // Validation for file upload
    fileFilter: (request, file, callback) => {
        const allowedFileMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
        callback(null, allowedFileMimeTypes.includes(file.mimetype));
    }
});
const port = 80 // Default port for http server

// The * in app.* needs to match the method type of the request
app.post(
    '/',
    upload.fields([{ name: 'file', maxCount: 1 }]),
    [
        check('trailName', 'Please enter the trail name.').isLength({ min: 1 }),
        check('location', 'Please enter the location of the hike.').isLength({ min: 1 }),
        check('date', 'Please enter the date of the hike.').isLength({ min: 1 }),
        check('distance', 'Enter the distance of the hike.').isLength({ min: 1 }),
        check('duration','Please enter the hours of the hike').isNumeric({min: 1}),
        check('difficulty','Please select a difficulty.').isIn(['Easy', 'Moderate', 'Strenuous']),
        check('route','Please select trail route').isIn(['Out','Loop','Point']),

      
    ],
    (request, response) => {
        // Validate request; If there are any errors, send 400 response back
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response
                .status(400)
                .setHeader('Access-Control-Allow-Origin', '*') // Prevent CORS error
                .json({
                    message: 'Request fields or files are invalid.',
                    errors: errors.array(),
                });
        }
        response
            .setHeader('Access-Control-Allow-Origin', '*') // Prevent CORS error
            .json({ message: 'Request fields and files are valid.' });
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
