/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
import { writeFile } from 'node:fs';

// 1. Use the inquirer npm package to get user input.
inquirer
    .prompt([
        /* Pass your questions in here */
        {
            type: "input",
            name: "url",
            message: 'Please enter the URL: ',
        },
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        console.log(`The URL entered by you is : ${answers.url}`);
        
        // 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
        var qr_png = qr.image(answers.url, { type: 'png' });
        qr_png.pipe(fs.createWriteStream('url.png'));
        console.log("Your QR code has been generated and saved as an PNG file.");
        
        // 3. Create a txt file to save the user input using the native fs node module.
        writeFile('userInput.txt', answers.url , 'utf8', err =>{
            if (err) throw err;
            console.log("The user input has been saved in the file userInput.txt"); 
        });

    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error("Prompt couldn't be rendered in the current environment");
        } else {
            // Something else went wrong
            console.error("An error occurred: ", error);
        }
    });