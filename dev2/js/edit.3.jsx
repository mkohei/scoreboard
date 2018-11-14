// *********************
// ***** variables *****
// *********************
var json = {};



// *********************
// ***** constants *****
// *********************
//const url = 'score.json';
const url = 'http://localhost:3000/labs';
// TODO:
const puturl = 'localhost:8080'



// **************************
// ***** react elements *****
// **************************
class EditList extends React.Component {
    constructor(props) {
        super(props);

        this.state = props;

        this.changeSelection = this.changeSelection.bind(this);
        this.putScores = this.putScores.bind(this);
    }

    changeSelection(id) {
        const newlabs = this.state.labs.map((lab) => ({
            id : lab.id,
            name : lab.name,
            score : lab.score,
            enable : lab.id === id ? !lab.enable : lab.enable
        }));
        this.setState({labs: newlabs});
    }

    putScores() {

    }

    render() {
        const _items = this.state.labs.map((lab) =>
            (
                <li id={lab.id} className="item">
                    <input id={"checkbox" + lab.id} className="checkbox" type="checkbox" onClick={() => this.changeSelection(lab.id)} checked={lab.enable} />
                    <div className="labname">{lab.name}研究室</div>
                    <ul>
                        <li>
                            <div>マリオカート</div>
                            <input type="number" value={lab.score.mk} disabled />
                            <input id={"mk" + lab.id} type="number" placeholder="変更後" />
                        </li>
                        <li>
                            <div>大乱闘スマッシュブラザーズ</div>
                            <input type="number" value={lab.score.sb} disabled />
                            <input id={"sb" + lab.id} type="number" placeholder="変更後" />
                        </li>
                        <li>
                            <div>Gang Beasts</div>
                            <input type="number" value={lab.score.gb} disabled />
                            <input id={"gb" + lab.id} type="number" placeholder="変更後" />
                        </li>
                    </ul>
                </li>
            )
        );
        return (
            <div>
                <button id="post_button" onClick={this.putScores()}>POST</button>
                <ul>
                    {_items}
                </ul>
            </div>
        );
    }
}



// ****************
// ***** main *****
// ****************
$(function() {
    $.getJSON(url, function(data) {
        json = data;
        console.log(data);
        ReactDOM.render(
            <EditList labs={data}/>,
            document.getElementById('Container')
        );
    });
})