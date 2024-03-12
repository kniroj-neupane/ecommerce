<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItems;
use App\Http\Resources\CartItemsListResource;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $query = CartItems::query();

        $cartItems = $query->get();
        return Inertia::render('Cart',[
            'cartItems' => CartItemsListResource::collection($cartItems),
        ]);
    }
}
