// *********************
// ***** constants *****
// *********************
const url = 'score.json';



// **************************
// ***** react elements *****
// **************************
class EditList extends React.Component {

    constructor(props) {
        super(props);

        this.changeSelection = this.changeSelection.bind(this);

        this.state = props;
        console.log(this.state);
    }

    changeSelection(id) {
        const nextState = this.state.labs.map(function(lab) {
            return {
                id: lab.id,
                name: lab.name,
                score: lab.score,
                enable: (lab.id === id ? !lab.enable : lab.enable)
            }
        });
        this.setState({labs:nextState});
        console.log(nextState);
        console.log(this.state);
    }

    render() {
        const _items = this.state.labs.map((lab) => 
            <Edit lab={lab} changeSelection={this.changeSelection} />
        );
        return (
            <ul>
                {_items}
            </ul>
        );
    }
}


class Edit extends React.Component {

    constructor(props) {
        super(props);

        this.state = props;

        //this._changeSelection = this._changeSelection.bind(this);
    }

    _changeSelection() {
        const newlab = {
            id : this.state.lab.id,
            name : this.state.lab.name,
            score : this.state.lab.score,
            enable : !this.state.lab.enable
        };
        this.setState({
            lab: newlab,
            changeSelection: this.state.changeSelection
        });
        return this.state.changeSelection(this.state.lab.id);
    }

    render() {
        return (
            /*
            <li>
                <input className="checkbox" type="checkbox"  onClick={this.state.changeSelection(this.state.lab.id)} checked={this.state.lab.enabl}/>
                {this.state.lab.name}
            </li>
            */
           /*
           <li>
                <input className="checkbox" type="checkbox"  onClick={() => {
                    this.state.changeSelection(this.state.lab.id)
                }} checked={this.state.lab.enable}/>
                {this.state.lab.name}
            </li>
            */
           <li>
                <input className="checkbox" type="checkbox"  onClick={() => {
                    this.state.changeSelection(this.state.lab.id)
                }} checked={this.state.lab.enable}/>
                {this.state.lab.name}
            </li>
        );
    }
}
Edit.propType = {
    /*
    id : React.PropTypes.number,
    name : React.PropTypes.string,
    score : React.PropTypes.Object,
    enable : React.PropTypes.bool,
    */
   lab : React.PropTypes.Object,
    changeSelection : React.PropTypes
};



// ****************
// ***** main *****
// ****************
$(function() {
    $.getJSON(url, function(data) {
        ReactDOM.render(
            <EditList labs={data}/>,
            document.getElementById('Container')
        );
    });
})