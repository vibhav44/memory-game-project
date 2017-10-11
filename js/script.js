//all the global variables used in the code
var array=["!","@","#","$","^","&","*","?","!","@","#","$","^","&","*","?"];
var symbolArray=["!","@","#","$","^","&","*","?"];
var symbolName=["exclamation","at","hash","dollar","power","and","star","question"];
var symbolFile;
var gameSecs;
var gameMins;
var TotalSecs;
var noOfStars;
var moves;
var matchedCardsNo=[];
var openCards=[];
var cycle;
$(document).ready(function () {
  array=shuffle(array);              //array containing the symbols is shuffled before start of each game
  moves=0;
  noOfStars=3;
  //this function is called to set the timer
  setTime();

//this function is called whenever a tile is clicked
$(".square").click(function(){
      flipOpen(this);
  });

  //if this function is envoked, game is restarted
  $("#restart").click(function(){
      window.location.reload();
  });
});

//this function flips open the unmatched card
function flipOpen(obj) {
  var TileId=obj.id;
  if(!match(TileId,matchedCardsNo)){
    if(openCards.length==0){
      ++moves;
      openCards.push(TileId);
    }else if(openCards.length==1){
      if(TileId!=openCards[0]){
        openCards.push(TileId);
        ++moves;
        var y1=openCards[0];
        var y2=openCards[1];
        if(array[y1]==array[y2]){
          matchedCardsNo.push(openCards[0]);
          matchedCardsNo.push(openCards[1]);
          openCards.length=0;
      }
    }
  }else if(openCards.length==2 &&(TileId!=openCards[0] && TileId!=openCards[1])){
      moves++;
      flipBack(openCards[0],openCards[1]);
      openCards.length=0;
      openCards.push(TileId);

  }

  var x1="#"+TileId;
  symbolFile=searchSymbol(TileId);
  var fileName="img/"+symbolName[symbolFile]+".png";
  $(x1).css("background-image","url("+fileName+")");

}
  $("#movecount").html(moves);
  if(matchedCardsNo.length==16){
    alert("Congratulations !!!! You have completed the game.\nTime taken :"+countSecs+"\nTotal moves : "+moves+"\nStars : "+noOfStars);
    var ans=confirm("play again");
    if(ans){
      window.location.reload();
    }else{
      clearInterval(cycle);
    }
  }
}

//function which shuffles the array containing symbols
function shuffle() {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//this function searches the index of the tile so as to find its filename
function searchSymbol(TileId){
  for(var i=0;i<symbolArray.length;i++){
    if(symbolArray[i]==array[TileId]){
      return i;
    }
  }
}

//this function sets the time at the start of the game and calls for updating the timer
function setTime() {
      $("#timer").html("00 : 00");
      timeSecs=0;
      timeMins=0;
      countSecs=0;
      moves=0;
      cycle=setInterval(updateGame,1000);
}

//this function updates the star rating and calls for correct time updation
function updateGame() {
  if(moves<=20)
    noOfStars=3;
  else if(moves<=30)
    noOfStars=2;
  else
    noOfStars=1;

  var starInsert=$("#stars").html(noOfStars+" Stars");

  ++countSecs;
  timeSecs=updateTime(countSecs%60);
  timeMins=updateTime(parseInt(countSecs/60));
  $("#timer").html(timeMins+" : "+timeSecs);
}

//this function fetches correct time format
function updateTime(t){
  var tempTime=t+"";
  if(tempTime.length==2)
    return tempTime;
  return "0"+tempTime;
}

//this function flips back the unmatched cards
function flipBack(t1,t2) {
    var temp1="#"+t1;
    var temp2="#"+t2;
    var imgName="img/TileIcon.jpg";
    $(temp1).css("background-image","url("+imgName+")");
    $(temp2).css("background-image","url("+imgName+")");
}

//this function checks if selected card is already matched
function match(TileId) {
    var i;
    for(i=0;i<matchedCardsNo.length;i++){
      if(matchedCardsNo[i]==TileId)
        return true;
    }
    return false;
}
