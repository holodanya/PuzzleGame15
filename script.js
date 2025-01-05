const gameContainer = document.getElementById("game-container");
const winMessage = document.getElementById("win-message");

let tiles = [
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, ""
];

function shuffle(array) {
    do {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tempi = array[i];
            array[i] = array[j] 
            array[j] = tempi;
        }
    } while (!isSolvable(array));
}

function isSolvable(array) {
    let inversions = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] === "") continue;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] === "") continue;
            if (array[i] > array[j]) inversions++;
        }
    }

    const emptyRow = Math.floor(array.indexOf("") / 4) + 1; 
    const N = inversions + emptyRow;
   //console.log(N);
    
    return N % 2 === 0;
}

function render() {
    gameContainer.innerHTML = "";
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement("div");
        tileElement.classList.add("tile");
        if (tile === "") {
            tileElement.classList.add("empty");
        } else {
            tileElement.textContent = tile;
            tileElement.addEventListener("click", () => moveTile(index));
        }
        gameContainer.appendChild(tileElement);
    });
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf("");
    const validMoves = [
        emptyIndex - 4,
        emptyIndex + 4,
        emptyIndex - 1, 
        emptyIndex + 1 
    ];

    if (validMoves.includes(index)) {
        if ((index % 4 === 3 && emptyIndex % 4 === 0) || (index % 4 === 0 && emptyIndex % 4 === 3)) {
            return;
        }
        const tempindex = tiles[index];
        tiles[index] = tiles[emptyIndex];
        tiles[emptyIndex] = tempindex;
        render();
        checkWin();
    }
}


function checkWin() {
    const winState = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, ""
    ];

    if (tiles.join() === winState.join()) {
        winMessage.style.display = "block";
        setTimeout(() => {
            winMessage.style.display = "none";
            alert("Reloading the game...");
            shuffle(tiles);
            render();
        }, 3000);
    }
}
shuffle(tiles);
render();