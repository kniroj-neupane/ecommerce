<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItems;
use App\Http\Resources\CartItemsListResource;
use App\Http\Resources\ProductListResource;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function index()
    {
        $query = CartItems::query();

        $cartItems = $query->get();
        $ids = Arr::pluck($cartItems->toArray(), 'product_id');
        $products = Product::query()->whereIn('id', $ids)->get();
        return Inertia::render('Cart/Cart', [
            'cartItems' => CartItemsListResource::collection($cartItems),
            'products' => ProductListResource::collection($products),
        ]);
    }
    public function store(Request $request)
    {
        $user = $request->user();
        
        $quantity = $request->post('quantity', 1);
        
        $productId = $request->post('product_id');
        $product = Product::query()->where('id', $productId)->first();

        if ($user) {
            $totalQuantity = 0;
            $cartItem = CartItems::where(['user_id' => $user->id, 'product_id' => $product->id])->first();
            if ($cartItem) {
                $totalQuantity = $cartItem->quantity + $quantity;
            } else {
                $totalQuantity = $quantity;
            }
        } else {
            return response([
                'message' => 'no user',
            ]);
        }
        if ($product->quantity !== null && $product->quantity <= $quantity) {
            return response([
                'message' => match ( $product->quantity ) {
                    0 => 'The product is out of stock',
                    1 => 'There is only one item left',
                    default => 'There are only ' . $product->quantity . ' items left'
                }
            ], 422);
        }
        if ($user) {

            $cartItem = CartItems::where(['user_id' => $user->id, 'product_id' => $product->id])->first();

            if ($cartItem) {
                $cartItem->quantity += $quantity;
                $cartItem->update();
            } else {
                $data = [
                    'user_id' => $request->user()->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                ];
                CartItems::create($data);
            }

            return response([
                'message' => 'Added to cart successfully'
            ],201);
        } 
    }
    public function count(Request $request)
    {
        $user = $request->user();
        $count = CartItems::where('user_id',$user->id)->count();
        return response([
            'count' => $count
        ],200);
    }
}
