import Footer from '@/Components/Footer';
import Nav from '@/Components/Nav';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';



export default function AdminIndex({ users, roles, auth, user }) {
    const [editingUser, setEditingUser] = useState(null);
    
    const { data, setData, patch, processing, errors, reset } = useForm({
        role_id: ''
    });

    const handleEditRole = (user) => {
        setEditingUser(user.id);
        setData('role_id', user.role_id);
    };

    const handleUpdateRole = (userId) => {
        patch(route('admin.update-role', userId), {
            onSuccess: () => {
                setEditingUser(null);
                reset();
            }
        });
    };

    const handleDeleteUser = (userId, userName) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${userName} ? Cette action est irréversible.`)) {
            router.delete(route('admin.delete-user', userId));
        }
    };

    const getRoleIcon = (roleId) => {
        switch(roleId) {
            case 1: return ;
            case 2: return ;
            case 3: return ;
            default: return ;
        }
    };

    const getRoleBadgeClass = (roleId) => {
        switch(roleId) {
            case 1: return 'role-badge user';
            case 2: return 'role-badge moderator';
            case 3: return 'role-badge admin';
            default: return 'role-badge user';
        }
    };

    return (
        <>
            <Head title="Administration" />
            <Nav auth={auth} user={user}/>
            <div className="admin-container">
                <div className="admin-wrapper">
                    {/* Header */}
                    <div className="admin-header">
                        <div className="admin-header-content">
                            
                            <div>
                                <h1 className="admin-title">Administration</h1>
                                <p className="admin-subtitle">Gérez les utilisateurs et leurs rôles</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-content">
                                
                                <div>
                                    <p className="stat-label">Total Utilisateurs</p>
                                    <p className="stat-number">{users.length}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-content">
                                
                                <div>
                                    <p className="stat-label">Modérateurs</p>
                                    <p className="stat-number">
                                        {users.filter(user => user.role_id === 2).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-content">
                                
                                <div>
                                    <p className="stat-label">Administrateurs</p>
                                    <p className="stat-number">
                                        {users.filter(user => user.role_id === 3).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="users-table-container">
                        <div className="table-header">
                            <h2 className="table-title">Utilisateurs</h2>
                        </div>
                        
                        <div className="table-wrapper">
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>Utilisateur</th>
                                        <th>Contact</th>
                                        <th>Rôle</th>
                                        <th>Inscription</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <div className="user-info">
                                                    <div className="user-avatar">
                                                        <span className="user-initials">
                                                            {user.first_name.charAt(0)}{user.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div className="user-details">
                                                        <div className="user-name">
                                                            {user.first_name} {user.name}
                                                        </div>
                                                        <div className="user-id">
                                                            ID: {user.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="contact-email">{user.email}</div>
                                                <div className="contact-phone">{user.phone}</div>
                                            </td>
                                            <td>
                                                {editingUser === user.id ? (
                                                    <div className="role-edit-container">
                                                        <select
                                                            value={data.role_id}
                                                            onChange={(e) => setData('role_id', e.target.value)}
                                                            className="role-select"
                                                        >
                                                            {roles.map((role) => (
                                                                <option key={role.id} value={role.id}>
                                                                    {role.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <button
                                                            onClick={() => handleUpdateRole(user.id)}
                                                            disabled={processing}
                                                            className="btn-save"
                                                        >
                                                            Sauver
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingUser(null)}
                                                            className="btn-cancel"
                                                        >
                                                            Annuler
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className={getRoleBadgeClass(user.role_id)}>
                                                        {getRoleIcon(user.role_id)}
                                                        <span>{user.role?.name}</span>
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                <span className="date-text">
                                                    {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="actions-container">
                                                    {editingUser !== user.id && (
                                                        <>
                                                            <button
                                                                onClick={() => handleEditRole(user)}
                                                                className="action-btn edit"
                                                            >
                                                                Edit
                                                            </button>
                                                            {user.id !== auth.user.id && (
                                                                <button
                                                                    onClick={() => handleDeleteUser(user.id, `${user.first_name} ${user.name}`)}
                                                                    className="action-btn delete"
                                                                >
                                                                Delete
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}