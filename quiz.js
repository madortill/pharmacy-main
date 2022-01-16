// bank of questions
arr_questions_bank_1 = [
    {
        question: "מה חייב להימצא בחדר המתנה?",
        correct_answer: `ספסלים, פחים, לוח מודעות, שילוט המורה על "איסור עישון" ואמצעי הגנה מפגעי מזג האוויר.`,
        wrong_answer: [`מזגן, פחים, טלוויזיה, שילוט המורה על "איסור עישון" ואמצעי הגנה מפגעי מזג האוויר.` ,`מזגן, ספסלים, פחים, טלוויזיה בה מוצגים נהלי הרפואה ביחידה ואמצעי הגנה מפגעי מזג האוויר.` ,`ספסלים, פחים, טלוויזיה, שילוט המורה על "איסור עישון" ואמצעי הגנה מפגעי מזג האוויר.`]
    },
    {
        question: "מי הכי חנפנית במדור?",
        correct_answer: `מרי`,
        wrong_answer: [`יובל`,`ניצן`,`עינב`]
    },
    {
        question: "אני אמרתי את זה?",
        correct_answer: `כי היום אני לא מרגישה שאני עשה כלום`,
        wrong_answer: [`כלום בכלל`,`אני נשבע שאני לא עושה כלום`,`אני רוצה רק לשכב במיטה`]
    },
    {
        question: "מי הכי פז''מ עולם",
        correct_answer: `אליסה וגרגמל`,
        wrong_answer: [`אופק`,`דורין`,`טלי`]
    },
    {
        question: "מי אכל גלידה",
        correct_answer: `טלי`,
        wrong_answer: [`דורית`,`שחף`,`מרב`]
    }, 
    {
        question: "חללהכג",
        correct_answer: `עכעכע`,
        wrong_answer: [`דורית`,`עככגדגכדגכד`,`מרב`]
    },
    {
        question: "שלומי",
        correct_answer: `אוגר`,
        wrong_answer: [`לוויתן`,`חתולים`,`דולפין`]
    },
    {
        question: "קטן",
        correct_answer: `חמוד`,
        wrong_answer: [`מרב`,`גדול`,`שמנמן`]
    },
    {
        question: "מי הכי טוב?",
        correct_answer: `נועה קילה`,
        wrong_answer: [`ניצן סלומון`,`בריטני ספירס`,`מרגי`]
    }          
];

let question_counter = 1;
const finish_question_num = 6;
const life_question_num = 3;
const ANSWER_NUM = 4;
var correct_question_counter = 0;
var incorrect_question_counter = 0;
var question_num = 0;

first_question = () => {
    // hide controls
    switch_class($(`#lesson-map-${nRoom}`), "visible", "hidden");
    switch_class($(`#lesson-map-${nRoom}`), "none", "flex");
    switch_class($(`#topic-counter`), "visible", "hidden");
    switch_class($(`#watch-room-button`), "visible", "hidden"); 
    switch_class($("#controls"),"none", "flex");
    // set variables
    question_num = eval(`${matrix[nRoom][nPage].questionType}_question_num`);
}

type_quiz = () => {
    $(`#${matrix[nRoom][nPage].divName} .question-counter`).text(`${question_counter}/${question_num}`);
}

// insert question from the question bank
  pop_insert_question = () => {
    $(`#${matrix[nRoom][nPage].divName} .answer`).on("click", check_answer);
    // take random question from bank
    let question_bank = window[`arr_questions_bank_${nRoom}`];
    // random question from array
    let question_num = Math.floor(Math.random() * window[`arr_questions_bank_${nRoom}`].length);
    // number between 1-4
    let correct_answer = Math.floor(Math.random() * ANSWER_NUM) + 1;
    // insert question
    $(`#${matrix[nRoom][nPage].divName} .questions`).text(question_bank[question_num].question);
    // fill answers
    for (let i = 1; i <= ANSWER_NUM; i++) {
        if (i === correct_answer) {
            $(`#${matrix[nRoom][nPage].divName} .answer.data-num-${i}`).text(question_bank[question_num].correct_answer);
            $(`#${matrix[nRoom][nPage].divName} .answer.data-num-${i}`).addClass("correct");
        } else {
            let wrong_answer = Math.floor(Math.random() * (question_bank[question_num].wrong_answer.length));
            $(`#${matrix[nRoom][nPage].divName} .answer.data-num-${i}`).text(question_bank[question_num].wrong_answer[wrong_answer]);
            question_bank[question_num].wrong_answer.splice(wrong_answer, 1);
        }
    }
    // question won't repeat
    question_bank.splice(question_num, 1);
  }

// check if the user clickes the right answer
  check_answer = (event) => {
    $(`#${matrix[nRoom][nPage].divName} .correct`).addClass("right");
    $(`#${matrix[nRoom][nPage].divName} .correct`).removeClass("normal");
    $(`#${matrix[nRoom][nPage].divName} .answer`).off("click");
    // right
    if ($(event.currentTarget).hasClass("correct")) {
        correct_question_counter++;
    }
    // wrong
    else {
        $(event.currentTarget).addClass("wrong");
        $(event.currentTarget).removeClass("normal");
        incorrect_question_counter++;
    }
    // if the quiz is over
    if ((correct_question_counter + incorrect_question_counter) === question_num) {
        check_quiz();
    }
  }

  check_quiz = () => {
    switch_class($(`#lesson-map-${nRoom}`), "hidden", "visible");
    switch_class($(`#topic-counter`), "hidden", "visible");
    switch_class($(`#watch-room-button`), "hidden", "visible"); 
    question_counter = 1;
    correct_question_counter = 0;
    incorrect_question_counter = 0;
    hidePage();
    // finish room
    if (correct_question_counter > (question_num/2)) {
        // erase question
        matrix[nRoom].splice((nPage - question_num), question_num);
        if (matrix[nRoom][nPage].questionType = "life") {
            nLife = 1;
            endingGame(true);
        }
        nRoom = 0;
        nPage = 0;
    } 
    // restart room
    else {

    }
  }

