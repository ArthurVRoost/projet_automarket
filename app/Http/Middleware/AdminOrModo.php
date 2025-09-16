<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminOrModo
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        // IN ARRAY VERIFIE SI C'EST BIEN DANS LE TABLEAU DONC 2 OU 3
        if (!in_array($user->role_id, [2, 3])) {
            abort(403, "Accès refusé");
        }

        return $next($request);
    }
}
