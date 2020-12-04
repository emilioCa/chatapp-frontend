import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'react-simple-snackbar'
import { AuthContext } from '../../auth/AuthContext'

const initialRegisterState = {
    name: 'Lois',
    email: 'test1@test.com',
    password: '123456',
    confirmPassword: '123456',
}

const RegisterPage = () => {
    const { register } = useContext(AuthContext);
    const [open] = useSnackbar();
    const [form, setForm] = useState(initialRegisterState);

    const onChangeInput = ({ target }) => {
        const { name, value } = target;
        setForm({ ...form, [name]: value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        // validate fields..
        const response = await register(form.name, form.email, form.password);

        if (response) {
            open('User created! Welcome.')
        } else {
            open('Error. User already exists.')
        }
    }

    return (
        <form className="login100-form validate-form flex-sb flex-w" onSubmit={onSubmit}>
            <span className="login100-form-title mb-3">
                Register
			</span>

            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={onChangeInput}
                />
                <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={onChangeInput}
                />
                <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={onChangeInput}
                />
                <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={onChangeInput}
                />
                <span className="focus-input100"></span>
            </div>

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

        </form>
    )
}

export default RegisterPage;