import React from "react";

export default function Footer(){
    return (
        <div className="footer">
            <div className="contact-container">
                <small>
                    Contact Us
                    <img src="/img/email-icon.png" alt="blue envelope icon" />
                </small>
            </div>
            <div className="bottom-row-footer">
                <small>
                    servicedawgs@uw.edu
                </small>
                <small className="copyright">
                    ©ServiceDawgs 2024
                </small>
            </div>
        </div>
    )
}