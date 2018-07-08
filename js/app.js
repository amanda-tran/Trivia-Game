/* Initial Variables */
var questions = [
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
];

var game = {
  currentQuestion: 0,
  timeLeft: 15,
  timeLimit: 15,
  questionsLeft: 0,
  score: {
    correct: 0,
    incorrect: 0
  }
};
var intervalId;


/* Main Code */
$(document).ready(function() {
  // handle game start
  $('#start').click(function(e) {
    e.preventDefault();
    // hide and show intro/game
    $('.intro').hide();
    $('.game').show();

    // render the question and start the game
    renderQuestion();

    // handles game restart
    $('#restart').click(function(e) {
      e.preventDefault();
      restart();
      $('.results').hide();
      $('.game').show();
      renderQuestion();
    });
  })
});

// handle rendering of new questions
function renderQuestion() {
  // update to keep dom in sync
  update();

  if(game.questionsLeft === 0) {
    // show results
    $('.game').hide();
    $('.results').show();
  } else {
    // set time limit
    game.timeLeft = game.timeLimit;

    // start timer
    intervalId = setInterval(function() {
      // this update it to render the timer
      update();
      // check how much time is left
      if(game.timeLeft < 1) {
        // no more time left show answers
        game.score.incorrect++;
        clearInterval(intervalId);
        showAnswers();

      } else {
        // deincrement time
        game.timeLeft--
      }
    
    }, 1000);

    // grab the question out of the question array with the current question index
    var question = questions[game.currentQuestion];
    // make sure div is empty and append to dom
    $('#question').empty();
    // back ticks to allow variables in text
    $('#question').append(`
      <div class="question">
        <h2>${question.text}</h2>
      </div>
    `);

    // iterate over options
    question.options.forEach(function(option) {
      // check if the answer is the correct one
      if(question.answer === option) {
        // matches
        $('.question').append(`
          <button class="option" data-correct="true" onclick="optionClick(this)">${option}</button>
        `);
      } else {
        // doesnt match
        $('.question').append(`
          <button class="option" data-correct="false" onclick="optionClick(this)">${option}</button>
        `);
      }
    });
  }
}

// show incorrect answers and correct answers 
function showAnswers() {
  // stop user from clicking on results
  $('.option').removeAttr('onclick');

  $('[data-correct="false"]').addClass('incorrect');
  $('[data-correct="true"]').addClass('correct');
  // wait 2 second before starting new question
  setTimeout(function() {
    game.currentQuestion++;
    renderQuestion();
  }, 2000);
}

// handles updating the dom score
function update() {
  $('.correct span').text(game.score.correct);
  $('.incorrect span').text(game.score.incorrect);
  // calculate how many questions are left
  game.questionsLeft = (questions.length + 1) - (game.currentQuestion + 1);
  $('.questions-left span').text(game.questionsLeft);
  $('.time-left span').text(game.timeLeft);
}

// restart game
function restart() {
  game.currentQuestion = 0;
  game.score = {
    correct: 0,
    incorrect: 0
  };
  game.questionsLeft = 0;
}

// function for handling click logic on options
function optionClick(self) {
  // check if answer right
  if($(self).data('correct') === true) {
    // correct
    // increment score
    game.score.correct++;
  } else if($(self).data('correct') === false) {
    // incorrect
    game.score.incorrect++;
  }
  // user made a choice move to next question
  clearInterval(intervalId);
  // so people cant double click and get free points
  $('.option').data('correct', '');
  // show answers
  showAnswers(); 
}