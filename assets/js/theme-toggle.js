document.addEventListener("DOMContentLoaded", main);

function main() {
    let bodyElement = document.getElementsByTagName("body")[0];
    setTheme(bodyElement, getCurrentTheme(bodyElement));
    themeToggle(bodyElement);
}

function themeToggle(element){
    // Query for the theme toggler button
    const button = document.querySelector('#theme-toggle');

    if(button) {
        // Add an event listener for a click
        button.addEventListener('click', () => {
            const currentTheme = getCurrentTheme(element);
            const newTheme = (currentTheme == "light") ? "dark" : "light"
            setTheme(element, newTheme);
        });
    }
}

function getCurrentTheme(element) {
    let currentTheme = window.localStorage.getItem("theme");

    if(!currentTheme) { currentTheme = element.getAttribute("a"); }

    return currentTheme
}

function setTheme(element, theme) {
    // Set a new theme to the body tag with attribute 'a'
    element.setAttribute("a", theme);

    // Save the switched theme to localStorage
    window.localStorage.setItem("theme", theme)
}
