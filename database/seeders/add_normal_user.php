<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'niroj',
            'email' => 'email3@email.com',
            'password' => bcrypt('user123'),
            'email_verified_at' => now(),
            'is_admin' => false
        ]);
    }
}