let mat_r2p4 = [];
const width = 6;
const length = 15;


let r2p4_falling_order = [
    { 
        data_num: 3,
        velocity: "500"
    },
    { 
        data_num: 2,
        velocity: "400"
    },
    { 
        data_num: 4,
        velocity: "300"
    },
    { 
        data_num: 1,
        velocity: "200"
    },
];
let r2p4_first_location = 18.5;

// activates the slider
// works only on items with class "slider"
// r2p2
pop_r2p2_slider = () => {
    $(`#${matrix[nRoom][nPage].divName} .slider`).slider({
        min: 8,
        max: 17,
        value: 13,
        step: 0.2,
    });
}

// function called when clicking enter
r2p2_check_slider = () => {
    $(document).off("keypress");
    $(`#${matrix[nRoom][nPage].divName} .slider`).slider("disable");
    let hour = $(`#${matrix[nRoom][nPage].divName} .slider`).slider( "value");
    // if the user dragged the anchore between 09:00-12:00 or 13:00-15:00
    if (((9 < hour) && (hour < 12)) || ((13 < hour) && (hour < 15)) && b_timer) {
        V_X(true);
    } else {
        V_X(false);
    }

}

// builds a matrix contains information about game objects' location and movement
// r2p4
pop_r2p4_build_mat = () => {
    // create empty arrays
    for (let i = 0; i <= length - 1; i++) {
        mat_r2p4[i] = [];
    }
    // fill the arrays
    for (let i = 0; i < length - 1; i++) {
        mat_r2p4[i][0] = "SAFETY_WALL";
        for (let j = 1; j < width - 1; j++) {
            mat_r2p4[i][j] = "EMPTY";
        }
        mat_r2p4[i][width - 1] = "SAFETY_WALL";
    }
    // fill the floor with safety wall
    for (let i = 0; i <= width - 1; i++) {
        mat_r2p4[length - 1][i] = "SAFETY_WALL"
    }
    for (let i = 0; i < length - 1; i++) {
        for (let j = 1; j < width - 1; j++) {
            mat_r2p4[length - 1][j] = `SQUARE_${j}`;
        }
    }
    console.log(mat_r2p4);
}

var counter_r2p8_signs_order = 0;
var arr_r2p8_signs_order = [1,3,2];
var arr_r2p8_signs_locations = [
    {
        top: "14vw",
        left: "75vw"
    }, 
    {
        top: "15vw",
        left: "40vw"
    },     
    {
        top: "44vw",
        left: "30vw"
    } 
];
r2p8_dropped_correct = (drag, drop) => {
    // disable item dragging
    drag.draggable("option", "disabled", true);
    // changing sign location
    $(`#${matrix[nRoom][nPage].divName} .drag.data-num-${arr_r2p8_signs_order[counter_r2p8_signs_order]}`).animate({top: arr_r2p8_signs_locations[arr_r2p8_signs_order[counter_r2p8_signs_order] - 1].top, left: arr_r2p8_signs_locations[arr_r2p8_signs_order[counter_r2p8_signs_order] - 1].left}, 200);
    counter_r2p8_signs_order++;
    if (counter_r2p8_signs_order < arr_r2p8_signs_order.length) {
        // new sign appear
        switch_class($(`#${matrix[nRoom][nPage].divName} .drag.data-num-${arr_r2p8_signs_order[counter_r2p8_signs_order]}`), "none", "block");
    } else if (b_timer) {
        V_X(true);
    }
}

// the parameter is the clicked correct sign
r2p11_clicked_correct = (item) => {
    $(`#${matrix[nRoom][nPage].divName} .item`).css("pointer-events", "none");
    // blink effect
    for (let i = 0; i < 14; i++) {
        setTimeout(() => {
            if (item.attr("src").includes("light_on")) {
                item.attr("src", "assets/media/exer7/exer07_light_off.svg");
            } else {
                item.attr("src", "assets/media/exer7/exer07_light_on.svg");
            };
          }, i * 200);
    }
    setTimeout(() => {
        if (b_timer) {
            V_X(true);
        }
    }, 1000);
}

var counter_r2p13_folder = 0;
var counter_r2p13_trash = 0;
var arr_r2p13_files_order = [
    {
        top: "15vw",
        left: "83vw",
        transform: "rotate(3deg)",
        used: false
    },
    {
        top: "17vw",
        left: "75vw",
        transform: "rotate(-0.5deg)",
        used: false
    },
    {
        top: "11vw",
        left: "56vw",
        transform: "rotate(3.5deg)",
        used: false
    },
    {
        top: "28vw",
        left: "77vw",
        transform: "rotate(8.5deg)",
        used: false
    },
    {
        top: "33vw",
        left: "63vw",
        transform: "rotate(2deg)",
        used: false
    },
    {
        top: "28vw",
        left: "50vw",
        transform: "rotate(-6deg)",
        used: false
    }
]

// exactly the same exercise
r2p13_dropped_correct = (drag, drop) => {
    r1p10_dropped_correct(drag, drop);
}

restart_2 = () => {
    // r2p4
    switch_class($(`#r2p4 .item`), "block", "none");
    for (let i = 0; i < $(`#r2p4 .item`).length; i++) {
        let random = Math.floor(Math.random() * $(`#r2p4 .item`).length) + 1;
        for (let j = 0; j < i; i++) {
            while (r2p4_falling_order[j].data_num === random) {
                random = Math.floor(Math.random() * $(`#r2p4 .item`).length) + 1;
                j = 0;
            }
        }
        r2p4_falling_order[i].data_num = random;
    }

    // r2p8
    restart_sign_drag("r2p8");
    // signs return to original location
    $("#r2p8 .sign").css({top: "86vw", left: "32vw"});

    // r2p13
    restart_trash_drag("r2p13");
    $("#r2p13 .data-num-2.drag-3").attr("src", `assets/media/exer3/exer3_bikurofe.svg`);
}

