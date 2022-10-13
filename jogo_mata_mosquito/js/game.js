
var height = 0
var width = 0
var lifes = 1
var points = 0

var mosquitoesTime = 1500
var level = window.location.search
level = level.replace('?', '')

// Select the game level
if (level === 'facil') {
	mosquitoesTime = 2000
} else if(level === 'normal') {
	mosquitoesTime = 1500
} else if(level === 'dificil') {
	mosquitoesTime = 1000
} else if (level === 'hard_as_fuck') {
	mosquitoesTime = 750
}

var gameTime = 15
var time = window.location.search
time = time.replace('?', '')

// Select the game time
if (time === '15s') {
	gameTime = 15
} else if(time === '30s') {
	gameTime = 30
} else if(time === '45s') {
	gameTime = 45
} else if (time === '60s') {
	gameTime = 60
}

function gameSizeAdjust() {
	height = window.innerHeight
	width = window.innerWidth

	console.log(width, height)
}
gameSizeAdjust()

var stopwatch = setInterval(function() {
	gameTime --

	if (gameTime < 0) {
		clearInterval(stopwatch)
		clearInterval(createMosquito)
		window.location.href = 'victory.html'
	} else {
		document.getElementById('stopwatch').innerHTML = gameTime
	}
}, 1000)

function randomPosition() {

	//remove the previus mosquito (if exist)
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()
	//lifes logic
		if (lifes > 3) {
			window.location.href = 'end_game.html'
		} else {
			document.getElementById('l' + lifes).src = "imagens/coracao_vazio.png"
			lifes ++
		}
	}

	var positionX = Math.floor(Math.random() * width) - 90
	var positionY = Math.floor(Math.random() * height) - 90

	positionX = positionX < 0 ? 0 : positionX
	positionY = positionY < 0 ? 0 : positionY

	console.log(positionX, positionY)

	//create the html element
	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosquito.png'
	mosquito.className = randomSize() + ' ' + randomSide()
	mosquito.style.left = positionX + 'px'
	mosquito.style.top = positionY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function() {
		points += 10
		localStorage.setItem('points', points)
		document.getElementById('points').innerHTML = points
		this.remove()
	}

	document.body.appendChild(mosquito)

}

function randomSize() {
	var mosquitoClass = Math.floor(Math.random() * 3)

	switch(mosquitoClass) {
		case 0:
			return 'mosquito1'
		case 1:
			return 'mosquito2'
		case 2:
			return 'mosquito3'
	}
}

function randomSide() {
	var mosquitoSide = Math.floor(Math.random() * 2)

	switch(mosquitoSide) {
		case 0:
			return 'sideA'
		case 1:
			return 'sideB'
	}
}

//extras
//Changing the cursor
var cursor = window.location.search
cursor = cursor.replace('?', '')

// Select the game cursor
if (cursor === 'raquete') {
	cursorClass = 'cursorRaquete'
} else if(cursor === 'mira') {
	cursorClass = 'cursorMira'
}