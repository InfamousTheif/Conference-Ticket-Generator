# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

| Form page | Form page(Img) |
| --------- | -------------- |
| ![Form page](/assets/screenshots/form%20page.png) | ![Form page](/assets/screenshots/fom%20page-image.png) |

| Ticket page |
| ----------- |
| ![Form page](/assets/screenshots/ticket%20page.png) |

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Live site]([https://your-live-site-url.com](https://infamoustheif.github.io/Conference-Ticket-Generator/))

## My process
I roughly finished the HTML and CSS of both pages, before starting with the JS part of this project. After I was done with the JS on each page, I polished the CSS a bit and made my JS code more readable by adding comments and the likes.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Vanilla JS


### What I learned

## HTML
```html
<!-- I learnt about the file input and its attributes -->
<input type="file" accept=".png, .jpeg">

<!-- I learnt how to use a label in the place of its input tag -->
<input type="file" name="change-button" id="change-button" accept=".png, .jpg, .jpeg">
<label for="change-button">Change image</label>
```
## CSS
```css
/* Hiding the input button and styling the label */
#change-button {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
} 

.output-imgArea, .complete-buttons-wrapper > button, #change-button + label {
  color: white;       
  background-color: hsla(252, 6%, 83%, 0.24);
  padding: 0.4rem 0.4rem;
  border: solid 1px var(--grey2);
  border-radius: 10px;
}

.complete-buttons-wrapper {
  display: none;
}

.complete-buttons-wrapper > button:hover, #change-button:hover + label {
  color: var(--grey1);
  text-decoration: underline;
}
```
## JS
```js
// I learnt how to use the FileReader interface.
function imgHandler(file){
  if(file.length === 0){
    alert("No files selected.");
    return;
  };

  if (!file.type.startsWith("image/")) {
    alert("Only image files are allowed.");
    return;
  };

  if (!file.name.endsWith(".png") && !file.name.endsWith(".jpg") ) {
    alert("Only JPG or PNG image files are allowed.");
    return;
  };

  if(file.size > 500 * 1024){
    imgErrorMsg.style.display = 'flex';
    imgReqMsg.style.display = 'none';
    clearTimeout(imgTimeOut)
    imgTimeOut = setTimeout(() => {
      imgErrorMsg.style.display = 'none';
      imgReqMsg.style.display = 'flex';
    }, 5000);
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    imgOutput.src = e.target.result;
  };

  reader.onerror = (err) => {
    console.error(`Error reading file: ${err}`)
    alert("An error occured while reading the file.")
  };

  reader.readAsDataURL(file);
  stepsText.style.display = 'none'
  buttonsWrapper.classList.add('show')
  fileInput.style.pointerEvents = 'none';
}
```

### Continued development

- Improve my CSS skills
- A better understanding of JS

### Useful resources

- [MDN FileReader interface](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) - 
  Explains the FileReader interface.
- [Cloduinary FileReader Tutorial](https://cloudinary.com/guides/front-end-development/building-an-image-upload-feature-with-javascript) - Helped me implement the drop feature.

## Author

- Website - [InfamousTheif](https://www.your-site.com)
- Frontend Mentor - [@InfamousTheif](https://www.frontendmentor.io/profile/InfamousTheif)
