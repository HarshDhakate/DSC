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