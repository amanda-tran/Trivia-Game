var game = {
  questions: [
    {
      text:
        "How does Harry manage to breathe underwater during the second task of the Triwizard Tournament?",
      options: [
        "He transforms into a shark",
        "He kisses a mermaid",
        "He eats Gillyweed",
        "He performs a special spell"
      ],
      answer: "He eats Gillyweed"
    },
    {
      text: "What is the name of Fred and George's joke shop?",
      options: [
          "Weasley Joke Emporium",
          "Weasleys' Wizard Wheezes",
          "Fred and George's Wonder Emporium",
          "Zonko's Joke Shop",
      ],
      answer: "Weasleys' Wizard Wheezes",
    },
    {
        text: "Who guards the entrance to the Gryffindor common room?",
        options: [
            "The grey lady",
            "The fat friar",
            "The bloody baron",
            "The fat lady",

        ],
        answer: "The fat lady",
    },
    {
        text: "What does the spell Obliviate do?",
        options: [
            "Destroys objects",
            "Sends someone to another realm",
            "Removes a part of someone's memory",
            "Makes objects invisible",

        ],
        answer: "Removes a part of someone's memory",
    },
    {
        text: "What does one say to close Marauder's Map and make it blank again?",
        options: [
            "Mischief Managed",
            "Nothing to see here",
            "All done",
            "Abra Kadabra",
        ],
        answer: "Mischief Managed",
    },
  ],
  currentQuestion: 0,
  timeLeft: '',
  timeLimit: 20,
  score: {
      correct: 0,
      wrong: 0,
      unanswered: 0
  },
  clock: ''
};




$('document').ready(function () {

    $('#start').click(function (e) {
        e.preventDefault();
        $('.intro').hide();
        $('.game').show();
        nextQuestion();
    });

    $(document).on('click', '.option', function (e) {
        e.preventDefault();
        if ($(this).data('correct') === true) {
            game.score.correct++;
        } else {
            game.score.wrong++;
        }
        $('.option').data('correct', '');
        showAnswers();
    });

});

function nextQuestion() {

    update();
    game.timeLeft = game.timeLimit;
    var question = game.questions[game.currentQuestion];
    $('#questions').empty();
    $('#questions').append(`
    <div class="question">
      <h2>${question.text}</h2>
    </div>
  `);

    $.each(question.options, function (index, option) {
        if (question.answer === option) {
            $('.question').append(`
        <button class="option" data-correct="true">${option}</button>
      `);
        } else {
            $('.question').append(`
        <button href="#" class="option" data-correct="false">${option}</button>
      `);
        }
    });

   game.clock = setInterval(function () {
        update();
        if (game.timeLeft <= 1) {
            clearInterval(game.clock);
            showAnswers();
            console.log('cleared interval')
        } else {
            game.timeLeft--;
        }
    }, 2000);

}

function update() {
    $('.correct span').text(game.score.correct);
    $('.wrong span').text(game.score.wrong);
    if (questionsLeft <= 0) {
        // games over
        clearInterval(game.clock);
    } else {
        var questionsLeft = (game.questions.length + 1) - (game.currentQuestion + 1);
    }
    $('.questions-left span').text(questionsLeft);
    $('.time-left span').text(game.timeLeft);

}

function showAnswers() {
    $('[data-correct="false"]').addClass('wrong');
    $('[data-correct="true"]').addClass('correct');
    setTimeout(function () {
        game.currentQuestion++;
        nextQuestion();
    }, 1000);
}