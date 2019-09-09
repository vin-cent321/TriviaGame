$(document).ready(function () {

    // Global Variables
    var counter = 30;
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

    //Display Questions and Choices in Browser
    function loadQuestion() {
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

    loadQuestion();

});