const ticketArray = JSON.parse(sessionStorage.getItem('ticketArray'));
const userName = document.querySelector('#user-name');
const userImg = document.querySelector('#user-img');
const gitInfo = document.querySelector('.git-info');
const userEmail = document.querySelector('#h-email')
const headerName = document.querySelector('#h-name');
const cardCode = document.querySelector('.code');
const dateWrapper = document.querySelector('#date-wrapper');
const now = new Date();
const date = now.toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
const dateAsString = now.toString();
const timezoneMatch = dateAsString.match(/\(([^)]+)\)$/); // Extracts content within parentheses;
const timezoneName = timezoneMatch ? timezoneMatch[1] : 'Unknown';

userEmail.innerHTML = `${ticketArray[2]}`
headerName.innerHTML = `${ticketArray[1]}`
dateWrapper.innerHTML = `${date} / ${timezoneName}`
userName.innerHTML = `${ticketArray[1]}`;
userImg.src = ticketArray[0]
gitInfo.innerHTML = `<img src="./assets/images/icon-github.svg">
                     ${ticketArray[3]} `;
cardCode.innerHTML = `#${Math.floor(Math.random()*99999)}`                     

