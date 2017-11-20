class FormContainer extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            activity: 'Science Lab',
            restrictions: [],
            restrictionsBool: [false,false,false]
        }
    }

    render(){
        const activityOptions = ["Science Lab","Swimming","Cooking","Painting"]

        return (
            <div className="col s3 card" id="formCard">
                <div className="input-field inline">
                    <TextLabel label="First Name" />
                    <TextBox id="firstName" value={ this.state.firstName } changeValue={ this.changeFirstNameValue.bind(this) }/>
                </div>
                <div className="input-field inline">
                    <TextLabel label="Last Name" />
                    <TextBox id="lastName" value={ this.state.lastName } changeValue={ this.changeLastNameValue.bind(this) }/>
                </div>

                <div>
                    <TextLabel label="Select Activity" />
                    <DropDown options={activityOptions} changeValue={ this.changeActivityValue.bind(this) }/>
                </div>

                <div>
                    <TextLabel label="Check all that apply" />
                    <CheckBox index={0} checked={this.state.restrictionsBool[0]} text="a) Dietary Restrictions" id="a" changeValue={ this.changeCheckboxOptionsValue.bind(this) }/>
                    <CheckBox index={1} checked={this.state.restrictionsBool[1]} text="b) Physical Disabilities" id="b" changeValue={ this.changeCheckboxOptionsValue.bind(this) }/>
                    <CheckBox index={2} checked={this.state.restrictionsBool[2]} text="c) Medical Needs" id="c" changeValue={ this.changeCheckboxOptionsValue.bind(this) }/>
                </div>

                <div className="center-align">
                    <Button styleId="submitButton" text="Submit" onClick={ this.handleSubmit.bind(this) }/>
                </div>

            </div>
        )
    }

    changeFirstNameValue(value){
        this.setState({
            firstName: value
        })
    }

    changeLastNameValue(value){
        this.setState({
            lastName: value
        })
    }

    changeActivityValue(value){
        this.setState({
            activity: value
        })
    }

    changeCheckboxOptionsValue(value, index){
        if(isInArray(value, this.state.restrictions)){
            this.setState({
                restrictions: this.state.restrictions.filter(item => item !== value),
                restrictionsBool: this.state.restrictionsBool[index] ? true : false
            })
        } else {    
            this.setState({
                restrictions: [...this.state.restrictions, value],
                restrictionsBool: this.state.restrictionsBool[index] ? false : true
            })
        }
    }

    handleSubmit(){
        this.props.handleSetItems({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            activity: this.state.activity,
            restrictions: this.state.restrictions
        })

        this.setState({
            firstName: '',
            lastName: '',
            activity: '',
            restrictions: [],
            restrictionsBool: [false,false,false]
        })
    }

}

function isInArray(value, array) {
    return array.includes(value)
}

class TextBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : this.props.value
        }
    }

    render(){
        return(
            <input type="text" id={this.props.id} value={this.props.value} onChange={this.handleChangeValue.bind(this)}/>
        )
    }

    handleChangeValue(event){
        this.setState({ value: event.target.value });
        this.props.changeValue(event.target.value); 
    }
}

const TextLabel = ( { label } ) => {
    return (
        <h6>
            { label }
        </h6>
    )
}

class DropDown extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            option: ''
        }
    }

    render(){
        const { options } = this.props

        return(
            <select className="browser-default" id="dropdown" value={this.props.option} onChange={this.handleChangeValue.bind(this)}>
                { options.map( (value, index) => {
                    return <option value={value}>{value}</option>
                })}
            </select>
        )
    }

    handleChangeValue(event){
        this.setState({ option: event.target.value });
        this.props.changeValue(event.target.value); 
    }

}

class CheckBox extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            checked: this.props.checked
        }
    }

    render(){
        const { id, text } = this.props
        return (
            <div>
                <input checked = { this.props.checked } type="checkbox" id={id} onChange = { this.handleChangeValue.bind(this) }/>
                <label htmlFor={id}>{text}</label>
            </div>
        )
    }

    handleChangeValue(event){   
        this.setState({ checked: event.target.checked })
        this.props.changeValue(event.target.id, this.props.index)
    }
}

const Button = ( { text, onClick, styleId } ) => {
    return (
        <button className={`btn waves-effect waves-light`} id={styleId} onClick={ () => {onClick()}}> { text } </button>
    )
}

const Table = ({items, handleRemoveItem}) => {
    return (
        <table className="col s8">
            <TableHeader/>
            <TableBody items={items} handleRemoveItem={ handleRemoveItem }/>
        </table>
    )
}
const TableHeader = () => {
    return (
        <thead>
            <th>Remove</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Activity</th>
            <th>Restrictions</th>
        </thead>
    )
}

const TableBody = ({items, handleRemoveItem}) => {
    return (
        <tbody className="centered">
            { items.map( (item, index) => { return (
                <tr>
                    <td>
                        <Button text="x" styleId="removeButton" onClick={ () => { handleRemoveItem(index) } }/>
                    </td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.activity}</td>
                    <td>{item.restrictions.sort()}</td>
                </tr>
            ) })} 
        </tbody>
    )
}

class RegistrationSystem extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            items: []
        }   
    }

    handleSetItems(value){
        this.setState({
            items: [...this.state.items, value]
        })
    }

    handleRemoveItem(index){
        let itemsCopy = this.state.items.slice()
        itemsCopy.splice(index,1)
        this.setState({
            items: itemsCopy
        })
    }

    render(){

        return (
            <div className="row">
                <FormContainer items = { this.state.items } handleSetItems = { this.handleSetItems.bind(this) }/>
                <Table items={this.state.items} handleRemoveItem={ this.handleRemoveItem.bind(this) }/>
            </div>
        )
    }
} 

ReactDOM.render(
     <RegistrationSystem/>,
    document.getElementById("root")
)