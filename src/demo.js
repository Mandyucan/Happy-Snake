//点击开始游戏--> startPage消失--> 游戏开始
//随机出现食物，出现三节蛇开始运动
//上下左右键--> 改变运动方向
//判断吃到食物--> 食物消失,蛇加1
//判断游戏结束，弹出得分框


var content = document.getElementsByClassName('content')[0];
var startPage = document.getElementsByClassName('startPage')[0];
var scoreBox = document.getElementById('score');
var lose = document.getElementsByClassName('loser')[0];
var loserScore = document.getElementsByClassName('loserScore')[0];
var close = document.getElementsByClassName('close')[0];
var startP = document.getElementById('startP');
var startBtn = document.getElementsByClassName('startBtn')[0];
var snakeMove;
var speed = 300;
var startGameBool = true;
var startPauseBool = true;
//初始化函数，存储参数，如 地图的大小宽高。食物的宽高等；
init();

function init() {
	//地图属性
	this.mapW = parseInt(getComputedStyle(content).width);
	this.mapH = parseInt(getComputedStyle(content).height);
	this.mapDiv = content;

	//食物属性
	this.foodW = 20;
	this.foodH = 20;
	this.foodX = 0;
	this.foodY = 0;

	//蛇 
	this.snakeW = 20;
	this.snakeH = 20;
	this.snakeBody = [
		[3, 1, 'head'],
		[2, 1, 'body'],
		[1, 1, 'body']
	];

	//游戏属性
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	this.score = 0;
	bindEvent();

}

function startGame() {
	startPage.style.display = 'none';
	startP.style.display = 'block';
	food();
	snake();
}

//随机生成食物
function food() {
	var food = document.createElement('div');
	food.style.width = this.foodW + 'px';
	food.style.height = this.foodH + 'px';
	food.style.position = 'absolute';
	this.foodX = Math.floor(Math.random() * (this.mapW / 20));
	this.foodY = Math.floor(Math.random() * (this.mapH / 20));
	food.style.left = this.foodX * 20 + 'px';
	food.style.top = this.foodY * 20 + 'px';
	this.mapDiv.appendChild(food).setAttribute('class', 'food');
	// console.log('W:' + (this.mapW));
	// console.log('H:' + (this.mapH));
	// console.log('x:' + (food.style.left));
	// console.log('y:' + (food.style.top));

	// console.log(this.foodY);
}

//生成蛇
function snake() {
	var len = this.snakeBody.length;
	for (var i = 0; i < len; i++) {
		var snake = document.createElement('div');
		snake.style.width = this.snakeW + 'px';
		snake.style.height = this.snakeH + 'px';
		snake.style.position = 'absolute';
		snake.style.left = this.snakeBody[i][0] * 20 + 'px';
		snake.style.top = this.snakeBody[i][1] * 20 + 'px';
		snake.classList.add(this.snakeBody[i][2]);
		this.mapDiv.appendChild(snake).classList.add('snake');
		switch (this.direct) {
			case 'right':
				break;
			case 'up':
				snake.style.transform = 'rotate(270deg)';
				break;
			case 'left':
				snake.style.transform = 'rotate(180deg)';
				break;
			case 'down':
				snake.style.transform = 'rotate(90deg)';
				break;
			default:
				break;
		}
	}
}

function move() {
	var len = this.snakeBody.length;
	for (var i = len - 1; i > 0; i--) { //从末尾开始往前循环，蛇尾
		this.snakeBody[i][0] = this.snakeBody[i - 1][0];
		this.snakeBody[i][1] = this.snakeBody[i - 1][1];
	}
	switch (this.direct) {
		case 'right':
			this.snakeBody[0][0] += 1;
			break;
		case 'up':
			this.snakeBody[0][1] -= 1;
			break;
		case 'left':
			this.snakeBody[0][0] -= 1;
			break;
		case 'down':
			this.snakeBody[0][1] += 1;
			break;
		default:
			break;
	}
	// console.log(this.direc);
	removeClass('snake');
	snake();
	if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
		//最后一节的位置
		var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
		var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
		switch (this.direct) {
			case 'right':
				this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
				break;
			case 'up':
				this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
				break;
			case 'left':
				this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
				break;
			case 'down':
				this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
				break;
			default:
				break;
		}
		this.score += 10;
		scoreBox.innerHTML = this.score;
		removeClass('food');
		food();
	}
	//判断失败情形
	//蛇头X、Y
	if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
		reloadGame();
	}
	if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
		reloadGame();
	}
	//蛇头碰到蛇身
	var snakeHeadX = this.snakeBody[0][0];
	var snakeHeadY = this.snakeBody[0][1];
	for (var i = 1; i < this.snakeBody.length; i++) {
		if (snakeHeadX == snakeBody[i][0] && snakeHeadY == snakeBody[i][1]) {
			reloadGame();
		}
	}
}

//游戏结束时，重新加载函数
function reloadGame() {
	removeClass('snake');
	removeClass('food');
	clearInterval(snakeMove);
	this.snakeBody = [
		[3, 1, 'head'],
		[2, 1, 'body'],
		[1, 1, 'body']
	];
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	lose.style.display = 'block';
	loserScore.innerHTML = this.score;
	scoreBox.innerHTML = this.score;
	this.score = 0;
	startGameBool = true;
	startPauseBool = true;
	startP.setAttribute('src', './src/imgs/start.png');
}


//删除当前具有className的元素,目的在于再渲染一条新的蛇
function removeClass(className) {
	var ele = document.getElementsByClassName(className);
	while (ele.length > 0) {
		ele[0].parentNode.removeChild(ele[0]);
	}
}


//通过asc码判断方向
function setDirection(code) {
	switch (code) {
		case 37: //左
			if (this.left) {
				this.direct = 'left';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 38: //上
			if (this.up) {
				this.direct = 'up';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		case 39: //右
			if (this.right) {
				this.direct = 'right';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 40:
			if (this.down) {
				this.direct = 'down';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		case 32:
				startAndPause();
				break;
		default:
			break;
	}
}
//监听键盘事件
function bindEvent() {
	close.onclick = function() {
		lose.style.display = 'none';
		// startAndPause();
	}
	//控制整个游戏的开始与暂停
	startBtn.onclick = function() {
		startAndPause();
	}
	startP.onclick = function() {
		startAndPause();
	}
}

function startAndPause() {
	if (startPauseBool) {
		if (startGameBool) {
			startGame();
			startGameBool = false;
		}
		startP.setAttribute('src', './src/imgs/pause.png');
		document.onkeydown = function(e) {
			var code = e.keyCode //asc码
			setDirection(code); //37  38  39  40
		}
		snakeMove = setInterval(function() {
			move();
		}, speed);

		startPauseBool = false;
	} else {
		startP.setAttribute('src', './src/imgs/start.png');
		clearInterval(snakeMove);
		document.onkeydown = function(e) {
			e.returnValue = false;
			return false;
		}
		startPauseBool = true;
	}
}
