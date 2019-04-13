/*
 * Create a list that holds all of your cards
 */
let AllCards = ["fa-diamond","fa-diamond", 
"fa-paper-plane", "fa-paper-plane",
 "fa-anchor", "fa-anchor", 
 "fa-bolt","fa-bolt",
 "fa-cube","fa-cube",
  "fa-leaf","fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"];


let seconds = 0; 
let minutes = 0; 
let timer;
let moves = 0; // counts moves
let NumOfmatch = 0; // counts the number of matched cards
let NumOfStars = $(".stars li").length;
let openCards = []; // stores the opend cards
let matchedCards = []; // stores the matched cards
let stars = 3;
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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



function CardHtml() {
	shuffle(AllCards)
	AllCards.forEach(function(card) {
		let cardElement = '<li class="card"><i class="fa ' + card + '"></i></li>'; 
		$('.deck').append(cardElement);
	});
}





function openCard() {
	$('.card').click(function () { // add open show to open the card when clicked
		if ($( this ).hasClass('open show') || openCards.length == 2 || $( this ).hasClass('match')) {
			return;
		} if (openCards.length <= 2) {
			flippedCard = $( this ).addClass('open show');
			openCards.push(flippedCard.children().attr('class')); //  store it in the openCards list.
			 checkCards(openCards); 
		}
	});
}


function NoMatch() {
	setTimeout(function() { 
		openCards.splice(0,2); // Removes the cards 
		$('.card').removeClass('open show');  // flip the cards back.
	}, 500);//set time before flipping back
}


function  checkCards() { // checks if the opened cards match

	if (openCards.length > 1) {	
		firstCard = openCards[0];
		secondCard = openCards[1];
		MovesCounter();
		if (firstCard === secondCard) { 
			matchedCards.push(firstCard, secondCard); // puts the matched cards in a new list
			openCards.splice(0,2); // removes it from the openCards list
			NumOfmatch ++; // increment the amount of matche cards.
			$('.card.open').addClass('match');
			clicked = 0;
		} else {
			NoMatch();
		}
	if (NumOfmatch == 8) { //You win the game when all matches have been found
		
    $('#win').show();
    $('.finalStars').text(`${NumOfStars}`);
    $('.finalTimerSec').text(`${seconds}`);
	$('.finalTimerMin').text(`${minutes}`);
    $("#restart").on('click', function () {
			$("#win").hide();
			restartAfterWin();

	});
			clearInterval(timer);
			
		}
	}
}


function Timer() {
	// Starts the time after first click.
	$('.deck').one("click", function() {
		timer = setInterval(gameTimer, 1000);
	});
}


function gameTimer() {
	// counts the time 
	seconds ++;
	$(".timer").html(minutes + "m " + seconds + "s");
    
    if (seconds === 60) {
		minutes++;
		seconds = 0;
	}}


function Restart() {
	//restart when clicking on the restatr icon
	$(".restart").click(function() {
		$(".card").remove();
		CardHtml();
		openCard();
		clearInterval(timer);
        //set ll the counts back to zero
        moves = 0;
		NumOfmatch = 0;
		seconds = 0;
		minutes = 0;
		clicked = 0;
		Timer();
		$(".card").removeClass('match');
		$(".card").removeClass('open show');
		$(".timer").html(minutes + "m " + seconds + "s");
		$(".moves").html(moves);
		
		AddStar();
		openCards = [];
	});
}

function MovesCounter() {
	moves++;//increase move
	$('.moves').html(moves);
    
    if (moves === 6) { //remove star after 6 moves
		NumOfStars -= 1;
		$(".stars li").eq(0).remove();
	} else if (moves === 12) {
		NumOfStars -= 1;
		$(".stars li").eq(0).remove();
	}
}

function AddStar(){
	while (NumOfStars < 3) { // Adding the stars back in the star-rating.
		$(".stars").append('<li><i class="fa fa-star"></i></li>');
		NumOfStars++;
}
}



function restartAfterWin() {
	// restart game from modal.
	$(".playAgain").click(function(){
	clearInterval(timer);
	moves = 0;
	NumOfmatch = 0;
	seconds = 0;
	minutes = 0;
	clicked = 0;
	stars = 3;
	Timer();

	$(".card").removeClass('match');
	$(".card").removeClass('open show');
	$(".timer").html(minutes + "m " + seconds + "s");
	$(".moves").html(moves);
	AddStar();
	openCards = [];
	});
}








	CardHtml();
	Timer();
	openCard();
	Restart();
	

