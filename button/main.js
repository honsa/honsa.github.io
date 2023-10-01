/**
 * @type {number}
 */
let i = 0;
let buttons = false;
let buttonCount = 0;

let cpu = navigator.hardwareConcurrency;
/**
 * @type {HTMLElement}
 */
let button = document.getElementById('one-and-only');

button.addEventListener('click', expand);

let cpuEl = document.getElementById('cpu');

cpuEl.textContent += cpu;

let heartCount = document.getElementById('hearts')
/**
 * Copy once if Button one is clicked, copy twice if Button two is clicked and so on
 *
 * @param e
 */
function expand(e) {
    let attribute = e.target.getAttribute('data-i');

    if (!attribute) {
        return false
    }

    let targetCount = Number(attribute);
    if (0 === targetCount) {

        console.log(`Button ${i} created ;)`);

        createCopy(e.target);
    } else if (0 < targetCount) {

        if (false === buttons) {
            buttons = targetCount * 2
        }

        while (buttons >= targetCount) {

            createCopy(e.target);

            buttons--;

            expand(e);
        }

        buttons = false;
    }
}

function fillHearts(){

}

/**
 *
 * @param node
 */
function createCopy(node) {
    let copy = node.cloneNode();

    copy.id = 'next-' + i;
    copy.textContent = 'I am Button ' + i;
    copy.title = 'I cannot expand endless...';
    copy.setAttribute('data-i', i);
    copy.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    /**
     * Add banana on pi
     */
    if(i %= 3.14){
        copy.textContent += ' 🍌';
    }

    /**
     * Important
     */
    copy.addEventListener('click', expand);

    node.parentNode.appendChild(copy);

    copy.focus();

    i++;
    buttonCount++;
    heartCount.textContent = i;
}