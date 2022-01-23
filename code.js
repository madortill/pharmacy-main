// there are 4 options: 1, 2, 3, 4 (waiting room, therapy room, doctor's room and medicines room)
// the variable changes when clicking on one of the rooms buttons in the opening
// there are 4 arrays- one for each room 
var nRoom = 0;
var nPage = 0;

// waiting room
var Arr_1 = [
  {
    // opening game question- page 1
    divName: ["r1p1"],
    functions: [`switch_class($("#back-button"), "visible", "hidden")`, `pop_buttons($("#next-button"), 1)`, "pop_watch_room_button()", "pop_home_page_button()", "pop_restart_button()", "pop_quiz_button()"],
    type: "content",
    topic: 1
  },
  {
    // page 2
    divName: ["r1p2"],
    functions: [`switch_class($("#back-button"), "hidden", "visible")`, `pop_buttons($("#back-button"), -1)`],
    type: "content",
    topic: 2
  },
  {
    // first game- page 3
    divName: ["r1p3"],
    functions: ["pop_timeEnds()", "pop_sign_click()", "pop_hover_down()"],
    type: "game",
    timer: "10s",
    feedback: {
      correct: "array",
      incorrect: "array"
    },
    instructions: "התבלבלתי ותליתי את כל השלטים מחוץ למרפאה!<br>לחצו על השלטים שאמורים להיות בפנים",
    instructions_feedback: {
      correct: "אתם שולטים על השלטים!",
      incorrect: "חבל שתליית השלטים תלוייה בכם..."
    }
  },
  {
    // page 4
    divName: ["r1p4"],
    functions: [""],
    type: "content",
    topic: 3
  },
  {
    // page 5
    divName: ["r1p5"],
    functions: [""],
    type: "content"
  },
  {
    // page 6
    divName: ["r1p6"],
    functions: [""],
    type: "content"
  },
  {
    // second game- page 7
    divName: ["r1p7"],
    functions: ["pop_hover_down()", "pop_drag_drop()"],
    type: "game",
    feedback: {
      correct: "array",
      incorrect: "array"
    },
    instructions: "בבקשה עזרו לי לגרור את המודעה ללוח הנכון",
    instructions_feedback: {
      correct: "מזל שהמשימה הייתה תלוייה בכם",
      incorrect: "יא חסרי מודעות..."
    }
  },
  {
    // page 8
    divName: ["r1p8"],
    functions: [""],
    type: "content",
    topic: 4
  },
  {
    // page 9
    divName: ["r1p9"],
    functions: [""],
    type: "content"
  },
  {
    // third game- page 10
    divName: ["r1p10"],
    functions: ["pop_hover_down()", "pop_drag_drop()"],
    type: "game",
    feedback: {
      correct: "שלב בוס!",
      incorrect: "שלב בוס!"
    },
    instructions: "עזרו לי ליצור אוגדן לחדר קבלה! גררו את הדפים הנחוצים לאוגדן ואת השאר לפח",
    instructions_feedback: {
      correct: "אוגדן של קפדן!",
      incorrect: "אוגדן של מפסידן..."
    }
  },
  {
    // question 1- page 11
    divName: ["q1"],
    functions: [`switch_class($("#next-button"), "hidden", "visible")`, `switch_class($("#back-button"), "visible", "hidden")`, `first_question()`, `pop_insert_question()`],
    type: "quiz",
    questionType: "finish"
  },
  {
    // question 2- page 12
    divName: ["q2"],
    functions: [`switch_class($("#back-button"), "hidden", "visible")`, `pop_insert_question()`],
    type: "quiz",
    questionType: "finish"
  },
  {
    // question 3- page 13
    divName: ["q3"],
    functions: [`pop_insert_question()`],
    type: "quiz",
    questionType: "finish"
  },
  {
    // question 4- page 14
    divName: ["q4"],
    functions: [`pop_insert_question()`],
    type: "quiz",
    questionType: "finish"
  },
  {
    // question 5- page 15
    divName: ["q5"],
    functions: [`switch_class($("#next-button"), "hidden", "visible")`, `pop_insert_question()`],
    type: "quiz",
    questionType: "finish"
  },
  {
    // question 6- page 16
    divName: ["q6"],
    functions: [`switch_class($("#next-button"), "visible", "hidden")`, `pop_insert_question()`],
    type: "quiz",
    questionType: "finish"
  },
];

// therapy room
var Arr_2 = [
];

// doctor's room
var Arr_3 = [
];

// medicines room
var Arr_4 = [
];

var matrix = [[
  {
    // opening- page 0
    divName: ["opening"], // the last div contains the speech bubble
    functions: ['pop_room_buttons($("#room-button-1"))', 'pop_buttons($("#about-button"), 1)', "pop_calculateStrokeTextCSS(16)"] // array of functions that are needed to the page. If the functions contain the word "pop", it will happen only once and will be popped out of the array afterwards
  },
  {
    // about- page 1
    divName: ["about"],
    functions: ['pop_buttons($("#back-about-button"), -1)']
  }
], Arr_1.slice(), Arr_2.slice(), Arr_3.slice(), Arr_4.slice()];

// lesson map
// what topic is the user currently learning
var topic_counter = 1;
// the distance between each circle in the lesson map (for the head movement)- different for each room 
var topic_distance = 4;

$(function() {
  // calls the opening page
  movePage();
});

function movePage() {
  // appearance
  // shows current divs
  for (let i = 0; i < matrix[nRoom][nPage].divName.length; i++) {
    $("#" + matrix[nRoom][nPage].divName[i]).css("display", "block");
  }
 
  // functions
  // calls the functions of the page
  if ("#" + matrix[nRoom][nPage].functions !== "") {
    let nFunction = 0;
    while (nFunction < matrix[nRoom][nPage].functions.length) {
      eval(matrix[nRoom][nPage].functions[nFunction]);
      // functions that contains the word "pop" will accur only once
      if (matrix[nRoom][nPage].functions[nFunction].includes("pop")) {
        matrix[nRoom][nPage].functions.splice(nFunction , 1);
        // since the function happens only once there is no need in adding nFunction +1
      } else {
        nFunction++;
      }
    }
  }

  if (matrix[nRoom][nPage].type !== undefined) {
    // identify type
    eval(`type_${matrix[nRoom][nPage].type}()`);
  }
}

function hidePage() {
    // hides last divs
    for (let i = 0; i < matrix[nRoom][nPage].divName.length; i++) {
      $("#" + matrix[nRoom][nPage].divName[i]).css("display", "none");
    }
    // changing checkpoint in lesson map
    // if the topic changes whem moving page (there are pages with the same topic)
    // after a game the topic is equal to the content topic and there is no need to change
    // if (matrix[nRoom][nPage].topic !== undefined) {
    // }
}

// function that adds events listeners to room buttons that displays the chosen room- called only one time for each button
function pop_room_buttons(button) {
  // changing button appearance
  switch_class(button, "enabled", "abled");
  button.on("click", function() {
    // hides last divs
    hidePage();
    
    // changes room counter
    nRoom = Number(button.attr("id").slice(-1)); 
    // display room
    $(`#room-${nRoom}`).css("display", "block");
    setTimeout(toggle_room, 3000); 
    // shows next page
    setTimeout(movePage, 3000); 
    check_room(); 
  });
}

// function that adds events listeners to buttons that affects the page's display- called only one time for each button
function pop_buttons(button, number) {
  button.on("click", function() {
    hidePage();
    if ((matrix[nRoom][nPage].type !== undefined) && (matrix[nRoom][nPage].type !== "quiz")) {
      if ($(`#lesson-map-${nRoom} .topic-${topic_counter}`).css("background-image").includes("normal")) {
        checkpoint(true);
        }
    } else if (matrix[nRoom][nPage].type === "quiz") {
      question_counter = question_counter + eval(number);
    }
    // changes page counter
    // if the button is prev/next/about (ect), the number is added to page counter
    if (button.hasClass("move")) {
      nPage = nPage + eval(number);
      // lessom map movememt (ahami head)
        // if the topic changes whem moving page (there are pages with the same topic)
        // after a game the topic is equal to the content topic and there is no need to change
        if ((matrix[nRoom][nPage].topic !== undefined) && (topic_counter !== matrix[nRoom][nPage].topic)) {
          move_lessonMap(topic_distance * number);
        }
    }
    // if the button is part of the lesson map, page counter is compared to the number 
    else if (button.hasClass("topic")) {
      nPage = eval(number);
      // lessom map movememt (ahami head)
        move_lessonMap(topic_distance * (matrix[nRoom][nPage].topic - topic_counter));
    }
    // shows next page
    movePage();    
  });
}

// function that is called every time going in to new room to start from stratch
check_room = () => {
  // hearts
  nLife = 3;
  for (let i = 1; i <= nLife ; i++) {
    switch_class($(`#heart-${i}`), "hidden", "visible");
    $(`#heart-${i} .heart`).attr("src", `assets/media/heart/heart${i}_happy.svg`);
  }
  // lesson map
  topic_counter = 1;
  switch (nRoom) {
    case 1:
      topic_distance = 14.8;  
      break;
    case 2:
      topic_distance = 2;  
      break;
    case 3:
      topic_distance = 3;  
      break;
    case 4:
      topic_distance = 2;  
      break;
    default:
      topic_distance = 4; 
  }
  $("#topic-counter").css("right", "-63.5vw");
  // comments array
  correct_num = 0;
  incorrect_num = 0;
}


// colors checkpoint if needed
checkpoint = (condition) => {
  let curr_checkpoint = $(`#lesson-map-${nRoom} .topic-${topic_counter}`);
  // if the checkpoint haven't been changed
  // if (curr_checkpoint.css("background-image").includes("normal")) {
    // if this is a content page or the user succeded in a game
    if (condition) {
      curr_checkpoint.css("background-image", `url("assets/media/2content/checkpoint_right.svg")`);
      // changing ahami little head to happy
      if ($("#topic-counter").attr("src") === "assets/media/2content/head_sad.svg") {
        $("#topic-counter").attr("src", "assets/media/2content/head_happy.svg")
      }
    }
    // the user lost the game
    else {
      curr_checkpoint.css("background-image", `url("assets/media/2content/checkpoint_wrong.svg")`);
      // changing ahami little head to sad
      if ($("#topic-counter").attr("src") === "assets/media/2content/head_happy.svg") {
        $("#topic-counter").attr("src", "assets/media/2content/head_sad.svg")
      }
    }
    // the checkpoint is clickable
    if (!curr_checkpoint.hasClass("button")) {
      pop_buttons(curr_checkpoint, nPage);
      curr_checkpoint.addClass("button");
    }
}

// moves ahami lesson map head- after moving topic and after every game
move_lessonMap = (distance) => {
  // change lesson map head place
  $("#topic-counter").animate({right: `+=${distance}vw`}, 1000);
  // update topic counter
  if (matrix[nRoom][nPage].type === "game") {
    topic_counter++;
  } else {
    topic_counter = matrix[nRoom][nPage].topic;
  }
}

// display/hides room image (every room start and with the room button)
toggle_room = ()  => {
  let room_div = $(`#room-${nRoom}`);
  // display the room
  if (room_div.css("display") === "none") {
    room_div.css("display","block");
    room_div.animate({opacity: `1`}, 500);
  }
  // hide the room
  else {
    room_div.animate({opacity: `0`}, 500, function() {
    room_div.css("display","none");
    });
  }
}

// setting content page
type_content = () => {
  // display controls
  switch_class($("#controls"), "none", "flex");
  switch_class($(`#lesson-map-${nRoom}`), "none", "flex");
}

pop_home_page_button = () => {
  $("#controls .home-page-button").on("click", function() {
    hidePage();
    homePage();
  });
}

// before using this function there is need to call hidePage()
// sends the user to home page
homePage = () => {
  nRoom = 0;
  nPage = 0;
  movePage();
  switch_class($("#controls"), "flex", "none");
  switch_class($(`#lesson-map-${nRoom}`), "flex", "none");
}

pop_watch_room_button = () => {
  $("#watch-room-button").on("click", function() {
    toggle_room();
    // display back button (when entering new room there is no back button, therefore it is in separated tag in HTML)
    setTimeout(switch_class, 500, $("#back-room-button"), "none", "block");
    switch_class($("#controls"), "flex", "none"); 
  });
  $("#back-room-button").on("click", function() {
    toggle_room();
    switch_class($("#back-room-button"), "block", "none");
    setTimeout(switch_class, 500, $("#controls"), "none", "flex");
  });
}

// function that switches classes
switch_class = (object, prevClass, currClass) => {
  if (object.hasClass(prevClass)) {
    object.removeClass(prevClass);
    object.addClass(currClass);
  }
}	

restart = () => {
  // can't reset matrix after resetting nRoom and nPage
  // can't reset matrix before resetting nRoom and nPage because it messes the page's order
  // let nPrevRoom = nRoom;
  hidePage();
  // return games and questions to matrix
  matrix.splice(nRoom, 1, window[`Arr_${nRoom}`].slice());
  // return questions to questions' matrix
  mat_questions_bank.splice(nRoom - 1, 1, window[`arr_questions_bank_${nRoom}`].slice());
  // specific games
  eval(`restart_${nRoom}()`);
  // lesson map
  $(`#lesson-map-${nRoom} .topic`).css("background-image", "url('assets/media/2content/checkpoint_normal.svg')");
  $(`.ahami-head, #topic-counter`).attr("src", `assets/media/2content/head_happy.svg`);

  // home page
  //nRoom = 0 nPage = 0
  homePage();

  // games general
  $(`.item`).css("pointer-events", "auto");
  // $(`.drag`).draggable({
  //   revert:"invalid",
  //   revertDuration: 200,
  //   containment: "window",
  //   drag: function(event, ui) {}
  // }).css("position", "absolute");
  $(`.drag`).draggable("option", "disabled", false);
}

// text css opening
function pop_calculateStrokeTextCSS(steps) {
  var css = "";
  for (var i = 0; i < steps; i++) {
    var angle = (i * 2 * Math.PI) / steps;
    var cos = Math.round(10000 * Math.cos(angle)) / 10000;
    var sin = Math.round(10000 * Math.sin(angle)) / 10000;
    css +=
      "calc(var(--stroke-width) * " +
      cos +
      ") calc(var(--stroke-width) * " +
      sin +
      ") 0 var(--stroke-color),";
  }
  return css;
}
