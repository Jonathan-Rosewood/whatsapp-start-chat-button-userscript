// ==UserScript==
// @name        WhatsApp Start Chat Button
// @description Adds start chat button to sidebar buttons group
// @namespace   MeddleMonkey Scripts
// @author      JR Agency
// @version     0.1
// @homepage    https://github.com/Jonathan-Rosewood/whatsapp-start-chat-button-userscript
// @include     http://web.whatsapp.com/*
// @include     https://web.whatsapp.com/*
// @run-at      document-end
// ==/UserScript==

const BUTTONS_GROUP_SELECTOR = '._1QVfy';
const BUTTON_STYLES = `
    display: inline-block;
    appearence: none;
    box-shadow: none;
    border: none;
    font-size: 31px;
    vertical-align: middle;
    padding-bottom: 7px;
    color: rgba(0,0,0,0.65);
    margin-right: 15px;
`;

function openChat(phone) {
  const link = document.createElement('a');
  link.setAttribute('href', `whatsapp://send?phone=${phone}`);
  document.body.append(link);
  link.click();
  document.body.removeChild(link);
}

function promptPhone() {
  let phone = prompt('Phone number', '+7');
  if (phone != null) return openChat(phone);
}

function createButton() {
  	console.log('createButton called');
    const button = document.createElement('button');
    button.setAttribute('style', BUTTON_STYLES);
    button.classList.add('_2cNrC');
    button.innerHTML = '+';
  	button.addEventListener('click', promptPhone);
    return button;
}

function mountButton(button) {
  	console.log('mountButton called v8');
  
    const buttonsGroup = document.querySelector(BUTTONS_GROUP_SELECTOR);
  	console.log('buttonsGroup query selector', buttonsGroup);
  	if (!buttonsGroup) return setTimeout(mountButton, 1000, button);
  
  	const buttonsGroupSpan = buttonsGroup.querySelector('span');
  	console.log('buttonsGroupSpan query selector', buttonsGroupSpan);
  	if (!buttonsGroupSpan) return setTimeout(mountButton, 1000, button);
  
    buttonsGroupSpan.prepend(button);
  	console.log('mountButton button mounted!');
}

setTimeout(() => {
	const button = createButton();
  	mountButton(button);
}, 1000);

window.mountButton = mountButton;