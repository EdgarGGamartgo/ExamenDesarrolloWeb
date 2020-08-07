import React, { Component } from "react";
import { UserConsumer } from './userContext'
import Login from "./login.component"
import {withTranslation} from "react-i18next";


class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
     
        };
    }

    submitHandler = e => {
        e.preventDefault()
        this.setState({ navigate: true })
    }

    render() {
        const { navigate } = this.state
        const { t } = this.props;

        if (!navigate) {
            return (
                <UserConsumer>
                  {
                      (userInfo) => {
                      return <div>
                                <div>{t('welcome.welcome')} {userInfo.user.name}</div>
                                <div>{t('welcome.youremail')} {userInfo.user.email}</div>
                                <div>{t('welcome.age')} {userInfo.user.age}</div>
                                <form onSubmit={this.submitHandler}>
                                     <button type="submit" className="btn btn-primary btn-block">{t('welcome.logout')}</button>
                                </form>
                             </div>
                      }
                  }
                </UserConsumer>
            );
        } else {
            return (
                 <Login/>
            )
        }
       
    }
}

export default withTranslation('common')(Info);
