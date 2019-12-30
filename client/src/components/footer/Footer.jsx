import React, { Component } from 'react';
import "./footer.scss";
class Footer extends Component {
    constructor(props, context) {
        super(props, context);
        this.shareOnSocialMedia = this.shareOnSocialMedia.bind(this);
    }
    render() {
        return (
    <footer id="main-footer" className="mt-3">
        <div className="container" >
            <div className="row">
                <div className="col-sm-12">
                    <div className="footer-share-section py-2">
                        <nav className="nav social-link justify-content-center">
                        <li className="nav-item-text">
                            <a href="/" className="nav-link-text">
                            Share On 
                            </a>
                        </li>
                        <li className="nav-item facebook" onClick={this.shareOnSocialMedia.bind('facebook')}>
                            <a href="/" className="nav-link">
                                <i className="fab fa-facebook-f mr-1"></i>
                            </a>
                        </li>
                        <li className="nav-item twitter" onClick={this.shareOnSocialMedia.bind('twitter')}>
                            <a href="/" className="nav-link">
                                <i className="fab fa-twitter mr-1"></i>
                            </a>
                        </li>
                        <li className="nav-item google" onClick={this.shareOnSocialMedia.bind('google')}>
                                <a href="/" className="nav-link">
                                    <i className="fab fa-google-plus-g mr-1"></i>
                                </a>
                            </li>
                            <li className="nav-item linkedin" onClick={this.shareOnSocialMedia.bind('linkedin')}>
                                <a href="/" className="nav-link">
                                    <i className="fab fa-linkedin mr-1"></i>
                                </a>
                            </li>
                            <li className="nav-item pinterest" onClick={this.shareOnSocialMedia.bind('pinterest')}>
                                <a href="/" className="nav-link">
                                        <i className="fab fa-pinterest-p mr-1"></i>
                                </a>
                            </li>
                        </nav>
                    </div>
                    <div className="footer-bottom-sec p-3">
                        <p className=" font-weight-bold text-uppercase footer-info m-0">
                       Your review can increase visibilty of Business.
                       </p>
                        <p className=" font-weight-bold footer-copyright m-0">
                        Copyright &copy; 2019 | All Right Reserved
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
        );
    }
    shareOnSocialMedia(socialName){

    }
}
export default Footer;