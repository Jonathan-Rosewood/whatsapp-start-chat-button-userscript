// ==UserScript==
// @name        WhatsApp Start Chat Button
// @description Adds start chat button to sidebar buttons group
// @namespace   MeddleMonkey Scripts
// @author      JR Agency
// @version     0.3
// @homepage    https://github.com/Jonathan-Rosewood/whatsapp-start-chat-button-userscript
// @icon16      https://github.com/Jonathan-Rosewood/whatsapp-start-chat-button-userscript/raw/main/icon-16.png
// @icon64      https://github.com/Jonathan-Rosewood/whatsapp-start-chat-button-userscript/raw/main/icon-64.png
// @updateURL   https://github.com/Jonathan-Rosewood/whatsapp-start-chat-button-userscript/raw/main/script.meta.js
// @downloadURL https://github.com/Jonathan-Rosewood/whatsapp-start-chat-button-userscript/raw/main/script.code.js
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
    const button = document.createElement('button');
    button.setAttribute('style', BUTTON_STYLES);
    button.classList.add('_2cNrC');
    button.innerHTML = '+';
  	button.addEventListener('click', promptPhone);
    return button;
}

function mountButton(button) {
    const buttonsGroup = document.querySelector(BUTTONS_GROUP_SELECTOR);
  	if (!buttonsGroup) return setTimeout(mountButton, 1000, button);
  
  	const buttonsGroupSpan = buttonsGroup.querySelector('span');
  	if (!buttonsGroupSpan) return setTimeout(mountButton, 1000, button);
  
    buttonsGroupSpan.prepend(button);
}

setTimeout(() => {
	const button = createButton();
  	mountButton(button);
}, 1000);

window.mountButton = mountButton;
