'use strict';

class Options {
    constructor(height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    createDiv() {
        let div = document.createElement('div');
        document.body.appendChild(div);
        let cssText = `height: ${this.height}px; width: ${this.width}px; 
            background-color: ${this.bg}; font-size: ${this.fontSize}; 
            text-align: ${this.textAlign}`;
        div.style.cssText = cssText;
    }
}

let options = new Options(50, 300, 'red', 'small', 'left');
options.createDiv();