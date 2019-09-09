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
            choices: ["Coco Mountains", "Dinosaur Island", "Luigi's Speedway", "Raibow Road"],
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

    // function to go to next question in currentQuestion array
    function nextQuestion() {

        // if there's no more questions the game is over
        var isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
        if (isQuestionOver) {
            console.log("Game is over!!!");
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
        nextQuestion();
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
        // this, represents every element that we click on, every element that has the class of choice
        var selectedAnswer = $(this).attr('data-answer');
        console.log("YAY!", selectedAnswer);
    });

    loadQuestion();

});