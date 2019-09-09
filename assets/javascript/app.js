$(document).ready(function () {

    // Global Variables
    var counter = 5;
    var currentQuestion = 0;
    var score = 0;
    var lost = 0;
    var timer;

    //Question Array
    var quizQuestions = [{
            question: "Where did the fairy Navi get her name?",
            choices: ["Navigate", "North American Vampire, Inc.", "Navel", "Navy"],
            correctAnswer: "Navigate"
        },

        {
            question: "What was Mario originally known as?",
            choices: ["Jumpman", "The Italian", "The Pipe Cleaner", "The Rescuer"],
            correctAnswer: "Jumpman"
        },

        {
            question: "What level is in every version of Super Mario Kart?",
            choices: ["Coco Mountains", "Dinosaur Island", "Luigi's Speedway", "Rainbow Road"],
            correctAnswer: "Rainbow Road"
        },

        {
            question: "What's the name of Zelda's alter ego in Ocarina of Time?",
            choices: ["Tetra", "Impa", "Sheik", "Malon"],
            correctAnswer: "Sheik"
        },

        {
            question: "Which classic game did Mario first appear in?",
            choices: ["Pong", "Galaxy Game", "Donkey Kong", "Pac Man"],
            correctAnswer: "Donkey Kong"
        },

    ];

    var winImages = [
        './assets/images/linkwin.gif',
        './assets/images/mariowin.gif'
    ];

    var lossImages = [
        './assets/images/bowserlose.gif',
        './assets/images/ganonlose.gif'
    ];


    // function to go to next question in currentQuestion array
    function nextQuestion() {

        // if there's no more questions the game is over
        var isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
        if (isQuestionOver) {
            console.log("Game is over!!!");
            // display results when game is over
            displayResult();
        }

        // if there's more questions it will go to the next one
        else {
            currentQuestion++;
            loadQuestion();
        }
    }

    // Start a timer for each question

    // ability to clear the timer
    function timeUp() {
        clearInterval(timer);

        // if the user doesn't answer their lost counter goes up
        lost++;

        // loads the next Question
        preloadImage('lost');
        setTimeout(nextQuestion, 3 * 1000);
    }

    // Counts the timer down and stops when it equals zero
    function countDown() {
        counter--;

        $('#time').html('Timer: ' + counter);

        if (counter === 0) {
            timeUp();
        }
    }

    //Display Questions and Choices in Browser
    function loadQuestion() {
        counter = 5;
        timer = setInterval(countDown, 1000);

        var question = quizQuestions[currentQuestion].question;
        var choices = quizQuestions[currentQuestion].choices;

        $('#time').html('Timer: ' + counter);
        $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
    }

    function loadChoices(choices) {
        var result = '';

        for (let i = 0; i < choices.length; i++) {
            result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
        }

        return result;
    }

    // Whenever an answer is clicked is it correct or incorrect?

    // Even Delegation (document meaning any element in the document with the class of choice)
    $(document).on('click', '.choice', function () {
        clearInterval(timer);
        // this, represents every element that we click on, every element that has the class of choice
        var selectedAnswer = $(this).attr('data-answer');
        var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

        if (correctAnswer === selectedAnswer) {
            score++;
            preloadImage('win');
            setTimeout(nextQuestion, 3 * 1000);
            //User wins
            console.log('Win!');
        } else {
            // User loses
            lost++;
            preloadImage('lost');
            setTimeout(nextQuestion, 3 * 1000);
            console.log('Lost!');
        }
        console.log("YAY!", selectedAnswer);
    });

    function displayResult() {
        //result page
        var result = `
            <p>You got ${score} question(s) right!</p>
            <p>You missed ${lost} question(s)!</p>
            <p>Total questions ${quizQuestions.length} question(s) right!</p>
            <button class="btn btn-primary" id="reset"> Reset Game</button>
        `;

        $('#game').html(result);
    }

    // reset game button
    $(document).on('click', '#reset', function () {
        counter = 5;
        currentQuestion = 0;
        score = 0;
        lost = 0;
        timer = null;

        loadQuestion();
        console.log('Testing');
    });

    // creates text to show user how many questions are remaining
    function loadRemainingQuestion() {
        var remainingQuestion = quizQuestions.length - (currentQuestion + 1);
        var totalQuestion = quizQuestions.length;

        return `Remaining Questions: ${remainingQuestion}/${totalQuestion}`;
    }

    //randomly generate an image and return it to the browser
    function randomImage(images) {
        var random = Math.floor(Math.random() * images.length);
        var randomImage = images[random];
        return randomImage;
    }

    // function to display you won/lost message with corresponding gif
    function preloadImage(status) {
        var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

        if (status === 'win') {
            $('#game').html(`
            <p class="preload-image">Congratulations, you picked the correct answer!</p>
            <p class="preload-image">The correct answer is ${correctAnswer}</p>
            <img src="${randomImage(winImages)}"/>
        `);
        } else {
            $('#game').html(`
            <p class="preload-image">Sorry, the correct answer was ${correctAnswer}</p>
            <p class="preload-image">Bwahahaha!</p>
            <img src="${randomImage(lossImages)}"/>
        `);
        }

    }

    // game won't start until start game button is clicked
    $('#start').click(function() {
        $('#start').remove();
        $('#time').html(counter);
        loadQuestion();
    });

});