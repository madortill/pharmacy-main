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
    switch_class($(`#controls .home-page-button`), "visible", "hidden"); 
    switch_class($("#controls"),"none", "flex");
    // set variables
    question_num = eval(`${matrix[nRoom][nPage].questionType}_question_num`);
}

type_quiz = () => {
    $(`#${matrix[nRoom][nPage].divName} .question-counter`).text(`${question_counter}/${question_num}`);
    pop_insert_question();
}

// insert question from the question bank
  pop_insert_question = () => {
    // clean new answers from classes from the previous questions set
    $(`.answer.correct`).removeClass("correct");
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
    switch_class($(`#${matrix[nRoom][nPage].divName} .correct`), "normal", "right");
    $(`#${matrix[nRoom][nPage].divName} .answer`).off("click");
    // right
    if ($(event.currentTarget).hasClass("correct")) {
        correct_question_counter++;
    }
    // wrong
    else {
        switch_class($(event.currentTarget), "normal", "wrong");
        incorrect_question_counter++;
    }
    // if the quiz is over
    if ((correct_question_counter + incorrect_question_counter) === question_num) {
        // wait before moving page 
        // the user can see his last answer for a second
        setTimeout(() => {
            check_quiz();
        }, 1000);
    }
  }
// check if the user passed the test
  check_quiz = () => {
    switch_class($(`#lesson-map-${nRoom}`), "hidden", "visible");
    switch_class($(`#topic-counter`), "hidden", "visible");
    switch_class($(`#watch-room-button`), "hidden", "visible");
    switch_class($(`#controls .home-page-button`), "hidden", "visible"); 
    switch_class($("#next-button"), "hidden", "visible");
    switch_class($("#controls"), "flex" ,"none"); 
    // user finished quiz
    // user passed the test
    if (correct_question_counter > (question_num/2)) {
        hidePage();
        // user passed life test
        // adding life and showing animation
        if (matrix[nRoom][nPage].questionType === "life") {
            nLife++;

            // display end-game general page
            $(`#ending-game`).css("display", "block");
            switch_class($("#spinning-flex"), "none", "flex");
            // hearts
            switch_class($(`#hearts-flex`), "none", "flex");
            // heart images- switch to happy
            for (let i = 1; i <= nLife ; i++) {
                $(`#heart-${i} .heart`).attr("src", `assets/media/heart/heart${i}_happy.svg`);
            }

            // animation of popping heart
            setTimeout(() => {
                switch_class($(`#heart-1`), "hidden", "visible");
                $(`#heart-1 .heart`).addClass("heart-show-animation");
            }, 2000);
            setTimeout(cloud_effect, 2400);
            setTimeout(() => {
                $(`#heart-1 .heart`).removeClass("heart-show-animation");
            }, 2500);

            // text
            $(`#ending-game .ending-game-title`).text("סיימתם!");
            setTimeout(() => {
                // hide end-game general page
                $(`#ending-game`).css("display", "none");
                switch_class($("#spinning-flex"), "flex", "none");
                // hide hearts
                switch_class($(`#hearts-flex`), "flex", "none");
                // erase 3 questions
                matrix[nRoom].splice((nPage - (question_num-1)), question_num);
                nPage = nPage - (question_num-1);
                movePage();
            }, 4000);
        }
        // user passed room's final test
        // going back to home page to open new room
        else if (matrix[nRoom][nPage].questionType === "finish") {
            // erase 6 questions
            matrix[nRoom].splice((nPage - (question_num-1)), question_num);
            nPage = nPage - (question_num-1);
            // opening new room
            if (nRoom < 4) {
                pop_room_buttons($(`#room-button-${nRoom + 1}`));
            }
            // moving room
            homePage();
        }

    } 

    // user didn't pass the test
    // restart room
    else {
        finish_story("finish");
    }

    // reset for new questions
    question_counter = 1;
    correct_question_counter = 0;
    incorrect_question_counter = 0;
    // remove classes from answers so the won't appear in new questions
    switch_class($(`.answer.right`), "right", "normal");
    switch_class($(`.answer.wrong`), "wrong", "normal");
  }

