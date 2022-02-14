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
var arr_r4p5_items_order = [1,2,3,4,5,6,7,8];
var arr_r4p5_items_locations = [
    {
        top: "17.3vw",
        left: "85.5vw"
    }, 
    {
        top: "69vw",
        left: "6vw"
    },     
    {
        top: "69vw",
        left: "14vw"
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
        top: "44vw",
        left: "10.6vw"
    },     
    {
        top: "44vw",
        left: "1vw"
    }  
];

r4p5_dropped_correct = (drag, drop) => {
    r2p8_dropped_correct(drag, drop);
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