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

            /*             document.getElementById("BottomIcon").innerHTML = "<svg version='1.2' height='42' class='mr-2' baseProfile='tiny' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'	 x='0px' y='0px' viewBox='0 0 1080 1080' overflow='visible' xml:space='preserve'><g>	<path fill='#FFFFFF' d='M486.9,668.6c0.7,55.5-57.7,89.9-107,62.1c-69.5-39.2-138.3-79.6-207.4-119.4		c-13.6-7.8-27.2-15.5-40.8-23.4c-36-20.8-48.2-63.3-28.3-98.7c19.3-34.2,62.6-46.3,98-26c83.7,47.7,167.1,95.9,250.4,144.3		C474.9,620.8,486.4,641.8,486.9,668.6z'/>	<path fill='#FFFFFF' d='M986.3,524.7c-0.2,54.6-57.3,89.3-104.9,62.5c-84.7-47.8-168.8-96.6-252.8-145.6		c-34.7-20.2-45.2-62.8-25.7-97.2c18.9-33.5,62.4-45.9,97.2-26.1c84.5,48.2,168.6,96.8,252.5,145.9		C975.2,477.3,986.4,498.3,986.3,524.7z'/>	<path fill='#FFFFFF' d='M898.7,616.5c-19.4,11.3-38.5,22.6-57.8,33.7c-46.1,26.7-92.3,53.4-138.5,79.8		c-42.8,24.5-93,4.2-106.4-42.6c-7.9-27.7,2.4-60.4,27.3-75.8c40.7-25.2,82.6-48.6,124.3-72.1c3.4-1.9,10.3-0.4,14.3,1.8		c33.6,18.9,66.7,38.5,100.3,57.4C873.4,605.1,885.3,610.1,898.7,616.5z'/>	<path fill='#FFFFFF' d='M183.2,431.9c66.4-38.2,133.1-77.6,200.8-115.4c32.9-18.3,75.2-4.5,93.7,27.6c18.9,32.8,9.3,76-23.3,95.8		c-39.8,24.2-80.5,47-121.1,69.9c-3.2,1.8-9.4,0.8-13-1.1c-20.8-11.4-41.2-23.6-61.9-35.2C233.6,459.5,208.5,445.9,183.2,431.9z'/></g></svg> DSC UVPCE ";

                        document.getElementById("NavbarIcon").innerHTML = "<svg version='1.2' height='60' baseProfile='tiny' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'	 x='0px' y='0px' viewBox='0 0 1080 1080' overflow='visible' xml:space='preserve'><g>	<path fill='#FFFFFF' d='M486.9,668.6c0.7,55.5-57.7,89.9-107,62.1c-69.5-39.2-138.3-79.6-207.4-119.4		c-13.6-7.8-27.2-15.5-40.8-23.4c-36-20.8-48.2-63.3-28.3-98.7c19.3-34.2,62.6-46.3,98-26c83.7,47.7,167.1,95.9,250.4,144.3		C474.9,620.8,486.4,641.8,486.9,668.6z'/>	<path fill='#FFFFFF' d='M986.3,524.7c-0.2,54.6-57.3,89.3-104.9,62.5c-84.7-47.8-168.8-96.6-252.8-145.6		c-34.7-20.2-45.2-62.8-25.7-97.2c18.9-33.5,62.4-45.9,97.2-26.1c84.5,48.2,168.6,96.8,252.5,145.9		C975.2,477.3,986.4,498.3,986.3,524.7z'/>	<path fill='#FFFFFF' d='M898.7,616.5c-19.4,11.3-38.5,22.6-57.8,33.7c-46.1,26.7-92.3,53.4-138.5,79.8		c-42.8,24.5-93,4.2-106.4-42.6c-7.9-27.7,2.4-60.4,27.3-75.8c40.7-25.2,82.6-48.6,124.3-72.1c3.4-1.9,10.3-0.4,14.3,1.8		c33.6,18.9,66.7,38.5,100.3,57.4C873.4,605.1,885.3,610.1,898.7,616.5z'/>	<path fill='#FFFFFF' d='M183.2,431.9c66.4-38.2,133.1-77.6,200.8-115.4c32.9-18.3,75.2-4.5,93.7,27.6c18.9,32.8,9.3,76-23.3,95.8		c-39.8,24.2-80.5,47-121.1,69.9c-3.2,1.8-9.4,0.8-13-1.1c-20.8-11.4-41.2-23.6-61.9-35.2C233.6,459.5,208.5,445.9,183.2,431.9z'/></g></svg>";

                        try {
                            document.getElementById("HeroIcon").innerHTML = "<svg version='1.2' height='70' class='mr-3' baseProfile='tiny' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'	 x='0px' y='0px' viewBox='0 0 1080 1080' overflow='visible' xml:space='preserve'><g>	<path fill='#FFFFFF' d='M486.9,668.6c0.7,55.5-57.7,89.9-107,62.1c-69.5-39.2-138.3-79.6-207.4-119.4		c-13.6-7.8-27.2-15.5-40.8-23.4c-36-20.8-48.2-63.3-28.3-98.7c19.3-34.2,62.6-46.3,98-26c83.7,47.7,167.1,95.9,250.4,144.3		C474.9,620.8,486.4,641.8,486.9,668.6z'/>	<path fill='#FFFFFF' d='M986.3,524.7c-0.2,54.6-57.3,89.3-104.9,62.5c-84.7-47.8-168.8-96.6-252.8-145.6		c-34.7-20.2-45.2-62.8-25.7-97.2c18.9-33.5,62.4-45.9,97.2-26.1c84.5,48.2,168.6,96.8,252.5,145.9		C975.2,477.3,986.4,498.3,986.3,524.7z'/>	<path fill='#FFFFFF' d='M898.7,616.5c-19.4,11.3-38.5,22.6-57.8,33.7c-46.1,26.7-92.3,53.4-138.5,79.8		c-42.8,24.5-93,4.2-106.4-42.6c-7.9-27.7,2.4-60.4,27.3-75.8c40.7-25.2,82.6-48.6,124.3-72.1c3.4-1.9,10.3-0.4,14.3,1.8		c33.6,18.9,66.7,38.5,100.3,57.4C873.4,605.1,885.3,610.1,898.7,616.5z'/>	<path fill='#FFFFFF' d='M183.2,431.9c66.4-38.2,133.1-77.6,200.8-115.4c32.9-18.3,75.2-4.5,93.7,27.6c18.9,32.8,9.3,76-23.3,95.8		c-39.8,24.2-80.5,47-121.1,69.9c-3.2,1.8-9.4,0.8-13-1.1c-20.8-11.4-41.2-23.6-61.9-35.2C233.6,459.5,208.5,445.9,183.2,431.9z'/></g></svg>DSC UVPCE";
                        } catch {

                        } */


        } else {
            $("#DarkMode").text("Dark Mode");

            /*             document.getElementById("BottomIcon").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='42' class='mr-2' viewBox='0 0 816 816'><rect width='816' height='816' fill='none'/><path d='M66.9,394.2c5.6-22.3,20.7-35.3,41.9-42.2,15.7-7,30.6-4.6,44.8,4.2,26.4,16.2,57.6,25.1,78.2,50.4l101.6,60.1c32.5,19.3,42.8,50.9,26.1,79.6s-48.2,35-80.1,16.9C217.7,528.3,156.5,492.5,95,457.3c-14.4-8.3-24.1-20-28.1-36.2' transform='translate(0.3 0.3)' fill='#5186eb'/><path d='M748.5,410.6c-1.6,28-17.9,44.3-43.5,52.7-9.1,3.2-18.8,7.1-27.9,3.1-34-15-67.9-30.6-94.7-57.6-33.7-20-67.5-40-101.1-60.1s-43.3-50.5-27.2-79.2,48.7-35.7,82.1-16.8c59.2,33.6,117.9,68.1,177.1,101.7,22.2,12.7,36.8,29.3,35.2,56.2' transform='translate(0.3 0.3)' fill='#45995e'/><path d='M231.8,406.6c-24.5-13.6-49.2-26.7-73.2-41.1-15.6-9.3-31.7-14.6-49.8-13.5,59.5-34.9,118.6-70.6,178.9-104.2,26.6-14.9,58.3-3.3,72.4,22.4s6.7,58.1-21.3,75.1C303.6,366.6,267.5,386.2,231.8,406.6Z' transform='translate(0.3 0.3)' fill='#d95040'/><path d='M582.4,408.8c23.6,13.1,47.8,25.4,70.8,39.5,16.2,9.9,32.9,15.8,51.8,15-58.7,34.5-117.1,69.6-176.3,103.2-27,15.2-58,5.8-73.5-19.4s-9.4-58.5,18.1-75.6C508.9,449.4,546,429.6,582.4,408.8Z' transform='translate(0.3 0.3)' fill='#f0bb41'/></svg>DSC UVPCE";

                        document.getElementById("NavbarIcon").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='60' viewBox='0 0 816 816'><rect width='816' height='816' fill='none'/><path d='M66.9,394.2c5.6-22.3,20.7-35.3,41.9-42.2,15.7-7,30.6-4.6,44.8,4.2,26.4,16.2,57.6,25.1,78.2,50.4l101.6,60.1c32.5,19.3,42.8,50.9,26.1,79.6s-48.2,35-80.1,16.9C217.7,528.3,156.5,492.5,95,457.3c-14.4-8.3-24.1-20-28.1-36.2' transform='translate(0.3 0.3)' fill='#5186eb'/><path d='M748.5,410.6c-1.6,28-17.9,44.3-43.5,52.7-9.1,3.2-18.8,7.1-27.9,3.1-34-15-67.9-30.6-94.7-57.6-33.7-20-67.5-40-101.1-60.1s-43.3-50.5-27.2-79.2,48.7-35.7,82.1-16.8c59.2,33.6,117.9,68.1,177.1,101.7,22.2,12.7,36.8,29.3,35.2,56.2' transform='translate(0.3 0.3)' fill='#45995e'/><path d='M231.8,406.6c-24.5-13.6-49.2-26.7-73.2-41.1-15.6-9.3-31.7-14.6-49.8-13.5,59.5-34.9,118.6-70.6,178.9-104.2,26.6-14.9,58.3-3.3,72.4,22.4s6.7,58.1-21.3,75.1C303.6,366.6,267.5,386.2,231.8,406.6Z' transform='translate(0.3 0.3)' fill='#d95040'/><path d='M582.4,408.8c23.6,13.1,47.8,25.4,70.8,39.5,16.2,9.9,32.9,15.8,51.8,15-58.7,34.5-117.1,69.6-176.3,103.2-27,15.2-58,5.8-73.5-19.4s-9.4-58.5,18.1-75.6C508.9,449.4,546,429.6,582.4,408.8Z' transform='translate(0.3 0.3)' fill='#f0bb41'/></svg>";

                        try {
                            document.getElementById("HeroIcon").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='70' class='mr-3' viewBox='0 0 816 816'><rect width='816' height='816' fill='none'/><path d='M66.9,394.2c5.6-22.3,20.7-35.3,41.9-42.2,15.7-7,30.6-4.6,44.8,4.2,26.4,16.2,57.6,25.1,78.2,50.4l101.6,60.1c32.5,19.3,42.8,50.9,26.1,79.6s-48.2,35-80.1,16.9C217.7,528.3,156.5,492.5,95,457.3c-14.4-8.3-24.1-20-28.1-36.2' transform='translate(0.3 0.3)' fill='#5186eb'/><path d='M748.5,410.6c-1.6,28-17.9,44.3-43.5,52.7-9.1,3.2-18.8,7.1-27.9,3.1-34-15-67.9-30.6-94.7-57.6-33.7-20-67.5-40-101.1-60.1s-43.3-50.5-27.2-79.2,48.7-35.7,82.1-16.8c59.2,33.6,117.9,68.1,177.1,101.7,22.2,12.7,36.8,29.3,35.2,56.2' transform='translate(0.3 0.3)' fill='#45995e'/><path d='M231.8,406.6c-24.5-13.6-49.2-26.7-73.2-41.1-15.6-9.3-31.7-14.6-49.8-13.5,59.5-34.9,118.6-70.6,178.9-104.2,26.6-14.9,58.3-3.3,72.4,22.4s6.7,58.1-21.3,75.1C303.6,366.6,267.5,386.2,231.8,406.6Z' transform='translate(0.3 0.3)' fill='#d95040'/><path d='M582.4,408.8c23.6,13.1,47.8,25.4,70.8,39.5,16.2,9.9,32.9,15.8,51.8,15-58.7,34.5-117.1,69.6-176.3,103.2-27,15.2-58,5.8-73.5-19.4s-9.4-58.5,18.1-75.6C508.9,449.4,546,429.6,582.4,408.8Z' transform='translate(0.3 0.3)' fill='#f0bb41'/></svg>DSC UVPCE";
                        } catch {

                        } */

        }
        return localStorage.getItem("DarkMode");
    } else {
        $("#DarkMode").text("Dark Mode");
        SetDarkModeCookie(false);
        return "false";
    }
}