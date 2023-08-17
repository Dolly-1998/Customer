import React,{Component} from "react";
import http from "./httpService";
class AddCust extends Component{
    state={
    customer:{id:"",name:"",age:"",city:"",gender:"",payment:""},
    edit:false
    };
    async componentDidMount(){
        this.fetchData();
    }
    async componentDidUpdate(prevProps,prevState){
if(prevProps!==this.props)
this.fetchData();
    }
 async fetchData(){
  let {id}=this.props.match.params;
  console.log(id);
  if(id){
    let response=await http.get(`/customers/${id}`);
    let {data}=response;
    console.log("edit");
    this.setState({customer:data,edit:true});
  }
  else{
    
    let customer={name:"",age:"",city:"",company:""};
    this.setState({customer:customer,edit:false});
  }
    }

    handleChange=(e)=>{
const {currentTarget:input}=e;
let s1={...this.state};
s1.customer[input.name]=input.value;
this.setState(s1);
    }
   async postData(url,obj){
let response=await http.post(url,obj);
console.log(response);
this.props.history.push("/customers"); 
}
async putData(url,obj){
    let response=await http.put(url,obj);
    console.log(response);
    this.props.history.push("/customers"); 
    }
    
    handleSubmit=(e)=>{
        e.preventDefault();
        let {customer,edit}=this.state;
        edit?this.putData(`/customers/${customer.id}`,customer):this.postData("/customers",customer);
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
        let {id,name,age,city,gender,payment}=this.state.customer;
    let cities=["Delhi","Noida","Gurgaon","Jaipur"];
let payments=["Credit Card","Debit Card","Wallet"];
let genders=["Male","Female"];
return(
<div className="container">
<div className="form-group">
    <label>Id</label>
    <input type="text" className="form-control" name="id" id="id" placeholder="Enter id" value={id}
    onChange={this.handleChange}/>
</div>
<div className="form-group">
    <label>Name</label>
    <input type="text" className="form-control" name="name" id="name" placeholder="Enter name" value={name}
    onChange={this.handleChange}/>
</div>

<div className="form-group">
    <label>Age</label>
    <input type="text" className="form-control" name="age" id="age" placeholder="Enter age" value={age}
    onChange={this.handleChange}/>
</div>
<br/>
<div className="form-group">
        <select className="form-control" name="city" value={city} onChange={this.handleChange}>
            <option value="">Select City</option>
            {cities.map(pr=>
            <option>{pr}</option>
            )}
        </select>
    </div>
    {this.makeRadios(genders,gender,"gender","Gender")}
    <br/>
    {this.makeRadios(payments,payment,"payment","Payment")}
<button className="btn btn-primary btn-sm m-2" onClick={this.handleSubmit}>Submit</button>


</div>
        )
    }
}
export default AddCust;