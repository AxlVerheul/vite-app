import React, { useState } from 'react';

function Contact() {
    const password = 'swordfish';
    const [authorized, setAuthorized] = useState(false);

    function handleSubmit(e) {
        const enteredPassword = e.target.querySelector(
        'input[type="password"]').value;
        const auth = enteredPassword == password;
        setAuthorized(auth)
    }

    const login = (
            <div>
                <h1>Enter the password</h1>
                <form onSubmit={handleSubmit} action="#">
                    <input type="password" placeholder="Password" />
                    <input type="submit" />
                </form>
            </div>
    );

    const contactInfo = (
        <div id="authorization">
            <h1>Contact</h1>
            <ul>
            <li>
                axl@verheul.com
            </li>
            <li>
                Amsterdam, The Netherlands
            </li>
            </ul>
        </div>
    )

    return authorized ? contactInfo : login;
}

export default Contact;