import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { LuCar } from "react-icons/lu";


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Connexion" />
            
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h3 className="login-logo">
                            <LuCar /> AutoMarket
                        </h3>
                    </div>

                    {status && (
                        <div className="status-message">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="form-input"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            {errors.email && (
                                <div className="input-error">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div className="form-group mt-4">
                            <label htmlFor="password" className="form-label">
                                Mot de passe
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="form-input"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            {errors.password && (
                                <div className="input-error">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <div className="checkbox-container">
                            <input
                                id="remember"
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="checkbox-input"
                            />
                            <label htmlFor="remember" className="checkbox-label">
                                Se souvenir de moi
                            </label>
                        </div>

                        <div className="form-footer">
                            <button 
                                type="submit" 
                                className="primary-button"
                                disabled={processing}
                            >
                                {processing ? 'Connexion...' : 'Se connecter'}
                            </button>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="forgot-password-link"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}