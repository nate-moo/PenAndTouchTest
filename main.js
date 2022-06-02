function setup() {
    var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    console.log(dimension);
    var c = document.getElementById("canvas");
    c.width = dimension[0];
    c.height = dimension[1];
}

setup();

document.addEventListener('resize', setup());

var c = document.getElementById("canvas");
var ctx = c.getContext('2d');
var penColor;


document.querySelector("#PenColor").addEventListener("change", function(e) {
    penColor = e.target.value;
})

const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

let ongoingTouches;
let forces = [];

c.addEventListener("pointerdown", function(event) {
    let ctx = c.getContext("2d");
    // document.querySelector("#iType").innerHTML = event.pointerType;
    switch (event.pointerType) {
        case 'pen':
            event.preventDefault();
            ctx.beginPath();
            ctx.moveTo(event.clientX, event.clientY);
            ongoingTouches = event;
            break;
        case 'touch':
            event.preventDefault();
            ctx.beginPath();
            ctx.moveTo(event.clientX, event.clientY);
            ongoingTouches = event;
            break;
        }
})
c.addEventListener("pointermove", function(e) {
    switch (e.pointerType) {
        case 'pen':
            if (e.pressure != 0) {
                let ctx = c.getContext("2d");
                const idx = ongoingTouches;
                ctx.globalAlpha = e.pressure * 10;
                ctx.beginPath();
                ctx.moveTo(idx.clientX, idx.clientY);
                ctx.lineTo(e.clientX, e.clientY);
                ctx.lineWidth = e.tiltX/15;
                ctx.strokeStyle = penColor;
                ctx.stroke();
            }

        case 'touch':
            let ctx = c.getContext("2d");
            const idx = ongoingTouches;
            console.log(e);
            ctx.beginPath();
            ctx.moveTo(idx.clientX, idx.clientY);
            ctx.lineTo(e.clientX, e.clientY);
            ongoingTouches = e;
            ctx.strokeStyle = penColor;
            ctx.stroke();
        }

})
c.addEventListener("pointerup", function(e) {
    switch (e.pointerType) {
        case 'pen':
            ongoingTouches = null;
            break;
        case 'touch':
            ongoingTouches = null;
            break;
        }
})