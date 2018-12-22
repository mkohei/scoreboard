// *********************
// ***** variables *****
// *********************
var json = {};



// *********************
// ***** constants *****
// *********************
const url = './api/';

const bg_colors = {
    true: "FF0000",
    false: "FFFFFF"
};

// **************************
// ***** react elements *****
// **************************
class EditList extends React.Component {
    constructor(props) {
        super(props);

        this.state = props;

        this.changeSelection = this.changeSelection.bind(this);
        this.putScores = this.putScores.bind(this);
        this.init = this.init.bind(this);
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

    init() {
        this.state.labs.map(lab => {
            const sum = lab.score.mk + lab.score.sb + lab.score.gb;
            if (sum > 0) {
                this.putScores({
                    id: lab.id,
                    name: lab.name,
                    score: {
                        mk: 0,
                        sb: 0,
                        gb: 0
                    },
                    enable: lab.enable
                });
            } else {
            }
        })
    }

    putScores(lab) {
        const mkval = this.refs['mk' + lab.id + 'after'].value;
        const sbval = this.refs['sb' + lab.id + 'after'].value;
        const gbval = this.refs['gb' + lab.id + 'after'].value;
        const new_mk = mkval === "" ? lab.score.mk : +mkval;
        const new_sb = sbval === "" ? lab.score.sb : +sbval;
        const new_gb = gbval === "" ? lab.score.gb : +gbval;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id : lab.id,
                name: lab.name,
                score: {
                    mk: +new_mk,
                    sb: +new_sb,
                    gb: +new_gb,
                },
                enable: lab.enable
            })
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log(json);
             return this.state.labs.map(lab => ({
                id: lab.id,
                name: lab.name,
                score: json.id ==lab.id
                            ? json.score
                            : lab.score,
                enable: json.id == lab.id
                            ? json.enable
                            : lab.enable
            }));
        }).then(labs => {
            this.setState({labs: labs});
        });
    }

    render() {
        const _items = this.state.labs.map((lab) =>
            (
                <li id={lab.id} className={"item " + "item_"+lab.enable}>
                    <input id={"checkbox" + lab.id} className="checkbox" type="checkbox" onClick={() => this.changeSelection(lab.id)} checked={lab.enable} />
                    <div className="labname">{lab.name}研究室</div>
                    <button className="savebutton" onClick={
                        () => this.putScores(lab)
                    }>SAVE</button>
                    <ul>
                        <li>
                            <div>マリオカート</div>
                            <input type="text" value={"変更前 : " + lab.score.mk} disabled />
                            <input id={"mk" + lab.id} type="number" placeholder="変更後" ref={"mk" + lab.id + "after"} />
                        </li>
                        <li>
                            <div>大乱闘スマッシュブラザーズ</div>
                            <input type="text" value={"変更前 : " + lab.score.sb} disabled />
                            <input id={"sb" + lab.id} type="number" placeholder="変更後" ref={"sb" + lab.id + "after"} />
                        </li>
                        <li>
                            <div>Gang Beasts</div>
                            <input type="text" value={"変更前 : " + lab.score.gb} disabled />
                            <input id={"gb" + lab.id} type="number" placeholder="変更後" ref={"gb" + lab.id + "after"} />
                        </li>
                    </ul>
                </li>
            )
        );
        return (
            <div>
                <button id="init_button"  onClick={this.init}>init score</button>
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
        console.log(data);
        ReactDOM.render(
            <EditList labs={data}/>,
            document.getElementById('Container')
        );
    });
})