import React from 'react';
import Form from '../../components/form/form';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Spinner from '../../components/spinner/spinner';

const loginView = (props) =>{
    const { email, password, onChange, onClick, isEmailValid, isPasswordValid, isUserAuthenticated, isLoading } = props;
    return (
        <div className="login">
            <div className="login__logo"></div>
            <div className="login__heading">Seat Management Login</div>
            {isLoading ? 
                <Spinner /> :
                <Form>
                    {(!isUserAuthenticated) ? <p className="login__validation">Please enter valid Email or Passwod</p> : ''}
                    {(!isEmailValid) ? <p className="login__validation">Please enter valid email</p> : ''}
                    <Input type="text" name="email" value={ email } placeholder="Email" className="login__input" onChange={onChange} />
                    {(!isPasswordValid) ? <p className="login__validation">Please enter valid password</p> : ''}
                    <Input type="password" name="password" value={ password } placeholder="Password" className="login__input" onChange={onChange} />
                    <Button disabled={!(password && email)} className="login__btn" name="LOGIN" onClick={onClick} block />
                </Form> 
            }
            <div className="login__footerlogo"></div>
            <div className="login__footertext">Xebia Group @ 2020 All right reserved</div>
        </div>
    );
}

export default loginView;