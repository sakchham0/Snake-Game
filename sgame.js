var blockSize = 30;
var rows = 20;
var cols = 20;
var board;
var context;
// snake head
var snakex= blockSize* 5;
var snakey = blockSize* 5;

var velocityx =0;
var velocityy =0;

var snakeBody =[];

var foodx;
var foody ;

var gameOver = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows* blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update,2000/10);
}
function update(){ 

    if(gameOver){
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);
    
    context.fillStyle ="red";
    context.fillRect(foodx, foody, blockSize, blockSize);

     if(snakex == foodx && snakey == foody){
        snakeBody.push([foodx, foody]);
        placeFood();   
     }
     for( let i= snakeBody.length-1;i>0;i--){
        snakeBody[i] =snakeBody[i-1];
     }
     if(snakeBody.length){
        snakeBody[0] = [snakex,snakey];
     }

    context.fillStyle="lime";
    snakex+= velocityx * blockSize;
    snakey+= velocityy * blockSize;
    context.fillRect(snakex, snakey, blockSize, blockSize);
    
    for(let i=0;i< snakeBody.length;i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
      
       if(snakex <0 || snakex> cols*blockSize || snakey< 0 || snakey > rows*blockSize){
        gameOver = true;  
        alert("Game Over, refresh to play again");
       }
        for(let i=0; i<snakeBody.length; i++){
            if(snakex == snakeBody[i][0] && snakey == snakeBody[i][1]){
                gameOver = true;
                alert("Game Over");
            }
        }
   }

function changeDirection(e) {
    if(e.key == "ArrowUp" && velocityy !=1){
        velocityx = 0;
        velocityy = -1;
    }
    else if (e.key == "ArrowDown" && velocityy != -1){
        velocityx = 0;
        velocityy = 1;
    }
    else if (e.key == "ArrowLeft" && velocityx != 1){
        velocityx = -1;
        velocityy = 0;
    }
    else if (e.key == "ArrowRight" && velocityx != -1){
        velocityx = 1;
        velocityy = 0;
    }
    
    
    
}
 function placeFood(){
     foodx = Math.floor(Math.random()* cols)*blockSize;
     foody = Math.floor(Math.random()* cols)*blockSize;


 }