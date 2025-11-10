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
        <form onSubmit={handleSubmit} action="#">
            <input type="password" placeholder="Password" />
            <input type="submit" />
        </form>
    );

    const contactInfo = (
        <ul>
            <li>axl@verheul.com</li>
            <li>Amsterdam, The Netherlands</li>
        </ul>
    )

    return (
        <div>
            <h1>{authorized ? 'Contact' : ' Enter the password'}</h1>
            {authorized ? contactInfo : login}
        </div>
    );
}

export default Contact;