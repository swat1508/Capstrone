import React, { Component } from 'react';
// add current files
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Router from './routers/Router';

class App extends Component {
    render() {
        return (
            <div className="" >
                <Header/>
                <main className="container-fluid">
                    <Router/>
                </main>
                <Footer/>
            </div>
        );
    }
};

export default App;