var mainScreen;

var gameScreen;

var counter = 30;

var questionArray = ["What did the Beatles receive for performing three times on The Ed Sullivan Show?", 
"What was the No. 1 song on Billboard's charts on Feb. 1, 1964, a week before the Beatles appeared on The Ed Sullivan Show?",
 "What was the first song that the Beatles performed live for an audience in America?",
  "Who sent a congratulatory telegram to the Beatles before that first performance?",
  "How much did a front-row ticket to the Beatles' first concert in America cost?", 
  "What item was stolen from Ringo while in New York for their first concert there in August?", 
  "The Beatles performed a regular set of songs (give or take a few) while on their North American tour in the summer of 1964. Which of the following was not in the set?",
  "Their North American tour set a record as they zigzagged 22,621 miles across the continent in a little over a month. Roughly how many people saw the Beatles on that tour?"];

var answerArray = [["$100,000", "$50,000", "$10,000", "$5,000"], ["I Want to Hold Your Hand","She Loves You","Love Me Do","I Get Around"], ["I Want to Hold Your Hand", "All My Loving", "Help!", "Can't Buy Me Love"], ["President Lyndon Baines Johnson","Queen Elizabeth II","Bob Dylan","Elvis Presley"], ["$4", "$6", "$8.50", "$12.50"], ["His passport","His St. Christopher Medal","His drumsticks","His autographed photo of Ed Sullivan"], ["A Hard Day's Night", "Roll Over Beethoven", "Yesterday", "If I Fell"], ["25,000","59,000","209,000","454,000"]];

var imageArray = ["<img class='center-block img-right' src='assets/images/Beatles1.gif'>", "<img class='center-block img-right' src='assets/images/Beatles2.gif'>", "<img class='center-block img-right' src='assets/images/Beatles3.gif'>", "<img class='center-block img-right' src='assets/images/Beatles4.gif'>", "<img class='center-block img-right' src='assets/images/Beatles5.gif'>", "<img class='center-block img-right' src='assets/images/Beatles6.gif'>", "<img class='center-block img-right' src='assets/images/Beatles7.gif'>", "<img class='center-block img-right' src='assets/images/Beatles8.gif'>"];

var musicArray = [new Audio("assets/music/LoveMeDo.mp3"), new Audio("assets/music/IWanttoHoldYourHand.mp3"), new Audio("assets/music/You've_Got_To_Hide_Your_Love_Away.m4a"), new Audio("assets/music/Help.mp3"), new Audio("assets/music/SheLovesYou.mp3"), new Audio("assets/music/YellowSubmarine.m4a"), new Audio("assets/music/Yesterday.mp3"), new Audio("assets/music/SgtPeppersLonelyHeartsClub.m4a")];

var correctArray = ["C. $10,000", "A. I Want to Hold Your Hand", "B. All My Loving", "D. Elvis Presley", "A. $4", "B. His St. Christopher Medal", "C. Yesterday", "D. 454,000"];

var questionCounter = 0;

var userSelection;

var theTimer;

var correctCounter = 0;

var incorrectCounter = 0;

var unansweredCounter = 0;
 


$(document).ready(function() {

// creates the Starter screen and button 

function newScreen() {

//clickSound.play();	// Plays the song

mainScreen = "<p class='text-center start-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></pDisplay>";

$(".mainPage").html(mainScreen);

} // newScreen


newScreen(); // Display the Starter page


$("body").on("click", ".start-button", function(event){
  
//generateScreen() is triggered by the start button.  
generateScreen(); // Display the Starter Page

setTimer(); // Set the timer

}); // start-button


$("body").on("click", ".answer", function(event){

userSelection = $(this).text(); // Log the user's answer

if(userSelection === correctArray[questionCounter]) {

clearInterval(theTimer); // Clear the timer

userWin(); // If the user guesses the right answer

} else {

//alert("wrong answer!");

clearInterval(theTimer); // Clear the timer

userLoss(); // If the user guesses the wrong answer

}

}); //.answer 



$("body").on("click", ".reset-button", function(event){

resetGame(); // reset the game

}); // reset-button 

}); // Closes (document).ready



function LossbyTimeout() { // If the user doesn't make a guess by the time the timer runs out

unansweredCounter++; // increase the counter

gameScreen = "<p class='text-center timer1'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time! The correct answer was: " + correctArray[questionCounter] + "</p>" + "<img class='center-block x-image' src='assets/images/x.png'>";

$(".mainPage").html(gameScreen);

setTimeout(wait, 10000); // change to 10000 to allow the screen to stay displayed for the user

} //  LossbyTimeout



function userWin() { // If the user guesses the correct answer

correctCounter++; // increase the counter

gameScreen = "<p class='text-center timer1'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctArray[questionCounter] + "</p>" + imageArray[questionCounter];

$(".mainPage").html(gameScreen);

setTimeout(wait, 10000); // change to 10000 to allow the screen to stay displayed for the user

} // userWin



function userLoss() { // If the user guesses the wrong answer, display a big red 'X' mark.

incorrectCounter++; // Increase the counter

gameScreen = "<p class='text-center timer1'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctArray[questionCounter] + "</p>" + "<img class='center-block x-image' src='assets/images/x.png'>";

$(".mainPage").html(gameScreen);

setTimeout(wait, 10000); // change to 10000 to allow the screen to stay displayed for the user

} // userLoss



function generateScreen() { // Display the screen with a new question and multiple answers

musicArray[questionCounter].load(); // load the song for the page

musicArray[questionCounter].play(); // play the song for the page

gameScreen = "<p class='text-center timer1'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='user-choice answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";

$(".mainPage").html(gameScreen);

} // generateScreen



function wait() {

if (questionCounter < 7) { // Still more questions to ask

musicArray[questionCounter].pause(); // Stop the song

questionCounter++;

generateScreen(); // Go to the next question

counter = 30; // Start counter at 30

setTimer(); // Countdown the time

} // wait

else { // Go to last screen when all the questions have been asked

lastScreen(); // Post the total scores on the last page

} // else

} // if questionCounter



function setTimer() { // Start the timer

	theTimer = setInterval(countDown, 1000);

	function countDown() {

		if (counter === 0) {

		clearInterval(theTimer);

		LossbyTimeout(); // Timed out before user chooses an answer

		} // Counter === 0

		if (counter > 0) {

		counter--; // Decrease the counter by 1

		} // Counter > 0

		$(".timer").html(counter);
	} // countDown
} // setTimer



function lastScreen() { // Last screen displays user's total scores

counter = 0; // reset the counter to 0

gameScreen = "<p class='text-center timer1'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Here are your total scores:" + "</p>" + "<p class='correct-answers'>Correct Answers: " + correctCounter + "</p>" + "<p>Wrong Answers: " + incorrectCounter + "</p>" + "<p>Unanswered Questions: " + unansweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Restart The Quiz</a></p>";

$(".mainPage").html(gameScreen);

} // lastScreen



function resetGame() { // Reset the game

musicArray[questionCounter].pause(); // Stop the song

questionCounter = 0;

correctCounter = 0;

incorrectCounter = 0;

unansweredCounter = 0;

counter = 30;

generateScreen();

setTimer();

} // resetGame




