import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { useSnackbar } from 'react-simple-snackbar';
// import { getSnackOptions } from '../../utils/getSnackOptions';

const initialLoginState = {
    email: 'test1@gmail.com',
    password: '123456',
    rememberme: false,
}

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [open] = useSnackbar();

    const [form, setForm] = useState(initialLoginState);
    const [showPass, setShowPass] = useState('password');

    useEffect(() => {
        const email = localStorage.getItem('email') || '';
        (email) && setForm((form) => ({ ...form, email, rememberme: true }))
    }, []);

    const onChangeInput = ({ target }) => {
        const { name, value } = target;
        setForm({ ...form, [name]: value });
    }

    const toggleRemember = () => {
        setForm({ ...form, rememberme: !form.rememberme });
    }

    const togglePassword = () => {
        setShowPass((showPass === 'password') ? 'text' : 'password');
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        (form.rememberme)
            ? localStorage.setItem('email', form.email)
            : localStorage.removeItem(form.email)

        const loginCheck = await login(form.email, form.password);

        if (loginCheck) {
            open('Bienvenido')
        } else {
            open('Credenciales inválidas. Verifique su usuario o contraseña')
        }
    }

    return (
        <form
            onSubmit={onSubmit}
            className="login100-form validate-form flex-sb flex-w"
        >
            <span className="login100-form-title mb-3">
                Login
			</span>

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
                    type={showPass}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={onChangeInput}
                />
                <span className="focus-input100"></span>
                <span className="show-hide" onClick={togglePassword}>
                    <i className={`fas fa-eye${(showPass !== 'password') ? '-slash' : ''}`}></i>
                </span>
            </div>

            <div className="row mb-3">
                <div className="col" onClick={toggleRemember}>
                    <input
                        className="input-checkbox100"
                        id="ckb1"
                        type="checkbox"
                        name="rememberme"
                        checked={form.rememberme}
                        readOnly
                    />
                    <label className="label-checkbox100">
                        Rememberme
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
        </form>
    )
}

export default LoginPage;