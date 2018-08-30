var labs = { shimizu: "清水", shinomori: "篠森", kurihara: "栗原", nakahara: "中原", hamamura: "濱村", fukumoto: "福本", yokoyama: "横山" };
var games = { mk: "マリオカート8", sb: "大乱闘スマッシュブラザーズ", gb: "Gang Beasts" }

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
    scorevals.sort();

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
            document.getElementById(lab + "-sumscore").innerText = sum;
            document.getElementById(lab).setAttribute("data-myorder", sum);
        }
        deco_order();
    });
}


document.getElementById("update-button").onclick = update_score;