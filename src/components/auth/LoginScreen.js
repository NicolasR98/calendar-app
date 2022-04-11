import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/authActions';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        loginEmail: 'nicolas@example.com',
        loginPassword: '123456',
    });
    const { loginEmail, loginPassword } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(loginEmail, loginPassword));
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Sign Up</h3>
                    <form>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat password"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Sign Up" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};