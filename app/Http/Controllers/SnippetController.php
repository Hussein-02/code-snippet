<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SnippetController extends Controller
{
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
    public function destroy(string $id)
    {
        //
    }
}
