var scroll;

window.onload = function() {
    document.getElementById("preloader").style.opacity = "0";

    scroll = new LocomotiveScroll({
        el: document.getElementById('body'),
        smooth: true,
        smartphone: {
            smooth: true,
            lerp: 0.1
        },
        tablet: {
            smooth: true,
            lerp: 0.08
        },
        lerp: 0.1
    });

    setTimeout(() => {
        $("#preloader").remove();
        document.getElementById("body").style.opacity = "1";
    }, 500);
}