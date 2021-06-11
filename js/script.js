"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");

  function DomElement(selector, height, width, background, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.background = background;
    this.position = position;
  }

  DomElement.prototype.addElement = function (text) {
    let newDiv = document.createElement("div");
    newDiv.classList.add(this.selector.substr(1));
    newDiv.style.cssText = `height: ${this.height}`;
    newDiv.style.cssText += `width: ${this.width}`;
    newDiv.style.cssText += `background-color: ${this.background}`;
    newDiv.style.cssText += `position: ${this.position}`;
    newDiv.style.cssText += `top: 0`;
    newDiv.style.cssText += `left: 0`;
    body.append(newDiv);
  };

  let block = new DomElement(".block", "100px", "100px", "#bdbdf2", "absolute");
  block.addElement();



  let box = document.querySelector(".block");

  const whatArrow = function () {
    
    if (window.event.keyCode === 38) {
      let top = box.style.top;
      let number = +top.slice(0, -2);
      number = number - 10;
      box.style.cssText += `top: ${number}px`;
    } else if (window.event.keyCode === 39) {
      let right = box.style.left;
      let number = +right.slice(0, -2);
      number = number + 10;
      box.style.cssText += `left: ${number}px`;
    } else if (window.event.keyCode === 40) {
      let bottom = box.style.top;
      let number = +bottom.slice(0, -2);
      number = number + 10;
      box.style.cssText += `top: ${number}px`;
    } else if (window.event.keyCode === 37) {
      let left = box.style.left;
      let number = +left.slice(0, -2);
      number = number - 10;
      box.style.cssText += `left: ${number}px`;
    } else {
      return;
    }
  };

  document.addEventListener("keydown", () => whatArrow());
  


});



