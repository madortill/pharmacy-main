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
    if (((9 < hour) && (hour < 12)) || ((13 < hour) && (hour < 15))) {
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
}