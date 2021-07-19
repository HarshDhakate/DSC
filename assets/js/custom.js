var scroll;

window.onload = function() {
    document.getElementById("preloader").style.opacity = "0";

    scroll = new LocomotiveScroll({
        el: document.getElementById('body'),
        smooth: true,
        lerp: 0.075,
        smartphone: {
            smooth: true,
            lerp: 0.15
        },
        tablet: {
            smooth: true,
            lerp: 0.15
        },

    });

    setTimeout(() => {
        $("#preloader").remove();
        document.getElementById("body").style.opacity = "1";
    }, 500);
}



function ToogleMenu() {
    $(".navbar-nav").toggleClass("Nav-Display-None");
    document.getElementsByClassName("nav-item")[OnloadPage].classList.add("active");
}

function ScrollToTop() {
    scroll.scrollTo("top");
}

async function DisplayMsg(cssClass, HeadingText, ContentText, timer, pos) {

    /* cssClass => 0 - sucess
                => 1 - danger
                => 2 - warning
                => 3 - info
    */

    /* 
        pos => t -top
            => b - bottom

    */

    let classes = ["bg-green", "bg-red shadow-red", "bg-yellow", "bg-blue-05"];

    if (pos == "t") {
        $("#AlertMsg").css("top", "0px");
        $("#AlertMsg").css("bottom", "");
    } else {
        $("#AlertMsg").css("bottom", "0px");
        $("#AlertMsg").css("top", "");
    }



    classes.forEach(element => {
        $("#AlertMsg").removeClass(element);
    });

    $("#AlertMsg").addClass("show " + classes[cssClass]);
    $("#DisplayAlertHeading").text(HeadingText);
    $("#DisplayAlertContent").text(ContentText);

    /* To Remove DisplayMsg After Sometime */
    if (timer != 0) {
        removeDisplayMsg(timer);
    }
}

var DisplayMsgTimer;
/* To Remove DisplayMsg */
async function removeDisplayMsg(x) {
    clearTimeout(DisplayMsgTimer);
    DisplayMsgTimer = setTimeout(() => {
        if ($("#AlertMsg").css("top") == "0px") {
            $("#AlertMsg").css("top", "-100px");
            $("#AlertMsg").css("bottom", "");
        } else {
            $("#AlertMsg").css("bottom", "-100px");
            $("#AlertMsg").css("top", "");
        }
        $("#AlertMsg").removeClass("show");
    }, x);
}


function ToggleFullscreen() {
    const btn = $("#fullscreen");

    if (!document.fullscreenElement) {
        document.body.requestFullscreen();
        btn.text("Exit Full Screen");
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            btn.text("Full Screen");
        }
    }
}