<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware(['auth:sanctum', 'admin'])->group(function () {
//     Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
// });
Route::post('/logout',[\App\Http\Controllers\Api\AuthController::class,'logout']);
Route::apiResource('products', ProductController::class);
Route::apiResource('categories', CategoryController::class)->except('show');
Route::get('/categories/tree',[CategoryController::class,'getAsTree']);
Route::post('/login',[\App\Http\Controllers\Api\AuthController::class,'login']);