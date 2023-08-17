import React,{Component} from "react";
import http from "./httpService";
class DelCust extends Component{
    async componentDidMount(){
        let {id}=this.props.match.params;
        let response=await http.deleteApi(`/customers/${id}`);
        console.log(response);
        this.props.history.push("/customers");    
    }
    
    render(){
    return "";
}
}
export default DelCust;