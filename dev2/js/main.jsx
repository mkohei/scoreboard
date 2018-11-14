// *********************
// ***** variables *****
// *********************
var state = STATE_DEFAULT;



// *********************
// ***** constants *****
// *********************
//const url = 'score.json';
const url = 'http://localhost:3000/labs';
const STATE_DEFAULT = 0;
const STATE_RANKING = 1;



// **************************
// ***** react elements *****
// **************************
function ScoreList(props) {
    console.log("ScoreList", props);
    const labs = props.labs;
    console.log(labs);
    const _desc = Score_desc()
    const _items = labs.map((lab) => <Score lab={lab}/>);
    return (
        <ul id="scorelist">
            {_desc}
            {_items}
        </ul>
    );
};


function Score_desc() {
    return (
        <li className="mix description" data-score="1E+10">
            {Icon(null)}
            {LabName("〇〇研究室")}
            {SumScore("総合得点")}
            {MK(null, null)}
            {SB(null, null)}
            {GB(null, null)}
        </li>
    );
}


function Score(props) {
    console.log("Score", props);
    const lab = props.lab;
    if (lab.enable == false) return null;
    const _icon = Icon("img" + lab.id);
    const _labname = LabName(lab.name + "研究室");
    const sumscore = lab.score.mk + lab.score.sb + lab.score.gb;
    const _sumscore = SumScore(sumscore);
    const _mk = MK(lab.score.mk, "mk" + lab.id);
    const _sb = SB(lab.score.sb, "sb" + lab.id);
    const _gb = GB(lab.score.gb, "gb" + lab.id);
    return (
        //<li className="mix" data-myorder="1">
        // TODO: data-my-order
        <li id={lab.id} className="mix" data-score={sumscore}>
            {_icon}
            {_labname}
            {_sumscore}
            {_mk}{_sb}{_gb}
        </li>
    );
};

function Icon(id) {
    // TODO: 1, 2, 3, null(white)
    return <img id={id} className="order-deco" src="src/white.png" alt="" />;
}
function LabName(labname) {
    return <div className="labname">{labname}</div>;
}
function SumScore(score) {
    return <div className="sumscore">{score}</div>;
}
function MK(score, id) {
    return <input id={id} className="input-score" type="text" placeholder="マリオカート" value={score} disabled/>;
}
function SB(score, id) {
    return <input id={id} className="input-score" type="text" placeholder="大乱闘スマッシュブラザーズ" value={score} disabled/>;
}
function GB(score, id) {
    return <input id={id} className="input-score" type="text" placeholder="Gang Beasts" value={score} disabled/>
}



// *********************
// ***** functions *****
// *********************
function deco() {
    switch(state) {
        case STATE_DEFAULT:
            deco_default();
            break;
        case STATE_RANKING:
            deco_default();
            deco_ranking();
            break;
    }
}
function deco_default() {
    const scorelist = document.getElementById('scorelist');
    for (let i=1; i<scorelist.children.length; i++) {
        const id = scorelist.children[i].id;
        document.getElementById(id).style.backgroundColor = '#FFFFFFFF';
        document.getElementById('img'+id).src = 'src/white.png';
    }
}
function deco_ranking() {
    const scorelist = document.getElementById('scorelist');
    const len = scorelist.children.length >= 4
                    ? 4
                    : scorelist.children.length;
    const colors = ['#FFD70080', '#C0C0C080', '#C4722280'];
    const icons = ['src/1-3.png', 'src/2.png', 'src/3.png'];
    for(let i=1; i<len; i++) {
        const id = scorelist.children[i].id;
        document.getElementById(id).style.backgroundColor = colors[i-1];
        document.getElementById('img'+id).src = icons[i-1];
    }
}



// ****************
// ***** main *****
// ****************
$(function() {
    $.getJSON(url, function(data) {
        console.log(data);
        ReactDOM.render(
            <ScoreList labs={data}/>,
            document.getElementById('Container')
        );

        document.getElementById('default-order').onclick = function() { state = STATE_DEFAULT };
        document.getElementById('ranking-order').onclick = function() { state = STATE_RANKING };

        $('#Container').on('mixEnd', function() { deco() });
        $('#Container').mixItUp();

        document.getElementById('update-button').onclick = () => location.reload();
    });
});
