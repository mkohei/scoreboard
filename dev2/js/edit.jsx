// *********************
// ***** variables *****
// *********************



// *********************
// ***** constants *****
// *********************
const url = './api/';



// **************************
// ***** react elements *****
// **************************
function ScoreList(props) {
    const labs = props.labs;
    const _items = labs.map((lab) => <Score lab={lab}/>);
    return (
        <ul>
            {_items}
        </ul>
    );
}


function Score(props) {
    const lab = props.lab;
    const checked = lab.enable ? "checked" : null;
    return (
        <li>
            <input className="check" type="checkbox" checked={checked}/>
            <div className="labname">{lab.name}研究室</div>
            <ul>
                <li>
                    <div>マリオカート</div>
                    <input type="text" value={lab.score.mk} disabled/>
                    <input type="text" placeholder="変更後"/>
                </li>
                <li>
                    <div>大乱闘スマッシュブラザーズ</div>
                    <input type="text" value={lab.score.sb} disabled/>
                    <input type="text" placeholder="変更後"/>
                </li>
                <li>
                    <div>Gang Beasts</div>
                    <input type="text" value={lab.score.gb} disabled/>
                    <input type="text" placeholder="変更後"/>
                </li>
            </ul>
        </li>
    );
}





// *********************
// ***** functions *****
// *********************



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
    })
});