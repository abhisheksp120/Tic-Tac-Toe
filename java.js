var squares = document.querySelectorAll('.sel');
var p1s = document.querySelector("#p1s");
var p2s = document.querySelector("#p2s");
var res = document.getElementById('#reset');
var an1 = document.getElementById('player1');
var an2 = document.getElementById('player2');


var arr = [];
var points = [[0,0,0],[0,0,0],[0,0,0]];
var turn = 0,player1score = 0, player2score = 0, won = 0;

for(var i = 0; i < squares.length ; i++){
	arr.push(0);
	squares[i].addEventListener("click", function(){
		var index = this.id -1;
		if(turn == 0 && arr[index] == 0&&won==0){
			this.classList.add("cross");
			arr[index] = 1;
			var x = Math.floor(index/3);
			var y = index%3;
			points[x][y] = 1;
			turn = 1;
			if(checkWinner(x, y)){
				player1score++;
				p1s.textContent = player1score;
				won = 1;
				turn = 0;
				wait_terminate(an1);
			}
		}
		else{
			if(turn == 1 && arr[index] == 0&&won==0){
				this.classList.add("circle");
				arr[index] = 1;
				var x = Math.floor(index/3);
				var y = index%3;
				points[x][y] = -1;
				turn = 0;
				if(checkWinner(x, y)){
					player2score++;
					p2s.textContent = player2score;
					won = 1;
					turn = 1;
					wait_terminate(an2);	
				}
			}
		}
		if(won == 0)
			check_done();
	});
}

function wait_terminate(an){

	animate(an);

	var cnt = 0;
	var terminate = setInterval(function(){
		if(cnt==2){
			newreset();
			clearInterval(terminate);
		}
		cnt++;
	},1000);
}

function animate(an){
	an.classList.add('ani');
	var colors = ["steelblue","white"];
	var i = 0,cnt=0;
	var value = setInterval(function(){
		an.style.cssText = "background-color: " + colors[i];
		cnt++;
		i++;
		if(i==2){
			i = 0;
		}
		if(cnt==4)
			clearInterval(value);
	},500);
	
}

function check_done(){
	var count = 0;
	for(var i=0; i<3;i++){
		count += (points[i][0]==0) +(points[i][1]==0)+ (points[i][2]==0);
	}
	if(count == 0&& won == 0){
		var cnt=0;
		var ch = setInterval(function(){
			if(cnt==1){
				newreset();
				clearInterval(ch);
			}
			cnt++;
			if(cnt==1)
				alert("Match Draw")
		},1000);
	}
}

reset.addEventListener("click",function(){
	player1score = 0, player2score = 0;
	p1s.textContent = 0;
	p2s.textContent = 0;
	turn = 0;
	newreset();
});

function newreset(){
	won = 0;
	arr = [0,0,0,0,0,0,0,0,0];
	points = [[0,0,0],[0,0,0],[0,0,0]];
	for(var i=0;i<squares.length;i++){
		squares[i].classList.remove('final');
		squares[i].classList.remove('cross');
		squares[i].classList.remove('circle');
	}
}

var todo = [];

function changed(i, j, flag){
	if(flag)
		todo.push(3*i+j);
	else
		todo = [];
}

function doit(){
	for(var i=0;i<todo.length;i++)
		squares[todo[i]].classList.add('final');
}

function checkWinner(x, y){
	var hor_cnt = 0, ver_cnt = 0, tar = points[x][y];
	var i = x, j = x+1, l = y, r = y+1;
	while(i>=0&&points[i][y]==tar){
		changed(i, y, 1);
		ver_cnt++,i--;
	}
	while(j<3&&points[j][y]==tar){
		changed(j, y, 1);
		ver_cnt++,j++;
	}
	if(ver_cnt == 3){
		doit();
		return true;
	}
	changed(-1, -1, 0);

	while(l>=0&&points[x][l]==tar){
		changed(x, l, 1);
		hor_cnt++,l--;
	}
	while(r<3&&points[x][r]==tar){
		changed(x, r, 1);
		hor_cnt++,r++;
	}
	if(hor_cnt == 3){
		doit();
		return true;
	}
	changed(-1, -1, 0);

	hor_cnt = 0, i=x,j=y;
	while(i>=0&&j>=0&&points[i][j]==tar){
		changed(i, j, 1);
		hor_cnt++,i--,j--;
	}
	i=x+1,j=y+1;
	while(i<3&&j<3&&points[i][j]==tar){
		changed(i, j, 1);
		hor_cnt++,i++,j++;
	}
	if(hor_cnt==3){
		doit();
		return true;
	}
	changed(-1, -1, 0);

	ver_cnt=0,l=x,r=y;
	while(l>=0&&r<3&&points[l][r]==tar){
		changed(l, r, 1);
		ver_cnt++,l--,r++;
	}
	l=x+1,r=y-1;
	while(l<3&&r>=0&&points[l][r]==tar){
		changed(l , r, 1);
		ver_cnt++,l++,r--;
	}
	if(ver_cnt==3){
		doit();
		return true;
	}
	changed(-1, -1, 0);

	return false;
}