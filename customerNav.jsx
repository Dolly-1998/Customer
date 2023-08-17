import React,{Component} from "react";
import { Link } from "react-router-dom";
class CustomerNav extends Component{ 
       render(){
        return(
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                     </Link>
                    <div className="">
                    <ul  className="navbar-nav mr-auto">
                            <li className="nav-item">
                            <Link className="nav-link" 
                            to={`/customers`}>
                           Customers
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link"
                            to={`/add`}>
                            New Customer 
                            </Link>
                            </li>
            </ul>
                    </div>
                    </nav>
        );
    
}
}
export default CustomerNav;