<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryTreeResource;
use Illuminate\Http\Request;
use App\Models\Api\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\CategoryImage;
use Illuminate\Support\Facades\URL;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request('search', '');
        $sortField = request("sortField","updated_at");
        $sortDirection = request("sortDirection","desc");
        $query = Category::query()
        ->where('name', 'like', "%{$search}%")
        ->orderBy($sortField,$sortDirection)
            ->paginate(100);
        return CategoryResource::collection($query);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] =  '1';
        $data['updated_by'] =  '1';
        $data['active'] = '1';

         /** @var \Illuminate\Http\UploadedFile[] $images */
         $images = $data['images'] ?? [];
         $imagePositions = $data['image_positions'] ?? [];
 
         $category = Category::create($data);
 
         $this->saveImages($images, $imagePositions, $category);
 
         return new CategoryResource($category);
    }

    public function getAsTree()
    {
        return Category::getActiveAsTree(CategoryTreeResource::class);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->noContent();
    }

    private function saveImages($images, $positions, Category $category)
    {
        foreach ($positions as $id => $position) {
            CategoryImage::query()
                ->where('id', $id)
                ->update(['position' => $position]);
        }

        foreach ($images as $id => $image) {
            $path = 'images/' . Str::random();
            if (!Storage::exists($path)) {
                Storage::makeDirectory($path);
            }
            $name = Str::random().'.'.$image->getClientOriginalExtension();
            if (!Storage::putFileAs('public/' . $path, $image, $name)) {
                throw new \Exception("Unable to save file \"{$image->getClientOriginalName()}\"");
            }
            $relativePath = $path . '/' . $name;

            CategoryImage::create([
                'category_id' => $category->id,
                'path' => $relativePath,
                'url' => URL::to(Storage::url($relativePath)),
                'mime' => $image->getClientMimeType(),
                'size' => $image->getSize(),
                'position' => $positions[$id] ?? $id + 1
            ]);
        }
    }
}
