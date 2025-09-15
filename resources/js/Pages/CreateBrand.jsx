import Footer from '@/Components/Footer';
import Nav from '@/Components/Nav';
import { Head, useForm } from '@inertiajs/react';


export default function CreateBrand({ auth, user }) {
    // Vérification si auth.user existe
    if (!auth || !auth.user) {
        return <div className="access-denied">Accès refusé ou non connecté</div>;
    }

    // Vérification du rôle
    if (![2, 3].includes(auth.user.role_id)) {
        return <div className="access-denied">Accès refusé</div>;
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        logo: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        if (data.logo) formData.append('logo', data.logo);

        post(route('brands.store'), {
            data: formData,
            onSuccess: () => reset()
        });
    };

    return (
        <>
            <Nav auth={auth} user={user}/>
            <Head title="Créer une marque" />
            <div className="create-brand-container" style={{marginBottom:'150px', marginTop:'50px'}}>
                <h1 className="title">Créer une nouvelle marque</h1>

                {errors.name && <div className="error">{errors.name}</div>}
                {errors.logo && <div className="error">{errors.logo}</div>}

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="brand-form">
                    <div className="form-group">
                        <label>Nom de la marque</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Ex: Audi"
                        />
                    </div>

                    <div className="form-group">
                        <label>Logo (optionnel)</label>
                        <input
                            type="file"
                            onChange={(e) => setData('logo', e.target.files[0])}
                        />
                    </div>

                    <button type="submit" disabled={processing} className="btn-submit">
                        Créer
                    </button>
                </form>
            </div>
            <Footer/>
        </>
    );
}