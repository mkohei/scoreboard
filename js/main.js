var labs = { shimizu: "清水", shinomori: "篠森", kurihara: "栗原", nakahara: "中原", hamamura: "濱村", fukumoto: "福本", yokoyama: "横山" };
var games = { mk8: "マリオカート8", sm: "大乱闘スマッシュブラザーズ", gb: "Gang Beasts" }


$(function() {
    $('#Container').mixItUp();
});
set_calc_score_onchange();


/* without save button */
var inputs = document.getElementsByClassName("input-score");
console.log(inputs);


function set_calc_score_onchange() {
    for (lab in labs) {
        for (game in games) {
            $('#' + lab + '-' + game).change(function() {
                var sum_score = 0;
                var lab = this.parentNode.id
                for (game in games) {
                    sum_score += Number(document.getElementById(lab + "-" + game).value);
                }
                document.getElementById(lab).setAttribute("data-myorder", sum_score);
            })
        }
    }
}


function set_test_score() {
    for (lab in labs) {
        for (game in games) {
            var randnum = Math.floor(Math.random() * 100);
            document.getElementById(lab + "-" + game).value = randnum;
        }
    }
    calc_score();
}


function calc_score() {
    for (lab in labs) {
        var sum_score = 0;
        for (game in games) {
            sum_score += Number(document.getElementById(lab + "-" + game).value);
        }
        //document.getElementById(lab + "-sumscore").innerText = sum_score
        document.getElementById(lab).setAttribute("data-myorder", sum_score);
    }
}

document.getElementById("set_test_data_button").onclick = function() {
    set_test_score();
}