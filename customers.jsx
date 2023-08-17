import React,{Component} from "react";
import http from "./httpService";
import { Link } from "react-router-dom";
import queryString from "query-string";
import Options from "./options";
class Customers extends Component{
state={
    customers:[]
};
   async fetchData(){
let queryParams=queryString.parse(this.props.location.search);
let searchStr=this.makeSearchString(queryParams);
    let response=await http.get(`/customers?${searchStr}`);     
   console.log(response);
        let {data}=response;
        this.setState({customers:data});
    }
    componentDidMount() {
        this.fetchData();
        }
    
        async componentDidUpdate(prevProps,prevState){
        if (prevProps!==this.props)
        this.fetchData();
        }
        callURL=(url,options)=>{
            let searchStr=this.makeSearchString(options);
            this.props.history.push({
                pathname:url,
                search:searchStr});
            };
            
            makeSearchString=(options)=>{
                let {city,gender,payment,sortBy}=options;
                let searchStr="";
                searchStr=this.addtoQueryString(searchStr,"city",city);
                searchStr=this.addtoQueryString(searchStr,"payment",payment);
                searchStr=this.addtoQueryString(searchStr,"gender",gender);
                
                searchStr=this.addtoQueryString(searchStr,"sortBy",sortBy);
                
                return searchStr;
            }
             addtoQueryString=(str,paramName,paramValue)=>
            paramValue?str?`${str}&${paramName}=${paramValue}`:
            `${paramName}=${paramValue}`
            :str;
            handleOptionChange=(options)=>{
            this.callURL("/customers",options);
            }
             
            
    render(){
const {customers}=this.state;
let queryParams=queryString.parse(this.props.location.search);
console.log(customers);    
return(
        <div className="container">
            <div className="row">
                <div className="col-3">
<Options options={queryParams} onOptionChange={this.handleOptionChange}/>
                </div>
                <div className="col-9">
                    {customers.length===0?<h3 className="text-center text-success">No Customers</h3>:
<div>
<h4 className="text-center">List of Customers</h4>
    <div className="row border bg-dark text-light">
    <div className="col text-white"><Link to={`/customers?sortBy=id`}>Id</Link></div>
        <div className="col"><Link to={`/customers?sortBy=name`}>Name</Link></div>
        <div className="col"><Link to={`/customers?sortBy=city`}>City</Link></div>
        <div className="col"><Link to={`/customers?sortBy=age`}>Age</Link></div>
        <div className="col"><Link to={`/customers?sortBy=gender`}>Gender</Link></div>
        <div className="col"><Link to={`/customers?sortBy=payment`}>Payment</Link></div>
        <div className="col"></div><div className="col"></div>
    </div>
    
    {customers.map((n)=>
    <div className="row">
        <div className="col border">{n.id}</div>
        <div className="col border">{n.name}</div>
        <div className="col border">{n.city}</div>
        <div className="col border">{n.age}</div>
        <div className="col border">{n.gender}</div>
        <div className="col border">{n.payment}</div>
        <div className="col border">
        <Link to={`/customers/${n.id}`}>
        <button className="btn btn-warning btn-sm">Edit</button>
        
        </Link>
        </div>
        <div className="col border">
        <Link to={`/customers/${n.id}/delete`}>
 
        <button className="btn btn-danger btn-sm">Delete</button>
        </Link>
        </div>

    </div>
    )}
</div>
   }
                </div>
            </div>
        </div>
    )
}
}
export default Customers;