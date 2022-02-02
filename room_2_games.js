let mat_r2p4 = [];
const width = 86;
const length = 11;

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
    x_position = (width/2) - 0.5;
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
    // mark trash cans
    for (let i = 3; i <= 7; i++) {
        mat_r2p4[length - 2][i] = `SQUARE_1`;
    }
    for (let i = 12; i <= 13; i++) {
        mat_r2p4[length - 2][i] = `SQUARE_2`;
    }
    for (let i = 18; i <= 19; i++) {
        mat_r2p4[length - 2][i] = `SQUARE_3`;
    }
    for (let i = 25; i <= 28; i++) {
        mat_r2p4[length - 2][i] = `SQUARE_4`;
    }
    console.log(mat_r2p4);
}

restart_2 = () => {

}