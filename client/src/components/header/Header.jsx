import React, { Component } from 'react';
import Logo from '../../images/logo.png'
class Header extends Component {
    logOut(){
        localStorage.removeItem("currentUser");
    }
    render() {
        return (
            <header className="bg-dark py-2 d-flex justify-content-between app-header">
                <div className="left-container">
                    <a href="/" className="ml-3 text-white">
                        <img src={Logo} alt="header-logo" className="header-logo"/>
                        <span className="text-uppercase ml-2">Reviews</span>
                    </a> 
                    <a href="/home" className="ml-3 text-white">Home</a> 
                </div>
                <div className="right-container">
                    <a href="/" className="btn btn-primary mx-2 text-white"><i className="fas fa-bell"></i></a> 
                    <a href="/auth/logout" className="btn btn-danger logout-btn mx-2" onClick={this.logOut.bind(this)}><i className="fas fa-power-off"></i></a> 
               </div>
            </header>
        );
    }
}
export default Header;