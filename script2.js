function createXOArray(){
    return ["X","Y","X","Y","X","Y","X","Y","X"];
}

function initGameData(){
    return [["","",""],["","",""],["","",""]];
}


let xoArray = createXOArray();
let gameData = initGameData();
let turns = 0;
let winner = false;

const cellDivs = document.querySelectorAll('.cell');
const messageDiv = document.querySelector('.message');

function handleClick(index)
{
    
    if (winner==true){
        return
    }

    //store the XY
    let xy = xoArray.pop();

    //display XY 
    cellDivs[index].textContent = xy;

    //update the gameData array
    if (index < 3){
        gameData[0][index] = xy;
    } else if (index < 6){
        gameData[1][index-3] = xy;
    } else if (index < 9)
    {
        gameData[2][index-6] = xy;
    }

    //increase the number of turns
    turns++;
    console.log({gameData});

    if (turns < 5){
        return
    }

    
    checkWinner(xy);    
}

function checkWinner(xyValue){
    
   

    let player = "";
    if (xyValue==="X"){
        player = "XXX";
    }
    else {
        player = "YYY";
    }
    
    console.log({player});
    
    //check rows and columns
    let col0 = "";
    let col1 = "";
    let col2 = "";
    let decreaseDiagonal = ""; //check if x|y wins with \ pattern
    let increaseDiagonal = ""; //check if x|y wins with / pattern
    for(let row = 0; row < 3; row++){
        
        let sumRow = "";
        for(let col=0; col <3; col++){
            sumRow += gameData[row][col];

            //check for column0 pattern
            if (col===0){
                col0+=gameData[row][0];
            }

            //check for column1 pattern
            if (col===1){
                col1+=gameData[row][1];
            }

            //check for column2 pattern
            if (col===2){
                col2+=gameData[row][2];
            }

            //check for decreaseDiag pattern \
            if (row===0 && col===0){
                decreaseDiagonal+=gameData[0][0];
            }
            
            //both decreaseDiagonal and increaseDiagonal share the cell at the center
            if (row===1 && col===1){
                decreaseDiagonal+=gameData[1][1];
                increaseDiagonal+=gameData[1][1];
            }

            if (row===2 && col===2){
                decreaseDiagonal+=gameData[2][2];
            }

            //check for increaseDiag pattern /
            if(row===0 && col===2){
                increaseDiagonal+=gameData[0][2];
            }

            if(row===2 && col===0){
                increaseDiagonal+=gameData[2][0];
            }

            
        }
        
        if(player===sumRow || player===col0 || player===col1 || player===col2 || player===decreaseDiagonal || player===increaseDiagonal){
            messageDiv.textContent = "Player " + xyValue + " WINS!!!";
            winner = true;
            return
        }

    }

}
for(let idx = 0; idx < cellDivs.length; idx++){
    cellDivs[idx].addEventListener('click',function(){
        cellDivs[idx].textContent === "" ? handleClick(idx) : false;       

    });
}


/*
document.querySelectorAll('.cell').forEach((cell)=> {
    cell.addEventListener('click', ()=> {
       
        cell.textContent === "" ? cell.textContent = xoArray.pop() : false;
        
    });
});

*/