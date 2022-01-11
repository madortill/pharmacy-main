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
    
];


let finish_question_counter = 0;
let life_question_counter = 0;
const ANSWER_NUM = 4;

type_quiz = () => {
    
}

// insert question from the question bank
  pop_insert_question = () => {
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

