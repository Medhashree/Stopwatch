let hr = 0;
let min = 0;
let sec = 0;
let count = 0;
let lapCount = 0;

let row;

let hr_str;
let min_str;
let sec_str;
let count_str;

let prev_hr = 0;
let prev_min = 0;
let prev_sec = 0;
let prev_count = 0;


let timer = false;

function start() {
    timer = true;
    document.querySelector("#pause").style.display = 'block';
    document.querySelector("#lap").style.display = 'block';
    document.querySelector("#start").style.display = 'none';

    const el = document.createElement('table');
    el.classList.add('lap-table');
    document.querySelector(".lap-container").appendChild(el);

    stopwatch();
}

function pause() {
    timer = false;
    document.querySelector("#pause").style.display = 'none';
    document.querySelector("#resume").style.display = 'block';
    document.querySelector("#reset").style.display = 'block';
    document.querySelector("#lap").style.display = 'none';
}

function lap() {
    let curr_hr = (hr - prev_hr) < 10 ? '0' + (hr - prev_hr) : (hr - prev_hr);
    let curr_min = (min - prev_min) < 10 ? '0' + (min - prev_min) : (min - prev_min);
    let curr_sec = (sec - prev_sec) < 10 ? '0' + (sec - prev_sec) : (sec - prev_sec);
    let curr_count = (count > prev_count) ? (count - prev_count) : (prev_count - count);
    curr_count = (curr_count < 10) ? '0' + curr_count : curr_count;

    var table = document.querySelector(".lap-table");

    row = table.insertRow(lapCount);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = '0' + (lapCount + 1);
    cell2.innerHTML = hr_str + ':' + min_str + ':' + sec_str + ':' + count_str;
    cell3.innerHTML = '+' + curr_hr + ':' + curr_min + ':' + curr_sec + ':' + curr_count;


    lapCount += 1;
    prev_hr = hr;
    prev_min = min;
    prev_sec = sec;
    prev_count = count;

}


function resume() {
    timer = true;
    document.querySelector("#resume").style.display = 'none';
    document.querySelector("#pause").style.display = 'block';
    document.querySelector("#lap").style.display = 'block';
    document.querySelector("#reset").style.display = 'none';
    stopwatch();
}

function reset() {
    timer = false;

    hr = 0;
    min = 0;
    sec = 0;
    count = 0;

    document.querySelector("#start").style.display = 'block';
    document.querySelector("#reset").style.display = 'none';
    document.querySelector("#resume").style.display = 'none';

    document.querySelector("#hr").innerHTML = '00';
    document.querySelector("#min").innerHTML = '00';
    document.querySelector("#sec").innerHTML = '00';
    document.querySelector("#count").innerHTML = '00';

    document.querySelector(".lap-table").remove();
    lapCount = 0;
    prev_hr = 0;
    prev_min = 0;
    prev_sec = 0;
    prev_count = 0;
}

function stopwatch() {

    if (timer == true) {
        count += 1;

        if (count == 100) {
            count = 0;
            sec += 1;
        }

        if (sec == 60) {
            sec = 0;
            min += 1;
        }

        if (min == 60) {
            min = 0;
            sec = 0;
            hr += 1;
        }

        hr_str = hr;
        min_str = min;
        sec_str = sec;
        count_str = count;

        if (hr < 10) {
            hr_str = '0' + hr;
        }

        if (min < 10) {
            min_str = '0' + min;
        }

        if (sec < 10) {
            sec_str = '0' + sec;
        }

        if (count < 10) {
            count_str = '0' + count;
        }

        // this will constantly call the stopwatch every 10 milliseconds
        // we are showing 100 parts here after seconds (1 ms is for 1000 parts in 1 sec), so 10 milliseconds
        setTimeout("stopwatch()", 10);

        document.querySelector("#hr").innerHTML = hr_str;
        document.querySelector("#min").innerHTML = min_str;
        document.querySelector("#sec").innerHTML = sec_str;
        document.querySelector("#count").innerHTML = count_str;
    }

}