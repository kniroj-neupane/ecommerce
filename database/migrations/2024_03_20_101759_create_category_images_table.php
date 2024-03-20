<?php

use Illuminate\Support\Collection;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories');
            $table->string('path', 255);
            $table->string('url', 255);
            $table->string('mime', 55);
            $table->integer('size');
            $table->integer('position')->nullable();
            $table->timestamps();
        });

        DB::table('categories')
            ->chunkById(100, function (Collection $categories) {
                $categories = $categories->map(function ($p) {
                    return [
                        'category_id' => $p->id,
                        'path' => '',
                        'url' => $p->image,
                        'mime' => $p->image_mime,
                        'size' => $p->image_size,
                        'position' => 1,
                        'created_at' => \Carbon\Carbon::now(),
                        'updated_at' => \Carbon\Carbon::now()
                    ];
                });

                DB::table('category_images')->insert($categories->all());

            });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('image');
            $table->dropColumn('image_mime');
            $table->dropColumn('image_size');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('image', 2000)->nullable()->after('slug');
            $table->string('image_mime')->nullable()->after('image');
            $table->integer('image_size')->nullable()->after('image_mime');
        });

        DB::table('categories')
            ->select('id')
            ->chunkById(100, function (Collection $categories) {
                foreach ($categories as $category) {
                    $image = DB::table('category_images')
                        ->select(['category_id', 'url', 'mime', 'size'])
                        ->where('category_id', $category->id)
                        ->first();
                    if ($image) {
                        DB::table('categories')
                            ->where('id', $image->category_id)
                            ->update([
                                'image' => $image->url,
                                'image_mime' => $image->mime,
                                'image_size' => $image->size
                            ]);
                    }
                }
            });

        Schema::dropIfExists('product_images');
    }
};