
const prompt = require("prompt-sync")();

const rows = 3;
const cols = 3;

const symbol_count = {
    "A": 2,
    "B": 3,
    "C": 5,
    "D": 7
}

const symbol_values = {
    "A": 7,
    "B": 5,
    "C": 3,
    "D": 2
}
const deposit = ()=>{
    while(true){
    const deposit_amt = prompt("Enter the amount you want to deposit :$");
    const deposit_amt_number = parseFloat(deposit_amt);
    if(isNaN(deposit_amt_number) || deposit_amt_number <= 0){
        console.log("You entered the invalid deposit amount");
    }
    else{
        return deposit_amt_number;
    }
}
};

const getnumberoflines = ()=>{
    while(true){
    const number_of_lines = prompt("Enter the number of lines you want to bet(1-3) : ");
    const number_of_line = parseFloat(number_of_lines);
    if(isNaN(number_of_line) || number_of_line > 3 || number_of_line <=0){
        console.log("You entered the wrong number of lines.🧐 \n Invalid Input");
    }
    else
    return number_of_line; 
}
}

const getbet = (balance,numberoflines)=>{
    while(true){
    const bet = prompt("Enter the amount you want to bet per line :$ ");
    const bet_amt = parseFloat(bet);
    if(isNaN(bet) || (bet <=0 || balance < (bet_amt*numberoflines))){
        console.log("You entered the wrong amount for the bet amount.");
        console.log("Be sure to check the balance and bet amount above the balance.")
    }
    else
    return bet_amt; 
}
}
const spin = ()=>{
    const symbols = [];
    for (const[symbol, number]of Object.entries(symbol_count)){
        for(let i =0; i< number; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i = 0; i< cols;i++){
        reels.push([]);
        const reelSymbols = [...symbols];              // Copies all the symbols in the reelSymbols
        for (let j = 0; j< rows;j++){
            const randomIndex = Math.floor(Math.random()*symbols.length);
            const selectedsymbols = symbols[randomIndex];
            reels[i].push(selectedsymbols);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}

const printrows = (reels)=>{
    for(const row of reels){
        let reelString = "";
        for (const [i, symbol] of row.entries()){
            reelString += symbol;
            if(i!= row.length - 1){
                reelString += "| ";
            }

        }
        console.log(reelString);
    }
}

const getWinning = (reels, bet, lines)=>{
    let winning = 0;
    for(let row = 0; row < lines; row++){
        const symbols = reels[row];
        let allsame = true;
        for(let sym of symbols){
            if(sym != symbols[0]){
                allsame = false;
                break;
            }
        }
        if(allsame){
            winning += bet * symbol_values[symbols[0]];
        }
    }
    return winning;
}
const quitgame = ()=>{
    const userchoice = prompt("Do you want to continue(y/n) :");
    if(userchoice == 'n'){
    return true;
    }
    else{
    return false;
    }
}
const game = ()=>{
    let balance = deposit();
    while(true){
        if(balance <= 0){
            console.log("You ran out of the money.");
            return;
        }
    console.log("You have a balance of : $ "+ balance);
    const numberoflines = getnumberoflines();
    let bet = getbet(balance,numberoflines);
    balance -= bet*numberoflines;
    const reels = spin();
    printrows(reels);
    const winning = getWinning(reels, bet, numberoflines);
    console.log("The amount you win this round is " + "$"+ winning.toString());
    if(winning > 0){
    balance += winning + bet*numberoflines;
    }
    console.log("Your balance is $ " + balance );
    if(quitgame()){
        break;
    };
    }
}

game();



// const transpose = (reels)=>{
//     const _rows = [];
//     for(let i = 0; i< rows; i++){
//         _rows.push([]);
//         for(let j = 0; j< cols; j++){
//             _rows[i].push(reels[j][i]);
//         }
//     }
//     return _rows;
// }




