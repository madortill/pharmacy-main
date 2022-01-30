// activates the slider
// works only on items with class "slider"
// r2p2
pop_r2p2_slider = () => {
    $(`#${matrix[nRoom][nPage].divName} .slider`).slider({
        min: 8,
        max: 17,
        value: 13,
        step: 1,
        slide: function(event,ui) {
            console.log(ui.value);
        }
    });
    $(`#${matrix[nRoom][nPage].divName}`).keyup(function(event) {
        // if the user clicked enter
        if (event.which === 13) {
            alert('Enter is pressed!');
        }
        $(`#${matrix[nRoom][nPage].divName}`).off("keyup");
    });
}
