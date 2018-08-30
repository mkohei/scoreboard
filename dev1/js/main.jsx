const labs = { shimizu: "清水", shinomori: "篠森", kurihara: "栗原", nakahara: "中原", hamamura: "濱村", fukumoto: "福本", yokoyama: "横山" };
const games = { mk: "マリオカート8", sb: "大乱闘スマッシュブラザーズ", gb: "Gang Beasts" };

function ScoreList(props) {
    console.log(props);
    const scores = props.scores;
    const listItems = scores.map((score) => <Score score={score} />);
    return (<ul>{listItems}</ul>);
}

function Score(props) {
    console.log(props);
    const score = props.score;
    return (
        <li id={score.lab} className="mix" data-myorder="1">
            <div className="labname">{labs[score.lab]}研究室</div>
            <div id={score.lab + "-sumscore"}>0</div>
            <div id={score.lab + "-mk"}>{games.mk} : {score.mk}</div>
            <div id={score.lab + "-sb"}>{games.sb} : {score.sb}</div>
            <div id={score.lab + "-gb"}>{games.gb} : {score.gb}</div>
        </li>
    )
}


$(function() {
    $('#Container').mixItUp();
});

$.getJSON('score2.json', function(data) {
    console.log(data);
    ReactDOM.render(
        <ScoreList scores={data}/>,
        document.getElementById('Container')
    );
});

