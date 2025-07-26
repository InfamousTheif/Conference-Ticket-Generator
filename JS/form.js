const fileInput = document.querySelector('#fileUploader');
const imgOutput = document.querySelector('.output-img');
const dragArea = document.querySelector('.dragArea');
const stepsText = document.querySelector('.steps-text');
const buttonsWrapper = document.querySelector('.complete-buttons-wrapper');
const imgErrorMsg = document.querySelector('.img-error');
const imgReqMsg = document.querySelector('.img-requirements');
export const GenButton = document.querySelector('.generate-button');
const uEmail = document.querySelector('#u-email');
const emailError = document.querySelector('.email-error');
const usernameError = document.querySelector('.username-error');
const gitUserError = document.querySelector('.gituser-error');
const removeButton = document.querySelector('#remove-button');
const changeButton = document.querySelector('#change-button');
const fullName = document.querySelector('#f-name');
const gitUser = document.querySelector('#git-user')
const baseImg = imgOutput.src;


let imgTimeOut;
let emailTimeOut;
export let ticketArray = [];

function addGlobalEventListener(parent,type, selector, callback){
  parent.addEventListener(type, e => {
    if(e.target.matches(selector)){
      callback(e)
    }
  })
}

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

function imgDropHandler(e){
  e.preventDefault()
  const [file] = e.dataTransfer.files;

  imgHandler(file)
}

function imgClickDropDragHandler(){
  /*Click handler*/
  fileInput.addEventListener("change", async () => {
    let [file] = fileInput.files;
    imgHandler(file)
  })  

  /* Drag and drop handlers*/
  addGlobalEventListener(dragArea, 'dragover', '.dragArea', (e) => {
    e.preventDefault()
    stepsText.style.display = 'none'
    buttonsWrapper.classList.add('show')
  })

  addGlobalEventListener(dragArea, 'drop', '.dragArea', (e) => {
    imgDropHandler(e)
  })

  changeButton.addEventListener("change", async () => {
    let [file] = changeButton.files;

    imgHandler(file)
  })    
}

function inputErrorHandler(selector, errSelector){
  errSelector.style.display = 'flex';
  selector.style.border = 'solid 1px var(--orange2)'
  clearTimeout(emailTimeOut)
  emailTimeOut = setTimeout(() => {
    selector.style.border = 'solid 1px var(--grey2)'
    errSelector.style.display = 'none';
  }, 5000)
}

function generateHandler(){
  const regexPattern = /^.+@.+/;
  GenButton.addEventListener('click', () => {
    if(!uEmail.value || !regexPattern.test(uEmail.value)){
      inputErrorHandler(uEmail, emailError)
      return
    }

    if(imgOutput.src === baseImg){
      alert('Upload an image')
      return;
    }

    if(!fullName.value){
      inputErrorHandler(fullName, usernameError)
      return
    }

    if(!gitUser.value){
      inputErrorHandler(gitUser, gitUserError)
      return
    }

    ticketArray = []
    ticketArray.push(imgOutput.src, fullName.value, uEmail.value, gitUser.value );
    sessionStorage.setItem('ticketArray', JSON.stringify(ticketArray));
    window.location.href = 'ticketpage.html'
  })
}

function imgButtonsHandler(){
  removeButton.addEventListener('click', () => {
    imgOutput.src = "./assets/images/icon-upload.svg";
    fileInput.style.pointerEvents = 'auto';
    stepsText.style.display = 'flex'
    buttonsWrapper.classList.remove('show')
  })
}

generateHandler()

imgClickDropDragHandler()

imgButtonsHandler()
