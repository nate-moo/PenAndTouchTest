// collapsing sidebar
let sel = document.querySelector("#fs");
let collapse = document.querySelector("#coll");
let parentEl = document.querySelector("#par");

sel.addEventListener("click", function (e) {
    console.log("col")
    collapse.classList.toggle("hidden");
    if (sel.innerHTML == "&lt;") {
        sel.innerHTML = "&gt;"
    } else {
        sel.innerHTML = "&lt;"
    }
})