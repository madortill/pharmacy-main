// called to add to each sign event listener to click_identify
// in order the function will work the items need to have the class "item"
// r1p3
pop_sign_click = () => {
    // add event listener for each item
    $(`#${matrix[nRoom][nPage].divName} .item`).on("click", (event) => {
        click_identify($(event.target));
    }); 
}

// the parameter is the clicked correct sign
r1p3_clicked_correct = (item) => {
    item.animate({opacity: `0`}, 200, function() {
        switch_class(item, "visible", "hidden");
        if ($(`#${matrix[nRoom][nPage].divName} .hidden`).length === 2) {
            $(`#${matrix[nRoom][nPage].divName} .item`).css("pointer-events", "none");
            V_X(true);
        }
    });
}

var counter_r1p7_signs_order = 0;
var arr_r1p7_signs_order = [1,8,7,6,2,4,5,3];
r1p7_dropped_correct = (drag, drop) => {
    var $this = drop;
    // disable item dragging
    drag.draggable("option", "disabled", true);
    // vertical position
    if (drop.hasClass("empty")) {
        drag.position({
            my: "top bottom",
            at: "top center",
            of: $this,
            using: function(pos) {
                $(this).animate(pos, 200, "linear");
            }
        });
        drop.removeClass("empty");
    } else {
        drag.position({
            my: "top top",
            at: "top center",
            of: $this,
            using: function(pos) {
                $(this).animate(pos, 200, "linear");
            }
        });
    }
    counter_r1p7_signs_order++;
    if (counter_r1p7_signs_order < arr_r1p7_signs_order.length) {
        //new sign appear
        switch_class($(`#${matrix[nRoom][nPage].divName} .drag.data-num-${arr_r1p7_signs_order[counter_r1p7_signs_order]}`), "none", "block");
    } else {
        V_X(true);
    }
}

var counter_r1p10_folder = 0;
var counter_r1p10_trash = 0;
var arr_r1p10_files_order = [
    {
        top: "14vw",
        left: "81vw",
        transform: "rotate(2deg)",
        used: false
    },
    {
        top: "16vw",
        left: "70vw",
        transform: "rotate(-3deg)",
        used: false
    },
    {
        top: "12vw",
        left: "57vw",
        transform: "rotate(1deg)",
        used: false
    },
    {
        top: "31vw",
        left: "77vw",
        transform: "rotate(8deg)",
        used: false
    },
    {
        top: "33vw",
        left: "60vw",
        transform: "rotate(5deg)",
        used: false
    },
    {
        top: "27vw",
        left: "48vw",
        transform: "rotate(-6deg)",
        used: false
    }
]
r1p10_dropped_correct = (drag, drop) => {
    // disable item dragging
    drag.draggable("option", "disabled", true);
    // vertical position
    if (drop.hasClass("folder")) {
        counter_r1p10_folder++;
        drag.animate({width: `5vw`}, 100, function() {
            switch_class(drag, "block", "none");
        })
    } else if (drop.hasClass("trash")) {
        counter_r1p10_trash++;
        drag.attr("src", `assets/media/exer3/pieceofshit${counter_r1p10_trash}.svg`);
        drag.css("width", "7vw");
    }
    // winning
    if ((counter_r1p10_folder === $(`#${matrix[nRoom][nPage].divName} .drag-1`).length) && ((counter_r1p10_trash === $(`#${matrix[nRoom][nPage].divName} .drag-2`).length))) {
        V_X(true);
    } 
}


restart_1 = () => {
    // r1p3
    switch_class($("#r1p3 .item"), "hidden", "visible");

    // r1p7
    counter_r1p7_signs_order = 0
    $("#r1p7 .board").addClass("empty");
    arr_r1p7_signs_order = [];
    // new signs order
    for (let i = 0; i < $("#r1p7 .sign").length ; i++) {
        let random = Math.floor(Math.random() * $("#r1p7 .sign").length) + 1;
        while (arr_r1p7_signs_order.includes(random)) {
            random = Math.floor(Math.random() * $("#r1p7 .sign").length) + 1;
        }
        arr_r1p7_signs_order[i] = random;
    }
    console.log(arr_r1p7_signs_order);
    // signs return to original location
    $("#r1p7 .sign").css({top: "38vw", left: "42.5vw"});
    // signs dissappear accept from the first
    for (let i = 2; i <= $("#r1p7 .sign").length ; i++) {
        switch_class($(`#r1p7 .drag.data-num-${i}`), "none", "block");
    }

    // r1p10
    counter_r1p10_folder = 0;
    counter_r1p10_trash = 0;
    $("#r1p10 .drag-2").css({width: "10.5vw"});
    $("#r1p10 .data-num-2.drag-2").attr("src", `assets/media/exer3/exer3_bikurofe.svg`);
    $("#r1p10 .data-num-2.drag-6").attr("src", `assets/media/exer3/exer3_kabala.svg`);
    // new files order
    for (let i = 0; i < arr_r1p10_files_order.length ; i++) {
        arr_r1p10_files_order[i].used = false;
    }
    for (let i = 0; i < arr_r1p10_files_order.length ; i++) {
        let random = Math.floor(Math.random() * arr_r1p10_files_order) + 1;
        while (arr_r1p10_files_order[random].used) {
            random = Math.floor(Math.random() * arr_r1p10_files_order) + 1;
        }
        (`#r1p10 .file.data-num-${i}`).css({top: arr_r1p10_files_order[random].top, left: arr_r1p10_files_order[random].left, transform: arr_r1p10_files_order[random].transform});
        arr_r1p10_files_order[random].used = true;
    }
}
