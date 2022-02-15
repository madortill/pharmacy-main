r4p2_clicked_correct = (item) => {
    $(`#${matrix[nRoom][nPage].divName} .item`).css("pointer-events", "none");
    $("#switch").attr("src", "assets/media/exer15/exer15_switch_on.svg");
    $("#wind").animate({height: `28vh`}, 500, function() {
        if (b_timer) {
            V_X(true);
        }
    });
}

var counter_r4p5_items_order = 0;
var arr_r4p5_items_order = [4,2,1,6,8,3,7,5];
var arr_r4p5_items_locations = [
    {
        top: "17.3vw",
        left: "85.5vw"
    }, 
    {
        top: "6vw",
        left: "69vw"
    },     
    {
        top: "14vw",
        left: "69vw"
    },
    {
        top: "18vw",
        left: "30vw"
    },     
    {
        top: "6vw",
        left: "30vw"
    },
    {
        top: "6vw",
        left: "20.2vw"
    },     
    {
        top: "6vw",
        left: "10.6vw"
    },     
    {
        top: "6vw",
        left: "1vw"
    }  
];

r4p5_dropped_correct = (drag, drop) => {
    r2p8_dropped_correct(drag, drop);
}

let mat_r4p7 = [];
const width_r4p7 = 7;
const length_r4p7 = 15;
let r4p7_falling_order = [
    { 
        data_num: 1,
        velocity: "1000"
    },
    { 
        data_num: 2,
        velocity: "400"
    },
    { 
        data_num: 3,
        velocity: "300"
    }
];
let r4p7_first_location = 3;
// specific locations of items in r4p7
// the shelves are aligned in doubles of five (first shelf is rows 0-4, second in 5-9, third 10-14)
r4p7_build_mat = () => {
    // colliding items
    // moxipen
    mat_r4p7[2][2] = "SAFETY_WALL";
    mat_r4p7[3][2] = "SAFETY_WALL";
    mat_r4p7[4][2] = "SAFETY_WALL";
    // ibufen
    mat_r4p7[4][4] = "SAFETY_WALL";
    // phenistil
    mat_r4p7[9][3] = "SAFETY_WALL";
    // leukoplast
    mat_r4p7[13][3] = "SAFETY_WALL";
    mat_r4p7[14][3] = "SAFETY_WALL";

    // medicines places
    // optalgin
    mat_r4p7[4][3] = `SQUARE_3`;
    // mopirosin
    mat_r4p7[9][4] = `SQUARE_2`;
    mat_r4p7[9][5] = `SQUARE_2`;
    // gaza
    mat_r4p7[14][4] = `SQUARE_1`;
    mat_r4p7[14][5] = `SQUARE_1`;
}

restart_4 = () => {
    // r4p2
    $("#wind").css("height", "0vh");
    $("#switch").attr("src", "assets/media/exer15/exer15_switch_off.svg");

    // r4p5
    restart_item("r4p5");
    // items return to original location
    $("#r4p5 .item").css({top: "61vh", left: "46.1vw"});
}