window.onload = function () {
    atstart();
}
let arr = new Array(9); // create an empty array of length n
for (var i = 0; i < 9; i++) {
    arr[i] = new Array(9); // make each element an array
}
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++)arr[i][j] = '_';
}
function atstart() {
    //creating a grid of 9X9
    var sudoku = document.getElementById("sudoku-grid");
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            let box = document.createElement("input");
            box.setAttribute("id", i.toString() + "-" + j.toString());
            box.classList.add("tile");
            if (i == 2 || i == 5) {
                box.classList.add("horizontal-line");
            }
            if (j == 2 || j == 5) {
                box.classList.add("vertical-line");
            }
            sudoku.append(box);
            box.addEventListener("input", function () {
                // console.log(this.id);
                // console.log(this.value);
                if (keys.includes(this.value)) {
                    let coords = this.id.split("-");
                    let r = parseInt(coords[0]);
                    let c = parseInt(coords[1]);
                    arr[r][c] = this.value;
                    // console.log(arr[r][c]);
                } else {
                    // alert("invalid input");
                    var s = this.value;
                    s = s.slice(0, s.length - 1);
                    this.value = s;
                }
            });
        }
    }
}
function isvalid(row, col, c) {
    var count = 0;
    for (var i = 0; i < 9; i++) {
        if (arr[row][i] == c) count++;
        if (arr[i][col] == c) count++;
        var newr = parseInt(3 * (parseInt(row / 3)) + i / 3);
        var newc = parseInt(3 * parseInt((col / 3)) + i % 3);
        if (arr[newr][newc] == c) count++;
    }
    if (count > 3) return false;
    return true;
}
function isvalidsudoku(arr) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (arr[i][j] != '_') {
                if (isvalid(i, j, arr[i][j]) == false)
                    return false;
            }
        }
    }
    return true;
}
var keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
var start = document.getElementById("start");
start.addEventListener("click", validate);
var reset=document.getElementById("reset");
reset.addEventListener("click",clear);
var valid=document.getElementById("validate");
valid.addEventListener("click",function(){
    if(isvalidsudoku(arr)==false)alert("invalid sudoku");
    else alert("valid sudoku");
});
function validate() {
    let isOk = isvalidsudoku(arr);
    if (isOk == false) alert("invalid sudoku");
    else {
        colorchange();
        if (solveSudoku()) {
            printsudoku();
            alert("sudoku solved");
        } else alert("sudoku can't be solved");
    }
}
function colorchange(){
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<9;j++)
        {
            if(arr[i][j]!='_')
            {
                var y=document.getElementById(i.toString()+"-"+j.toString());
                y.style.color="red";
            }
        }
    }
}
function isvalidSudokusolve(row, col, c) {
    for (var i = 0; i < 9; i++) {
        if (arr[i][col] == c) return false;
        if (arr[row][i] == c) return false;
        var newr = parseInt(3 * (parseInt(row / 3)) + i / 3);
        var newc = parseInt(3 * parseInt((col / 3)) + i % 3);
        if (arr[newr][newc] == c) return false;
    }
    return true;
}
function solveSudoku() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (arr[i][j] == '_') {
                for (var c = '1'; c <= '9'; c++) {
                    if (isvalidSudokusolve(i, j, c)) {
                        arr[i][j] = c;
                        if (solveSudoku())
                            return true;
                        else arr[i][j] = '_';
                    }
                }
                return false;
            }
        }
    }
    return true;
}
function printsudoku() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var x = document.getElementById(i.toString() + "-" + j.toString());
            x.value = arr[i][j];
        }
    }
}
function clear(){
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<9;j++)
        {
            arr[i][j]='_';
            var x=document.getElementById(i.toString()+"-"+j.toString());
            x.style.color="black";
            x.value="";
        }
    }
}

