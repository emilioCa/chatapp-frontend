import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { AuthContext } from '../../auth/AuthContext'

const initialRegisterState = {
    name: 'Lois',
    email: 'test1@test.com',
    password: '12345678',
    confirmPassword: '12345678',
}

const registerFormSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must have more than 3 characters')
        .max(15, 'Name exceeds the limit')
        .required('Name is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email invalid')
        .max(50, 'Email exceeds the limit'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must have more than 8 characters')
        .max(50, 'Email exceeds the limit'),
    // confirmPassword: Yup.string()
    //     .required('Please confirm your password')
    //     .oneOf([Yup.ref('password'), null], 'Passwords must match')        
});

const RegisterPage = () => {
    const { register } = useContext(AuthContext);
    const [showPass, setShowPass] = useState('password');

    const togglePassword = () => {
        setShowPass((showPass === 'password') ? 'text' : 'password');
    }

    const onSubmit = async (form) => {
        await register(form.name, form.email, form.password);
    }

    return (
        <Formik
            initialValues={initialRegisterState}
            validationSchema={registerFormSchema}
            onSubmit={onSubmit}
        >
            <Form
                autoComplete="off"
                className="login100-form validate-form flex-sb flex-w"
            >
                <span className="login100-form-title mb-3">
                    Register
			    </span>

                <div className="wrap-input100 validate-input mb-3">
                    <Field
                        className="input100"
                        type="text"
                        name="name"
                        placeholder="Name"
                    />
                    <span className="focus-input100"></span>
                    <ErrorMessage
                        name="name"
                        component="div"
                        className="alert-validate"
                    />
                </div>

                <div className="wrap-input100 validate-input mb-3">
                    <Field
                        className="input100"
                        type="email"
                        name="email"
                        placeholder="Email"
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

                {/* <div className="wrap-input100 validate-input mb-3">
                    <input
                        className="input100"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                    />
                    <span className="focus-input100"></span>
                    <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="alert-validate"
                    />
                </div> */}

                <div className="row mb-3">
                    <div className="col text-right">
                        <Link to="/auth/login" className="txt1">
                            You've a account?
					</Link>
                    </div>
                </div>

                <div className="container-login100-form-btn m-t-17">
                    <button type="submit" className="login100-form-btn">
                        Create Account
				</button>
                </div>

            </Form>
        </Formik>
    )
}

export default RegisterPage;