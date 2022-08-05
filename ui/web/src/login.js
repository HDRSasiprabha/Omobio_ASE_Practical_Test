import React, {Component} from 'react';
import axios from 'axios'
import cookie from 'react-cookies';

import styles from './login.module.css'

export default class Login extends Component {
    constructor(props){
        super(props);

        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            useremail: '',
            userpassword: ''
        }
    }

    onChangeUserEmail(e) {
        this.setState({
            useremail: e.target.value
        });
    }

    onChangeUserPassword(e) {
        this.setState({
            userpassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
    
        axios.post('http://localhost:8081/omobio/Omobio-Practical-Test/bizlogic/login.php?email='+this.state.useremail+'&password='+this.state.userpassword)
          .then(res => {
            const message = res.data.message;
            alert(message);

            if(message === 'Login success') {
                cookie.save('userEmail', this.state.useremail, { path: '/' });
                cookie.save('userPassword', this.state.userpassword, { path: '/' });
                window.location = '/home';
            }
          });
    }

    render() {
        return (
            <div className={styles.login}>
                <form onSubmit={this.onSubmit}>
                    <label>Email</label>
                    <input type="text" placeholder="email" value={this.state.useremail} onChange={this.onChangeUserEmail}/>
                    <label>Password</label>
                    <input type="text" placeholder="password" value={this.state.userpassword} onChange={this.onChangeUserPassword}/>
                    <button type="submit">LOGIN</button>
                </form>
            </div>
        )
    }
}