import Footer from '@/Components/Footer';
import Nav from '@/Components/Nav';
import { Head, useForm } from '@inertiajs/react';


export default function CreateBrand({ auth, user }) {
    // CHECK AUTH ET AUTH.USER
    if (!auth || !auth.user) {
        return <div className="access-denied"> <p>Accès refusé ou non connecté</p></div>;
    }

    // UNIQUEMENT MODO OU ADMIN
    if (![2, 3].includes(auth.user.role_id)) {
        return <div className="access-denied"><p>Accès refusé</p></div>;
    }

    // USEFORM 
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        logo: null
    });

    // CREATION FORMDATA POUR LE FORM AJOUTE NOM ET LE LOGO S'IL EST MIS AUSSI, PUIS METHODE POST ET RESET A LA FIN 
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

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="brand-form">
                    <div className="form-group">
                        <label>Nom de la marque</label>
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Ex: Audi"/>
                    </div>
                    <div className="form-group">
                        <label>Logo (optionnel)</label>
                        {/* LE [0] SERT PARCE QUE LE FILE RENVOIE UN OBJET ET IL PREND LE 0 QUI EST LE 'NAME' */}
                        <input type="file" onChange={(e) => setData('logo', e.target.files[0])}/>
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