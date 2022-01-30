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

r2p2_check_slider = () => {
    $(`#${matrix[nRoom][nPage].divName}`).off("keydown");
    $(`#${matrix[nRoom][nPage].divName} .slider`).slider("disable");
    let value = $( ".selector" ).slider( "value" );
    // if the user dragged the anchore between 09:00-12:00 or 13:00-15:00
    if (((9 < ui.value) && (ui.value < 12)) || ((13 < ui.value) && (ui.value < 15))) {
        V_X(true);
    } else {
        V_X(false);
    }

}

restart_2 = () => {

}