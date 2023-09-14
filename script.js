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
    checkWinner(xy);    
}

function checkWinner(xyValue){
    
    if (turns < 5){
        return "";
    }

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
    for(let row = 0; row < 3; row++){
        
        let sumRow = "";
        for(let col=0; col <3; col++){
            sumRow += gameData[row][col];

            if (col===0){
                col0+=gameData[row][0];
            }

            if (col===1){
                col1+=gameData[row][1];
            }
            
            if (col===2){
                col2+=gameData[row][2];
            }
        }
        
        if(player===sumRow || player===col0 || player===col1 || player===col2){
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