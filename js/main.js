'use strict'
var gRows = 4
var gNums
var gcountNum = 1
var gIntervald
var elWinnerMsg = document.querySelector('.h3')
var elNextNumber = document.querySelector('.nextNumber')
var elBoard = document.querySelector('.boardPlace')


///// function onInit for rendthing can be useful alot more then just in the strat :)
function onInit() {
    gcountNum = 1
    elNextNumber.innerText = `Next Number To Press: ${gcountNum}`
    gNums = createNums(gRows)
    renderBoard()
    elWinnerMsg.style.display = 'none'
    clearInterval(gIntervald)
    var elTimer = document.querySelector('.stopWatch')
    elTimer.innerText = '00 : 00 : 000'

    // console.log(gNums)


}
//// function for timer with no hours ... set by intrval and varible for time adapting
function showTimer() {
    var elTimer = document.querySelector('.stopWatch')
    var [milliseconds, seconds, minutes] = [0, 0, 0];
    var newTime = Date.now()
    gIntervald = setInterval(() => {
        var time = Date.now() - newTime + 0
        milliseconds = parseInt((time % 1000) / 1)
        seconds = parseInt((time / 1000) % 60)
        minutes = parseInt((time / (1000 * 60)) % 60)
        elTimer.innerText = `Time:${minutes}:${seconds}:${milliseconds}`

    }), 10
}
//// when cell click alot of things happen inside just search and see
function onCellClicked(numInCell, elCell) {
    // console.log(numInCell)
    // console.log(elCell)
    if (numInCell !== gcountNum) return
    if (numInCell === 1) showTimer()
    if (numInCell === gcountNum) {
        gcountNum++
        elNextNumber.innerText = `Next Number To Press: ${gcountNum}`
        elCell.style.backgroundColor = '#E3A835'
        elCell.style.color = 'black'
    }
    if (numInCell === gRows * gRows) clearInterval(gIntervald)
    if (gcountNum === (gRows * gRows) + 1) {
        elWinnerMsg.style.display = 'block'
    }

}
//// function for rending the board the cell functions name and inner text for this time :)
function renderBoard() {
    var strHtml = ''
    for (var i = 0; i < gRows; i++) {
        strHtml += '<tr>'

        for (var j = 0; j < gRows; j++) {
            var cell = drawNum(gNums)
            var className = cell ? 'taken' : ''
            strHtml += `<td onclick="onCellClicked(${cell},this)" class="${className}">${cell}</td>`
        }

        strHtml += '</tr>'

    }
    var elTable = document.querySelector('tbody.board')
    elTable.innerHTML = strHtml
}
//// function for bigger table and right position
function easyLevel() {
    elBoard.style.marginLeft = 6 + 'rem'
    gRows = 5
    if (gIntervald) clearInterval(gIntervald)
    else showTimer()
    onInit()

}
//// function for bigger table and right position
function HardLevel() {
    elBoard.style.marginLeft = 5 + 'rem'
    gRows = 6
    if (gIntervald) clearInterval(gIntervald)
    else showTimer()
    onInit()

}
//// function for bigger table and right position
function superHardLevel() {
    elBoard.style.marginLeft = 1.5 + 'rem'
    gRows = 8
    if (gIntervald) clearInterval(gIntervald)
    else showTimer()
    onInit()
}

/// function to create a array of nums
function createNums(size) {
    size *= size
    var num = []
    for (var i = 0; i < size; i++) {
        num.push(i + 1)
    }
    return num
}

//// function from class draw num each time you call it 
function drawNum(nums) {
    var randomIdx = getRandomInt(0, nums.length);
    return nums.splice(randomIdx, 1)[0];
}

//// allways useful
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}