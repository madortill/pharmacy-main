r4p2_clicked_correct = (item) => {
    $(`#${matrix[nRoom][nPage].divName} .item`).css("pointer-events", "none");
    $("#switch").attr("src", "assets/media/exer15/exer15_switch_on.svg");
    $("#wind").animate({height: `28vh`}, 500, function() {
        V_X(true);
    });
}

restart_4 = () => {
    // r2p4
    $("#wind").css("height", "0vh");
    $("#switch").attr("src", "assets/media/exer15/exer15_switch_off.svg");
}