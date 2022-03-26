import React from 'react';
import './login.css';

export const LoginScreen = () => {
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form>
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