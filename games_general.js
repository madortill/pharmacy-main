
// life
var nLife = 3;

// feedback arrays
let correct_num = 0;
let incorrect_num = 0;
var arr_correct_feedback = ["תותח!"];
var arr_incorrect_feedback = ["איזה לוזר!"];

// setting game page
type_game = () => {
    // hide controls
    switch_class($("#controls"), "flex" ,"none");
    switch_class($(`#lesson-map-${nRoom}`), "flex" ,"none");
  
    if (matrix[nRoom][nPage].timer !== undefined) {
        // display timer
        switch_class($("#timer"), "none", "block");
        // reset timeline
        $("#time-timeline").css({"object-position": "40% 0", "animation-duration" : matrix[nRoom][nPage].timer});
    }
  }

endingGame = (condition) => {
    let comment;
    let heart_img;
    let delay = 2000;
    // the user wins/loses
    if (condition) {
        comment = "correct";
        heart_img= "happy";
    } else {
        comment = "incorrect";
        heart_img= "sad";
    }

    hidePage();
    checkpoint(condition);
    // hide back and prev
    switch_class($("#controls .control-button"), "visible", "hidden");
    $(".topic").css("pointer-events", "none");
    // display end-game general page
    $(`#ending-game`).css("display", "block");
    switch_class($("#spinning-flex"), "none", "flex");

    // hearts
    switch_class($(`#hearts-flex`), "none", "flex");
    // heart images- switch from happy to sad and the opposite
    if ($(`#heart-1 .heart`).attr("src") !== `assets/media/heart/heart1_${heart_img}.svg`) {
        for (let i = 1; i <= nLife ; i++) {
            $(`#heart-${i} .heart`).attr("src", `assets/media/heart/heart${i}_${heart_img}.svg`);
        }
    }

    if (!condition) {
        // animation of popping heart
        setTimeout(() => {
            $(`#heart-${nLife} .heart`).addClass("heart-animation");
        }, delay);
        setTimeout(cloud_effect, delay + 400);
        setTimeout(() => {
            $(`#heart-${nLife} .heart`).removeClass("heart-animation");
            switch_class($(`#heart-${nLife}`), "visible", "hidden");
            nLife--;
        }, delay+ 500);
    }

    // changing text in ending page
    if (eval(`matrix[nRoom][nPage].feedback.${comment}`) === "array") {
        // from the array of generic comments
        $(`#ending-game .ending-game-title`).text(eval(`arr_${comment}_feedback[${comment}_num]`));
    } else {
        // specific comments
        $(`#ending-game .ending-game-title`).text(eval(`matrix[nRoom][nPage].feedback.${comment}`));
    }
    // adding to the appropriate counter
    eval(`${comment}_num++`);

    // moving one step in lesson map
    switch_class($("#controls"),"none", "flex" );
    switch_class($(`#lesson-map-${nRoom}`), "none", "flex");  
    move_lessonMap(topic_distance);
    // removing game from the array
    matrix[nRoom].splice(nPage , 1);
    // shows next page
    setTimeout(() => {
        // hide end-game general page
        $(`#ending-game`).css("display", "none");
        switch_class($("#spinning-flex"), "flex", "none");
        // hide hearts
        switch_class($(`#hearts-flex`), "flex", "none");
        // show back and prev
        if (matrix[nRoom][nPage].type === "content") {
            switch_class($("#controls .control-button"),"hidden" ,"visible");
        }
        $(".topic").css("pointer-events", "auto");
        // end of game
        if (nLife === 0) {
            // this is the first life test for this room
            if (window[`arr_questions_bank_${nRoom}`].length !== 0) {
                finish_story("life");
            }
            // user can't do 2 test life
            // user failed the room
            else {
                finish_story("finish");
            }
        } else {
            movePage();
        }
    }, delay + 2000);
}

// fog cloud hearts effect
cloud_effect = () => {
    switch_class($(`#heart-${nLife} .cloud`), "none", "block");
    setTimeout(() => {
      switch_class($(`#heart-${nLife} .cloud`), "block", "none");
    }, 50);
}

// reveals "story-finish" div
finish_story = (type) => {
    // display finish-story general page
    $(`#finish-story`).css("display", "block");
    switch_class($("#spinning-flex"), "none", "flex");
    switch_class($("#controls .control-button"),"visible","hidden");

    $(".topic").css("pointer-events", "none");  
    switch (type) {
        case 'life':
            switch_class($("#finish-story #button-flex"), "none", "flex");
            switch_class($("#controls"),"none", "flex");
            switch_class($(`#lesson-map-${nRoom}`), "none", "flex");
          break;
        // ending game completely and refreshing room
        case 'finish':
            switch_class($("#finish-story #button-flex"), "flex", "none");
            switch_class($("#controls"), "flex" ,"none");
            // see the finish-story screen for 2.5 secondes
            setTimeout(() => {
                // hide finish-story general page
                switch_class($("#finish-story #button-flex"), "none", "flex");
                $(`#finish-story`).css("display", "none");
                switch_class($("#spinning-flex"), "flex", "none");
                switch_class($("#controls .control-button"), "hidden", "visible");
                switch_class($(`#lesson-map-${nRoom}`), "flex", "none");
                $(".topic").css("pointer-events", "auto");
                restart();
            }, 2500);
          break;
    }
}

pop_restart_button = () => {
    $("#restart-button").on("click", function() {
        pop_buttons($("#restart-button"), 0);
        restart();
    });
}

pop_quiz_button = () => {
    $("#quiz-button").on("click", function() {
        matrix[nRoom].splice(nPage, 0, 
            {
            // question 1
            divName: ["q1"],
            functions: [`switch_class($("#next-button"), "hidden", "visible")`, `switch_class($("#back-button"), "visible", "hidden")`, `first_question()`],
            type: "quiz",
            questionType: "life"
            },                        
            {
            // question 2
            divName: ["q2"],
            functions: [`switch_class($("#back-button"), "hidden", "visible")`],
            type: "quiz",
            questionType: "life"
            },
            {
            // question 3
            divName: ["q3"],
            functions: [`switch_class($("#next-button"), "visible", "hidden")`],
            type: "quiz",
            questionType: "life"
            }
        );
        $(`#finish-story`).css("display", "none");
        switch_class($("#spinning-flex"), "flex", "none");
        switch_class($("#controls .control-button"), "hidden", "visible");
        switch_class($("#controls"), "flex" ,"none");
        switch_class($(`#lesson-map-${nRoom}`), "flex", "none");
        $(".topic").css("pointer-events", "auto");  
        movePage();
    });
}

// called when the user loses the game
V_X = (condition) => {
    // hide timer
    switch_class($("#timer"), "block", "none");
    let v_x;
    let comment;
    let ahami;
    // if the user has won
    if (condition) {
        v_x = $("#v");
        comment = "correct";
        ahami = "happy";
    }
    // if the user lost
    else {
        v_x = $("#x");
        comment = "incorrect";
        ahami = "sad";
    }
    switch_class(v_x, "none", "block");
    $(`#${matrix[nRoom][nPage].divName} .instructions`).text(eval(`matrix[nRoom][nPage].instructions_feedback.${comment}`));
    $(`#${matrix[nRoom][nPage].divName} .ahami-head`).attr("src", `assets/media/2content/head_${ahami}.svg`);

    setTimeout(() => {
        switch_class(v_x, "block", "none");
        $(".item").css("pointer-events", "auto");
        endingGame(condition);
    }, 2000);
} 

// time out- the game is over
pop_timeEnds = () => {
    // event listener for ending timer animation
    document.querySelector("#time-timeline").addEventListener("animationend", () => {
        V_X(false);
    });
}

// adding hover and down state to objects
// in order the function will work the items need to have the class "state"
pop_hover_down = () => {
    let src;
    $(`#${matrix[nRoom][nPage].divName} .state`).on({
        // hover state
        mouseenter: function () {
            src = $(this).attr("src");
            src= src.slice(0, -4);

            $(this).attr("src", `${src}_hover.svg`);
        },
        mouseleave: function () {
            $(this).attr("src", `${src}.svg`);
        },
        // down state
        mousedown: function () {
            $(this).attr("src", `${src}_down.svg`);
        }
    });
}

// general games

// game of clicking on items (clicking on wrong item is disqulification)
// the parameter is the clicked item
// r1p3
click_identify = (item) => {
    // if the user clicked correct item
    if ((item).hasClass("correct")) {
        // eval(matrix[nRoom][nPage].divName + "_clicked_correct(" + item + ")");
        window[matrix[nRoom][nPage].divName + "_clicked_correct"](item);
    }
    // if the user clicked incorrect item, the game is over
    else {
        V_X(false);
        $(`#${matrix[nRoom][nPage].divName} .item`).css("pointer-events", "none");
    }
}


// called to add to drop and drag
// in order the function will work the items need to have the class "drag" and "drop"
//r1p7 r1p10
pop_drag_drop = () => {
    $(`#${matrix[nRoom][nPage].divName} .drag`).draggable({
        revert:"invalid",
        revertDuration: 200,
        containment: "window",
        drag: function(event, ui) {}
    }).css("position", "absolute");

    for (let i = 1; i <= $(`#${matrix[nRoom][nPage].divName} .drop`).length; i++) {
        $(`#${matrix[nRoom][nPage].divName} .drop-${i}`).droppable({
            tolerance: "intersect",
            drop: function(event, ui) {
                //dropped correct
                if (ui.draggable.hasClass(`drag-${i}`)) {
                    window[matrix[nRoom][nPage].divName + "_dropped_correct"](ui.draggable, $(this));
                }
                //dropped incorrect
                else {
                    V_X(false);
                }
            }
        });
    }
}
