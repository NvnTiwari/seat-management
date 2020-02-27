import React from 'react';
import PropTypes from 'prop-types';
import LoginView from './LoginComponent';
import { onValidation } from '../../common/utils/utils';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isEmailValid: true,
            isPasswordValid: true,
            isLoginSuccess: true,
        }
    }

    componentDidMount(){
        document.body.classList.add('login__img');
    }

    onChange = ( event ) => {
        const { value, name } = event.currentTarget;
        this.setState( { [ name ]: value } );
    }

    onHandleLogin = () => {
        const { email, password  } = this.state;
        const isValidEmail = onValidation(email, 'email');
        const isValidPsw = onValidation(password, 'password');

        this.setState({
            isEmailValid: isValidEmail,
            isPasswordValid: isValidPsw,
        });
        if(isValidEmail && isValidPsw){
            document.body.classList.remove('login__img');
            window.localStorage.setItem('_TOKEN', true);
            this.props.goToPage("/dashboard")
        }
    }

    render(){
        const { isEmailValid, isPasswordValid} = this.state;

        return(
            <>
                <LoginView
                    onChange={this.onChange}
                    onClick={this.onHandleLogin}
                    isEmailValid={isEmailValid}
                    isPasswordValid={isPasswordValid}
                />
            </>
        )
    }


}

Login.propTypes = {
    onHandleLogin: PropTypes.func,
    onChange: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
    isLoginSuccess: PropTypes.bool,
    isEmailValid: PropTypes.bool,
    isPasswordValid: PropTypes.bool,
}

export default Login;