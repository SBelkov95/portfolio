// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
const game = document.getElementById("game")
const restartGame = (game, count) =>{

const arr = [];
let oneCard = null;
let twoCard = null;
const createNumbersArray = () => {
    for(let i = 1; i<=count; i++) {
        arr.push(i,i)
    }
    console.log(arr)
}
createNumbersArray()

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

const shuffle =(arr) => {
    for(let i = 0; i < arr.length; i++){
        let randomIndex = Math.floor(Math.random() * arr.length)
        let temp = arr[i];
        arr[i] = arr[randomIndex]
        arr[randomIndex] = temp
    }
    console.log(arr)
}
shuffle(arr);

    for(const cardNumber of arr){
        const card = document.createElement('div')
        card.textContent = cardNumber
        card.classList.add('card')
    card.addEventListener("click", function(){
        if(card.classList.contains("open")|| card.classList.contains("success")){
            alert('Эта карточка уже открыта')
        return
    }
        if(oneCard!==null&&twoCard!==null){
            oneCard.classList.remove("open")
            twoCard.classList.remove("open")
            oneCard = null;
            twoCard = null;
        }
        card.classList.add("open")
        if(oneCard === null){
            oneCard = card
        }else{
            twoCard = card
        }
        if(oneCard!==null&&twoCard!==null){
            let onecardNumber = oneCard.textContent
            let twocardNumber = twoCard.textContent
            if(onecardNumber===twocardNumber){
                oneCard.classList.add("success")
                twoCard.classList.add("success")
            }
        }
        if(arr.length === document.querySelectorAll(".success").length){
            game.innerHTML = ""
            setTimeout(() => {
                alert("finish")
                let count = Number(prompt("Введите кол-во пар", 4));
            restartGame(game, count)
            }, 400);
        }
    })
    game.append(card)
    }
}
let count = Number(prompt("Введите кол-во пар", 4));
restartGame(game, count)