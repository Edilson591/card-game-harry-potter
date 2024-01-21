
state = {
    score:{
        playScore:0,
        computerScore:0,
        scoreBox: document.querySelector("#score__points"),
    },
    cardSprites:{
        avatar: document.querySelector("#cardimage"),
        cardName: document.querySelector("#card-name"),
        cardType: document.querySelector("#card-type")

    },
    cardFields:{
        cardPlayer: document.getElementById("player-infield-card"),
        cardComputer: document.getElementById("computer-infield-card")
    },
    playSides:{
        player1:'player-cards',
        playerBox: document.getElementById("player-cards"),
        computer:'computer-cards',
        computerBox: document.getElementById("computer-cards")
    },
    action:{
        button:document.getElementById("next-duel")
    }
}
const rendPlayers = {
    player1:'player-cards',
    computer:'computer-cards'
}

async function apiCards(){
    return await requestApiHP()
}

async function randomCard(){
    const rendPlayer = await apiCards()
    const random = Math.floor(Math.random()*rendPlayer.length)
    return rendPlayer[random].id
}

async function createCard(randomIdCard,fieldSide){
    const cardImg = document.createElement("img")
    cardImg.setAttribute("height","100px")
    cardImg.setAttribute("src", "src/imgs/card-back.png")
    cardImg.setAttribute("data-id", randomIdCard)
    cardImg.classList.add("card");
    
    
    if(fieldSide === rendPlayers.player1){
           cardImg.addEventListener("mouseover", () =>{
            drawSelectCard(randomIdCard)
           });
           cardImg.addEventListener("click", () => {
            cardPlayer(cardImg.getAttribute("data-id"))
           })
      
    }

    return cardImg
       
    }

async function cardPlayer(playerid){

    await removeCard()
    let computerid = await randomCard()

    await hiddenCard(true)

    await resetCard()
    await drawFieldCard(playerid,computerid)

    let resultsDuel = await setResultsDuel(playerid,computerid)

    await updateScore()
    await drawButton(resultsDuel)
    


}

async function removeCard(){
    let {playerBox,computerBox} = state.playSides
    let imgPlayers = playerBox.querySelectorAll("img")
    imgPlayers.forEach((img) => img.remove())

    let imgComputer = computerBox.querySelectorAll("img")
    imgComputer.forEach((img) => img.remove())
}

async function resetCard(){
    state.cardSprites.avatar.src = ""
    state.cardSprites.cardName.innerText = ""
    state.cardSprites.cardType.innerText = ""

}
async function drawFieldCard(playerId,computerid){
    const selectCard = await apiCards()
    state.cardFields.cardPlayer.src = selectCard[playerId].img
    state.cardFields.cardComputer.src = selectCard[computerid].img

}
async function hiddenCard(value){
    if(value === true){
        state.cardFields.cardPlayer.style.display = "block"
        state.cardFields.cardComputer.style.display = "block"
        state.cardSprites.avatar.style.display = "none"
    }
    if(value === false){
        state.cardFields.cardPlayer.style.display = "none"
        state.cardFields.cardComputer.style.display = "none"
        state.cardSprites.avatar.style.display = "block"

    }
}
async function setResultsDuel(playerId,computerid){
    let duelRes = "Draw"
    const getCard = await apiCards()
    let playerCards = getCard[playerId]

    if(playerCards.WinOf.includes(computerid)){
        duelRes = "Win"
        state.score.playScore++
    }
    if(playerCards.LoseOf.includes(computerid)){
        duelRes = "lose"
        state.score.computerScore++
    }


    return duelRes
   
}

async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${state.score.playScore} Lose: ${state.score.computerScore}`
}

async function drawSelectCard(index){
    const cardId = await apiCards()
    state.cardSprites.cardName.innerText = cardId[index].name
    state.cardSprites.cardType.innerText = `Atributo: ${cardId[index].type}`
    state.cardSprites.avatar.src = cardId[index].img
}
async function drawButton(resultsDuel){
    state.action.button.innerText = resultsDuel.toUpperCase();
    state.action.button.style.display = "block";
}


async function drawCard(cardNumber,fieldSide){
    for (let i = 0; i < cardNumber; i++) {
        const randomIdCard = await randomCard()
        const cardSelect = await createCard(randomIdCard,fieldSide)
        
        document.getElementById(fieldSide).appendChild(cardSelect)
        
    }

}

async function resetduel(){
    state.cardSprites.avatar.src = ""
    state.action.button.style.display = "none"
    state.cardFields.cardPlayer.style.display = "none"
    state.cardFields.cardComputer.style.display = "none"

    init()
}





function init () {
    hiddenCard(false)
    drawCard(5,rendPlayers.player1)
    drawCard(5,rendPlayers.computer)
}

init()