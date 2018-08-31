var labs = { shimizu: "清水", shinomori: "篠森", kurihara: "栗原", nakahara: "中原", hamamura: "濱村", fukumoto: "福本", yokoyama: "横山" };
var games = { mk: "マリオカート8", sb: "大乱闘スマッシュブラザーズ", gb: "Gang Beasts" };
var ordercolor = ['#FFD70080', '#C0C0C080', '#C4722280'];
var orderimg = ['src/1-3.png', 'src/2.png', 'src/3.png'];

var scorelist = {};

update_score();


$(function() {
    $('#Container').mixItUp();
});


function deco_order() {
    var scorevals = [];
    for (key in scorelist) {
        scorevals.push(scorelist[key]);
    }
    var scorevals = Array.from(new Set(scorevals));
    console.log(scorevals);
    scorevals.sort(function(a, b) {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    });
    console.log(scorevals);
    cnt = 0;
    for (i in scorevals) {
        for (key in scorelist) {
            if (scorelist[key] == scorevals[i]) {
                var ele = document.getElementById(key);
                ele.style.backgroundColor = ordercolor[i];
                var ele = document.getElementById(key + "-order-deco");
                ele.src = orderimg[i];
                cnt++;
            }
        }
        console.log(i, cnt);
        if (cnt > 2) break;
    }
}

function deco_null() {
    for (lab in labs) {
        var ele = document.getElementById(lab);
        ele.style.backgroundColor = '#FFFFFFFF';
        console.log(lab + "-order-deco");
        var ele = document.getElementById(lab + "-order-deco");
        ele.src = 'src/white.png';
    }
}


function update_score() {
    $.getJSON('score.json', function(data) {
        for (lab in data) {
            const scores = data[lab];
            sum = 0;
            for (game in scores) {
                var id = lab + "-" + game;
                document.getElementById(id).value = scores[game];
                sum += scores[game];
            }
            scorelist[lab] = sum;
            console.log(lab, sum);
            document.getElementById(lab + "-sumscore").innerText = sum;
            document.getElementById(lab).setAttribute("data-myorder", sum);
        }
    });
}


document.getElementById("update-button").onclick = update_score;
document.getElementById("default-order").onclick = deco_null;
document.getElementById("ranking-order").onclick = deco_order;