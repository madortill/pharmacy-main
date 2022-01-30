// activates the slider
// works only on items with class "slider"
// r2p2
pop_slider = () => {
    $(`#${matrix[nRoom][nPage].divName} .slider`).slider({
        min: 8,
        max: 17,
        value: 12.5
    });
}
