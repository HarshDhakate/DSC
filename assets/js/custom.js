var scroll;

window.onload = function() {
    document.getElementById("preloader").style.opacity = "0";

    setTimeout(() => {
        $("#preloader").remove();
        document.getElementById("body").style.opacity = "1";
        scroll = new LocomotiveScroll({
            el: document.getElementById('body'),
            smooth: true,
            lerp: 0.08
        });
    }, 500);
}