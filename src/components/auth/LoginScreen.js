import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/authActions';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        loginEmail: '',
        loginPassword: '',
    });
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        registerPasswordRepeat: '',
    });
    const { loginEmail, loginPassword } = formLoginValues;
    const { registerName, registerEmail, registerPassword, registerPasswordRepeat } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin({
            email: loginEmail,
            password: loginPassword,
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (registerPassword !== registerPasswordRepeat) {
            return Swal.fire('Error', 'The passwords must be the same', 'error');
        };

        dispatch(startRegister({
            email: registerEmail,
            password: registerPassword,
            name: registerName,
        }));
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
                    <form onSubmit={handleRegister}>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={registerName}
                                name='registerName'
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={registerEmail}
                                name='registerEmail'
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={registerPassword}
                                name='registerPassword'
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat password"
                                value={registerPasswordRepeat}
                                name='registerPasswordRepeat'
                                onChange={handleRegisterInputChange}
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