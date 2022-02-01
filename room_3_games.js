let exer_12_click_count = 0;
const EXER_12_WIN_COUNT = 5;

// the parameter is the clicked correct sign
r3p2_clicked_correct = (item) => {
    // send for win
    V_X(true);
}

// the parameter is the clicked correct sign
r3p4_clicked_correct = (item) => {
    // save clicked item
    let clicked_item = item[0].classList[0];
    // make sure its the first time its clicked
    if($(`#r3p4 .items .${clicked_item}`)[0].classList[3] === "transparent") {
        // make item opic and add to count
        switch_class($(`#r3p4 .items .${clicked_item}`), "transparent", "opic");
        exer_12_click_count++;
        // if chair change background
        if(clicked_item === "chair") {
            $(`#r3p4`).css("background-image", `url("assets/media/exer12/exer12_bg_chair.svg")`);  
        }
    }
    // check for win
    if(exer_12_click_count === EXER_12_WIN_COUNT) {
        V_X(true);
    }
}