// javascript code goes here
const container= document.getElementById("gameContainer");
const level=document.getElementById('level');
const arr=[];
let food;
let pixelId;
let time=100;
let length;
let tintrvl;
let direction='right';
let snakeContainer;
let snakeBody = [1,2,3,4,5];

const increaseSpeed = () => {
    time = time - 0.5 *(time > 50);
    clearInterval(tintrvl);
    tintrvl=setInterval(update,time);
}

function reset(){
    document.getElementById('over').style.display='none';
    arr.length=0;
    length=5;
    direction='right';
    crteGame();
}

function crteGame(){
    snakeBody=[1,2,3,4,5];
    container.innerHTML='';
    document.getElementById('pointsEarned').textContent=0;
    pixelId=5;
    
    for(let i=1;i<=2500;i++){
        const div=document.createElement("div");
        div.id="pixel"+i;
        div.className="pixel";
        arr.push(i);
        container.append(div);
    }
    
    snakeContainer=document.getElementsByClassName('pixel');
    arr.splice(pixelId-1,5);
    placeFood();
    document.getElementById(`pixel${food}`).className="food pixel";
    document.addEventListener("keydown", changeDirection);
    tintrvl=setInterval(update,time);
}
function placeFood() {
    const indx = Math.floor(Math.random() * (arr.length-1));
    food=arr[indx];
}
function update(){
    let isEaten=false;
    if(pixelId==food) {
        isEaten=true;
        length++;
        document.getElementById('pointsEarned').textContent=length-5;
        placeFood();
        document.getElementById(`pixel${food}`).className="food pixel";
        increaseSpeed();
    }
    
    if(direction=='left') {
        if(pixelId%50==1) pixelId=pixelId+49;
        else pixelId=pixelId-1;
        const pxl=document.getElementById(`pixel${pixelId}`);
            if(pxl.className.includes('snakeBodyPixel')) {
                gameOver();
                return;
            }
        snakeBody.push(pixelId);
    }
    if(direction=='up'){
        if(pixelId>=1 && pixelId<=50) pixelId=pixelId+2450;
        else pixelId=pixelId-50;
        const pxl=document.getElementById(`pixel${pixelId}`);
        if(pxl.className.includes('snakeBodyPixel')) {
            gameOver();
            return;
        }
        snakeBody.push(pixelId);
    }
    if(direction=='down'){
        if(pixelId>=2451 && pixelId<=2500) pixelId=pixelId-2450;
        else pixelId=pixelId+50;
        const pxl=document.getElementById(`pixel${pixelId}`);
        if(pxl.className.includes('snakeBodyPixel')) {
            gameOver();
            return;
        }
        snakeBody.push(pixelId);
    }
    if(direction=='right'){
        if(pixelId%50==0) pixelId=pixelId-49;
        else pixelId=pixelId+1;
        const pxl=document.getElementById(`pixel${pixelId}`);
        if(pxl.className.includes('snakeBodyPixel')) {
            gameOver();
            return;
        }
        snakeBody.push(pixelId);
    }

    for(const ele of snakeContainer){
        if(ele.className.includes('food')) ele.className='food pixel';
        else ele.className="pixel";
    }
        
    for(let i=0;i<snakeBody.length;i++){
        if(i===snakeBody.length-1) snakeContainer[snakeBody[i]-1].className="front pixel";
        else snakeContainer[snakeBody[i]-1].className="snakeBodyPixel pixel";
    }

    if(!isEaten) arr.push(snakeBody.shift()); 
    const index=arr.indexOf(pixelId);
    arr.splice(index,1);
}
function changeDirection(e) {
    if (e.code == "ArrowUp" && direction!='down') {
        direction='up';
    }
    else if (e.code == "ArrowDown" && direction!='up') {
        direction='down';
    }
    else if (e.code == "ArrowLeft" && direction!='right' ) {
        direction='left';
    }
    else if (e.code == "ArrowRight" && direction!='left') {
        direction='right';
    }
}

function gameOver(){
    clearInterval(tintrvl);
    document.getElementById('over').style.display='block';
}

document.getElementById('start').addEventListener('click',start);
function start(){
    level.blur();
    time=parseInt(level.value);
    clearInterval(tintrvl);
    reset();
}

level.addEventListener('change',start);
reset();