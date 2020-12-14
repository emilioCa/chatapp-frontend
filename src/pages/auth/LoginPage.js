import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { AuthContext } from '../../auth/AuthContext';

const initialLoginState = {
    email: 'test1@gmail.com',
    password: '123456',
    rememberme: false,
}

const loginFormSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Please verify your email')
        .max(100, 'Email exceeds the limit'),
    password: Yup.string()
        .required('Password is required')
        .max(100, 'Password exceeds the limit')
});

const LoginPage = () => {
    const { login } = useContext(AuthContext);

    const [rememberme, setRememberme] = useState(false);
    const [showPass, setShowPass] = useState('password');

    useEffect(() => {
        const email = localStorage.getItem('email') || '';
        (email) && setForm((form) => ({ ...form, email, rememberme: true }))
    }, []);

    // const toggleRemember = () => {
    //     setForm({ ...form, rememberme: !form.rememberme });
    // }

    const togglePassword = () => {
        setShowPass((showPass === 'password') ? 'text' : 'password');
    }

    const onSubmit = async (values) => {
        // (values.rememberme)
        //     ? localStorage.setItem('email', values.email)
        //     : localStorage.removeItem(values.email)

        await login(values.email, values.password);
    }

    return (
        <Formik
            initialValues={initialLoginState}
            validationSchema={loginFormSchema}
            onSubmit={onSubmit}
        >
            {({
                handleBlur,
                handleChange,
                values
            }) => (
                    <Form
                        className="login100-form validate-form flex-sb flex-w"
                    >
                        <span className="login100-form-title mb-3">
                            Login
			</span>

                        <div className="wrap-input100 validate-input mb-3">
                            <Field
                                className="input100"
                                type="email"
                                name="email"
                                placeholder="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <span className="focus-input100"></span>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="alert-validate"
                            />
                        </div>

                        <div className="wrap-input100 validate-input mb-3">
                            <Field
                                className="input100"
                                type={showPass}
                                name="password"
                                placeholder="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <span className="focus-input100"></span>
                            <span className="show-hide" onClick={togglePassword}>
                                <i className={`fas fa-eye${(showPass !== 'password') ? '-slash' : ''}`}></i>
                            </span>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="alert-validate"
                            />
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <Field
                                    className="input-checkbox100"
                                    id="ckb1"
                                    type="checkbox"
                                    name="rememberme"
                                    checked={values.rememberme}
                                    onChange={handleChange}
                                //checked={formValues.rememberme}
                                // readOnly
                                />
                                <label className="label-checkbox100">
                                    Rememberme {`${values.rememberme}`}
                                </label>
                            </div>

                            <div className="col text-right">
                                <Link to="/auth/register" className="txt1">
                                    Create Account
                    </Link>
                            </div>
                        </div>

                        <div className="container-login100-form-btn m-t-17" >
                            <button
                                type="submit"
                                className="login100-form-btn"
                            >
                                Login
				</button>
                        </div>
                    </Form>
                )}
        </Formik>
    )
}

export default LoginPage;