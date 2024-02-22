<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            "email"=> ['email','required'],
            'password'=> 'required',
            'remember' => 'boolean'
        ]);
        $remember = $credentials['remember'];
        unset($credentials['remember']);
        if(!Auth::attempt($credentials, $remember)) {
            return response([
                'message' => 'Email or password is incorrect'
            ],403);
        }
        $user = Auth::user();
        if(!$user->is_admin){
            return response([
                'message'=> 'You are not authenticated to access this page'
            ],403);
        }
        $token = $user->createToken('main')->plainTextToken;
        if(Auth::attempt($credentials,$remember)){
            return response([
                'user' => new UserResource($user),
                'token' => $token
            ]);
        }
        
    }

    public function logout()
    {
        $user = Auth::user();
        if($user)
        $user->currentAccessToken()->delete();
        else
            return response('',204);
        return response('', 204);
    }
}
