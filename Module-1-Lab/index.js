ReactDOM.render(
    <ReactTransportationApp/>,
    document.getElementById("root")
)

function ReactTransportationApp(){
    return (
        <div className="">
            <ReactTransportationHeader title="Welcome to React Transportation" 
                                       subTitle="The best place to buy vehicles online"/>
            <ChooseOptionsSection title="Choose Options" selectOptions = {["Cars", "Trucks", "Convertible"]}/>
            <VehiclesTable title = "Cars" vehicleData = { data.cars }/>
            <VehiclesTable title = "Trucks" vehicleData = { data.trucks }/>
            <VehiclesTable title = "Convertibles" vehicleData = { data.convertibles }/>
            
        </div>
    )
}


function ReactTransportationHeader(props){
    return (
        <header className="center-align card-panel">
            <h3>
                {props.title}
            </h3>
            <h5>
                {props.subTitle}
            </h5>
        </header>
    )
}

function ChooseOptionsSection(props){
    return (
        <form className="card-panel">
            <div className="section">
                <h5 id="choose-section"> Choose Options </h5>
                <p>
                    <CheckBoxOnlyNew />
                    <SelectVehicleType selectOptions={props.selectOptions} /> <br/>
                </p>
            </div>
        </form>
    )
}

function CheckBoxOnlyNew(){
    return (
        <p>
            <input type="checkbox" id="newOnly" />
            <label htmlFor="newOnly">New Only</label>
        </p>
    )
}

function SelectVehicleType(props){
    const vehicles = props.selectOptions

    return (
        <div className="left-align">
            <h6>Select Type</h6>
            <select className="browser-default">
                <option selected="selected"> All </option>
                { vehicles.map(selectTypeOptions) }
            </select>
        </div>
    )
}

function selectTypeOptions(item, index){
    return <option value = {index}> {item} </option>
}

function VehiclesTable(props){
    const vehicleData = props.vehicleData
    return (
        <div className="card-panel">
            <div>
                <h4>
                    {props.title}
                </h4>

                { vehicleData.map( MakeVehiclesTable ) }
            </div>

        </div>
    )
}

function MakeVehiclesTable(vehicle, index){
    return ( 
            <table className="centered highlight">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Price</th>
                        <th>Buy</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{vehicle.year}</td>
                        <td>{vehicle.model}</td>
                        <td>${vehicle.price}</td>
                        <td><a className="waves-effect waves-teal btn">Buy Now</a></td>
                    </tr>
                </tbody>
            </table>
    )
}
