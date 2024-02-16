function createButton(name) {
    let button = document.createElement('button');
    button.innerHTML = name;
    button.onclick = (e) => {

        if(e.target.classList.contains('selected')) {
            e.target.classList.remove('selected');
        } else {
            e.target.classList.add('selected');
        }
    };

    main.appendChild(button);
}

function fibonacciNumbers() {
    let fibNumbers = [0, 1];
    let nextNumber = fibNumbers[fibNumbers.length - 1] + fibNumbers[fibNumbers.length - 2];

    while (nextNumber <= 34) {
        fibNumbers.push(nextNumber);
        createButton(nextNumber);
        nextNumber = fibNumbers[fibNumbers.length - 1] + fibNumbers[fibNumbers.length - 2];
    }
}

let main = document.getElementById('main');

fibonacciNumbers();