/**
 * @description Toggle given class using cross browser property ClassName.
 * @param {Object} element DOMElement to toggle class.
 * @param {String} className Class name that should be toggled.
 */
// toggleClass function from https://stackoverflow.com/questions/18880890/how-do-i-toggle-an-elements-class-in-pure-javascript
function toggleClass(element, className) {
    if (!element || !className) {
        return;
    }

    var classString = element.className,
        nameIndex = classString.indexOf(className);
    if (nameIndex == -1) {
        classString += ' ' + className;
    } else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
    }
    element.className = classString;
}

// Shortcut for create element
function createEl(tag){
    return document.createElement(tag);
}

module.exports = {
    toggleClass: toggleClass,
    createEl: createEl
};