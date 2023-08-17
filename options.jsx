import React,{Component} from "react";
class Options extends Component{
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let options={...this.props.options};
        if(input.type==="radio"){
            options[input.name]=input.value;
            }
            
        this.props.onOptionChange(options,this.props.location);
    }
    
makeRadios=(arr,selVal,name,label)=>{
    return(
        <React.Fragment>
 <label className="form-check-label font-weight-bold"><h6>
  {label}</h6></label><br/>
 {arr.map((n)=>
 
 <div className="form-check">
 <div>
    <input className="form-check-input" type="radio"
    name={name} value={n}
    checked={selVal===n} 
    onChange={this.handleChange}/>
    <label className="form-check-label">{n}</label>
</div>

</div>
    )}        </React.Fragment>
    )} 

    render(){
    let {city='',gender='',payment=""}=this.props.options;
    let cities=["Delhi","Noida","Gurgaon","Jaipur"];
    let genders=["Male","Female"];
    let payments=["Wallet","Credit Card","Debit Card"];  
      return(
 
 <div className="container">
       
<div className="row border bg-light">
    <div className="col-12">
         {this.makeRadios(cities,city,"city","City")}
    </div>
    <div className="col-12">
    {this.makeRadios(genders,gender,"gender","Gender")}
    </div>
    <div className="col-12">
    {this.makeRadios(payments,payment,"payment","Payment")}
    </div>
</div>
        </div>
    )
}
}
export default Options;