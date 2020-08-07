import React, { Component } from "react";
import axios from 'axios'
import {withTranslation} from "react-i18next";

class SignUp extends Component {

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
        const { t } = this.props;

        if(success) {
            
            return ( 

        
                <form onSubmit={this.submitHandler}>
                    <h3>{t('welcome.signup')}</h3>
    
                    <div className="form-group">
                        <label>{t('welcome.userid')}</label>
                        <input type="text" name="name" value={name} onChange={this.changeHandler}  className="form-control"  />
                    </div>
    
                    <div className="form-group">
                        <label>{t('welcome.email')}</label>
                        <input type="email" name="email" value={email} onChange={this.changeHandler} className="form-control"  />
                    </div>
    
                    <div className="form-group">
                        <label>{t('welcome.pass')}</label>
                        <input type="password" name="password" value={password} onChange={this.changeHandler} className="form-control"  />
                    </div>
    
                    <button type="submit" className="btn btn-primary btn-block">{t('welcome.signup')}</button>
                    {/* <p className="forgot-password text-right">
                        Already registered <a href="#">sign in?</a>
                    </p> */}
                </form> 
            );

        } else {

            return (

                <div>
                    {t('welcome.success')}
                </div>

            )

        }
      
    }
}

export default withTranslation('common')(SignUp);
