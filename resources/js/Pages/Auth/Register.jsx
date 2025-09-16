import { Head, Link, useForm } from '@inertiajs/react';
import { LuCar } from "react-icons/lu";


export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        first_name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Inscription" />
            
            <div className="register-container">
                <div className="register-card">
                    <div className="register-header">
                        <h3 className="register-logo">
                            <LuCar /> AutoMarket
                        </h3>
                        <p className="register-subtitle">Créez votre compte pour commencer</p>
                    </div>

                    <form onSubmit={submit}>
                        {/* Nom et Prénom sur la même ligne */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Nom *
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="form-input"
                                    autoComplete="family-name"
                                    autoFocus
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && (
                                    <div className="input-error">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="first_name" className="form-label">
                                    Prénom *
                                </label>
                                <input
                                    id="first_name"
                                    name="first_name"
                                    value={data.first_name}
                                    className="form-input"
                                    autoComplete="given-name"
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    required
                                />
                                {errors.first_name && (
                                    <div className="input-error">
                                        {errors.first_name}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Téléphone */}
                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">
                                Téléphone *
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={data.phone}
                                className="form-input"
                                autoComplete="tel"
                                placeholder="0123456789"
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                            />
                            {errors.phone && (
                                <div className="input-error">
                                    {errors.phone}
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email *
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="form-input"
                                autoComplete="username"
                                placeholder="exemple@email.com"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && (
                                <div className="input-error">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        {/* Mot de passe */}
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Mot de passe *
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="form-input"
                                autoComplete="new-password"
                                placeholder="Minimum 8 caractères"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            {errors.password && (
                                <div className="input-error">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        {/* Confirmer le mot de passe */}
                        <div className="form-group">
                            <label htmlFor="password_confirmation" className="form-label">
                                Confirmer le mot de passe *
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="form-input"
                                autoComplete="new-password"
                                placeholder="Répétez votre mot de passe"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            {errors.password_confirmation && (
                                <div className="input-error">
                                    {errors.password_confirmation}
                                </div>
                            )}
                        </div>

                        <div className="form-footer">
                            <Link
                                href={route('login')}
                                className="login-link"
                            >
                                Déjà inscrit ? Connectez-vous
                            </Link>

                            <button 
                                type="submit" 
                                className={`primary-button ${processing ? 'loading' : ''}`}
                                disabled={processing}
                            >
                                {processing ? 'Inscription...' : 'S\'inscrire'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}