var scroll;

window.onload = function() {
    DisplayDarkMode();
    document.getElementById("preloader").style.opacity = "0";

    scroll = new LocomotiveScroll({
        el: document.getElementById('body'),
        smooth: true,
        lerp: 0.075,
        touchMultiplier: 4,
        /*         smartphone: {
                    smooth: true,
                    lerp: 0.075
                },
                tablet: {
                    smooth: true,
                    lerp: 0.075
                }, */

    });

    setTimeout(() => {
        $("#preloader").remove();
        document.getElementById("body").style.opacity = "1";

        if (localStorage.getItem("Name") != null) {
            $("#UserNameChangeBtn").text("Edit");
            UpdateName();
            updateNameModal();
        }
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

    let classes = ["bg-green shadow-green", "bg-red shadow-red", "bg-yellow shadow-yellow", "bg-blue-05"];

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

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function SubscribeToNewsLetter() {
    var link = "https://script.google.com/macros/s/AKfycbyZ92WcGwRnI0ndx1M5zy3OukWV4uzcat4FpVv9RvHOZo_JQa4/exec";
    const form = document.getElementsByClassName('SubscribeToNewsLetter');
    const btn = document.getElementById('SubscribeToNewsLetterBtn');


    if (validateEmail($("[name='email']").val())) {
        fetch(link, {
            method: 'POST',
            body: new FormData(form[0])
        }).then(
            $("[name='email']").val(""),
            DisplayMsg(0, 'Congratulations!', 'You Are Subscribed To Our News Letter', 4000, 'b'),
            SetSubscribeCookie()
        )
    } else {
        DisplayMsg(1, 'Invalid Email!', 'Please Enater A Valid Email', 4000, 'b');
    }


}


function SaveUserName() {
    SetNameCookie($("#UserName").val());
    UpdateName();
}

function updateNameModal() {
    $("#UserNameModalTitle").text("Edit Your Full Name");
    $("#UserName").val(localStorage.getItem("Name"));
    $("#CreateNameBtn").text("Update");
}

function UpdateName() {
    if (localStorage.getItem("Name") != "")
        $("#dropdownMenuButton").text(localStorage.getItem("Name") + "	");
}

function ToggleDarkMode() {
    var val = GetDarkModeCookie();
    if (val == "false")
        val = true;
    else
        val = false;

    SetDarkModeCookie(val);
    DisplayDarkMode();
}

function DisplayDarkMode() {
    var DarkMode = GetDarkModeCookie();
    if (DarkMode == "true") {
        ChangeColor("dark");
    } else {
        ChangeColor("light");
    }
}

function ChangeColor(targetTheme) {
    /* To check for spelling errors */
    if (targetTheme == "dark") {
        targetTheme = "dark";
    } else {
        targetTheme = "light";
    }
    document.documentElement.setAttribute('data-theme', targetTheme)
}


function SetSubscribeCookie() {
    localStorage.setItem("isSubscribe", val);
}

function SetNameCookie(val) {
    if (localStorage.getItem("Name") != null) {
        DisplayMsg(0, 'Updated!', 'Name Updated Successfully', 4000, 'b');
    } else {
        DisplayMsg(0, 'Created!', 'New Name Created', 4000, 'b');
    }
    localStorage.setItem("Name", val);
}

function SetDarkModeCookie(val) {
    localStorage.setItem("DarkMode", val);
}

function GetDarkModeCookie() {
    if (localStorage.getItem("DarkMode") != null) {
        if (localStorage.getItem("DarkMode") == "true") {
            $("#DarkMode").text("Light Mode");
        } else {
            $("#DarkMode").text("Dark Mode");
        }
        return localStorage.getItem("DarkMode");
    } else {
        $("#DarkMode").text("Dark Mode");
        SetDarkModeCookie(false);
        return false;
    }
}