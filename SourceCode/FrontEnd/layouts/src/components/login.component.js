import React, { Component } from "react";
import axios from 'axios'
import { Redirect } from 'react-router'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //Users: [],
            userId: '',
            password: '',
            success: true,
            navigate: false
        };
    }

    

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        const req = {
            name: this.state.userId,
            password: this.state.password,
            
        }
        axios
            .post(`http://localhost:8000/users/login`, req)
            .then(res => {
                const data = res.data
                console.log(data)
                this.setState({ success: true })
                this.setState({ navigate: true })

            })
            .catch((error) => {
                console.log(error)
                this.setState({ success: false })
                this.setState({ navigate: false })


            })
    }



    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandlerTwo= e => {
        this.setState({ success: true })
    }

    render() {
        const { userId, password, success, navigate } = this.state
        if(success && !navigate) {
            return (
                <form onSubmit={this.submitHandler}>
                    <h3>Sign In</h3>
    
                    <div className="form-group">
                        <label>UserId</label>
                        <input type="text" name="userId" value={userId} onChange={this.changeHandler} className="form-control" placeholder="Enter UserId" />
                    </div>
    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={this.changeHandler} className="form-control" placeholder="Enter password" />
                    </div>
    
                    {/* <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div> */}
    
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    {/* <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p> */}
                </form>
            );
        } else if (!success && !navigate){
            return (
                <form onSubmit={this.submitHandlerTwo}>
                    <button type="submit" className="btn btn-primary btn-block">Wrong credentials, try again.</button>
                </form>
            )
        } else if (navigate) {
            return <Redirect to="/info-user" push={true} />
        }
   
    }
}