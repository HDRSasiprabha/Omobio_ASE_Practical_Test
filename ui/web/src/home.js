import React, {Component} from 'react';
import axios from 'axios'
import cookie from 'react-cookies';



export default class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: '',
            name: '',
            username: '',
            email: '',
            password:''
        }
    }

    componentWillMount() {
        this.setState ({email: cookie.load('userEmail')});
        this.setState ({password: cookie.load('userPassword')});

        const email = cookie.load('userEmail');
        const password = cookie.load('userPassword');
        if(email === undefined || password === undefined) {
            window.location = '/';
        }
      }

    componentDidMount() {
        axios.get('http://localhost:8081/omobio/Omobio-Practical-Test/bizlogic/user.php?email='+this.state.email+'&password='+this.state.password)
          .then(response => {
            this.setState({ 
                id: response.data.id,
                name: response.data.name,
                username: response.data.username,
                email: response.data.email
             })
          })
          .catch((error) => {
            console.log(error);
          })
      }

    render() {
        return (
            

            <div>
            <h1>User Details</h1>
<br/><br/><br/>
            <table>
                <thead>
                    <tr>
                        
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    
                        <tr >
                            <td>{this.state.id}</td>
                            <td>{this.state.name}</td>
                            <td>{this.state.username}</td>
                            <td>{this.state.email}</td>
                           
                        </tr>
                 
                    
                </tbody>
            </table>
        </div>
        )
    }
}