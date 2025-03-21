<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class SnippetController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Snippet::where('user_id',Auth::id())->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'=>'required|string',
            'code'=>'required',
            'language'=>'required|string',
            'description'=>'nullable|string',
        ]);

        return Snippet::create([
            'title'=>$request->title,
            'code'=>$request->code,
            'language'=>$request->language,
            'description'=>$request->description,
            'user_id'=> Auth::id(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Snippet $snippet)
    {
        $this->authorize('view',$snippet);
        return $snippet;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Snippet $snippet)
    {
        $this->authorize('update',$snippet);

        $request->validate([
            'title'=>'sometimes|string',
            'code'=>'sometimes',
            'language'=>'sometimes|string',
            'description'=>'nullable|string',
            'is_favorite'=>'boolean',
        ]);

        $snippet->update($request->all());
        return $snippet;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Snippet $snippet)
    {
        $this->authorize('delete',$snippet);
        $snippet->delete();
        return response()->json(['message'=>'snippet deleted']);
    }

    public function toggleFavorite(Snippet $snippet){
        $this->authorize('update',$snippet);
        $snippet->is_favorite = !$snippet->is_favorite;
        $snippet->save();
        return response()->json(['message'=>'favorite status updated', 'is_favorite'=>$snippet->is_favorite]);
    }
}
