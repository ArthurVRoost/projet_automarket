<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Afficher la page d'administration
     */
    public function index(): Response
    {
        $users = User::with('role')->orderBy('created_at', 'desc')->get();
        $roles = Role::all();

        return Inertia::render('Admin', [
            'users' => $users,
            'roles' => $roles,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    /**
     * Mettre à jour le rôle d'un utilisateur
     */
    public function updateUserRole(Request $request, User $user)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);

        // Empêcher un admin de se retirer ses propres droits admin
        if ($user->id === auth()->id() && $request->role_id != 3) {
            return Inertia::location('/admin');;
        }

        $user->update([
            'role_id' => $request->role_id
        ]);

        $roleName = Role::find($request->role_id)->name;
        
        return Inertia::location('/admin');;
    }

    /**
     * Supprimer un utilisateur
     */
    public function deleteUser(User $user)
    {
        // Empêcher un admin de se supprimer lui-même
        if ($user->id === auth()->id()) {
            return Inertia::location('/admin');;
        }

        $userName = $user->first_name . ' ' . $user->name;
        $user->delete();

        return Inertia::location('/admin');
    }
}