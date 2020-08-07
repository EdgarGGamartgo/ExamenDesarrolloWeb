import React, { Component } from "react";
import axios from 'axios'
import Info from "./info.component"
import { UserProvider } from './userContext'
import {withTranslation} from "react-i18next";


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //Users: [],
            userId: '',
            password: '',
            success: true,
            navigate: false,
            userInfo: null
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
                this.setState({ userInfo: data })
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
        const { userId, password, success, navigate, userInfo } = this.state
        const { t, i18n } = this.props;

        if(success && !navigate) {
            return (
            //     <button onClick={() => i18n.changeLanguage('en')}>en</button> 
                <form onSubmit={this.submitHandler}>

                    <h3>{t('welcome.login')}</h3>
    
                    <div className="form-group">
                        <label>{t('welcome.userid')}</label>
                        <input type="text" name="userId" value={userId} onChange={this.changeHandler} className="form-control"  />
                    </div>
    
                    <div className="form-group">
                        <label>{t('welcome.pass')}</label>
                        <input type="password" name="password" value={password} onChange={this.changeHandler} className="form-control" />
                    </div>
    
                    {/* <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div> */}
    
                    <button type="submit" className="btn btn-primary btn-block">{t('welcome.submit')}</button>
                    {/* <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p> */}
                </form>
            );
        } else if (!success && !navigate){
            return (
                <form onSubmit={this.submitHandlerTwo}>
                    <button type="submit" className="btn btn-primary btn-block">{t('welcome.error')}</button>
                </form>
            )
        } else if (navigate) {
            
            return <UserProvider value={userInfo} ><Info/></UserProvider>
        }
   
    }
}

export default withTranslation('common')(Login);