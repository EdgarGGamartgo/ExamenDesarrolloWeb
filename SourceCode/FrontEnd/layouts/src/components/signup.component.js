import React, { Component } from "react";
import axios from 'axios'

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //Users: [],
            name: '',
            email: '',
            password: '',
            success: true
        };
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        const req = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        axios
            .post(`http://localhost:8000/users`, req)
            .then(res => {
                const data = res.data
                console.log(data)
                this.setState({ success: false })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    getUsersData() {
        axios
            .get(`http://localhost:8000/users/all`, {})
            .then(res => {
                const data = res.data
                console.log(data)
                // const users = data.map(u =>
                //     <div>
                //     <p>{u.id}</p>
                //     <p>{u.name}</p>
                //     <p>{u.email}</p>
                //     <p>{u.website}</p>
                //     <p>{u.company.name}</p>
                //     </div>
                //     )

                //     this.setState({
                //         users
                //     })

            })
            .catch((error) => {
                console.log(error)
            })

    }
    componentDidMount(){
       this.getUsersData()
    }

    render() {
        const { name, password, email, success } = this.state
        if(success) {
            
            return ( 

        
                <form onSubmit={this.submitHandler}>
                    <h3>Sign Up</h3>
    
                    <div className="form-group">
                        <label>UserId</label>
                        <input type="text" name="name" value={name} onChange={this.changeHandler}  className="form-control" placeholder="UserId" />
                    </div>
    
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" name="email" value={email} onChange={this.changeHandler} className="form-control" placeholder="Enter email" />
                    </div>
    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={this.changeHandler} className="form-control" placeholder="Enter password" />
                    </div>
    
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="#">sign in?</a>
                    </p>
                </form> 
            );

        } else {

            return (

                <div>
                    User successfully registered!
                </div>

            )

        }
      
    }
}