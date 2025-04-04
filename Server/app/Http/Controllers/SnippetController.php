<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Tymon\JWTAuth\Facades\JWTAuth;

class SnippetController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            $query = Snippet::where('user_id', $user->id);

            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%$search%")
                        ->orWhere('description', 'like', "%$search%")
                        ->orWhere('code', 'like', "%$search%");
                });
            }

            if ($request->has('language')) {
                $query->where('language', $request->language);
            }

            if ($request->has('favorite')) {
                $query->where('is_favorite', true);
            }

            return response()->json(['status' => 'success', 'snippets' => $query->get()]);
        } catch (Exception $e) {
            return response()->json(['message' => $e], 401);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            $request->validate([
                'title' => 'required|string',
                'code' => 'required',
                'language' => 'required|string',
                'description' => 'nullable|string',
            ]);

            $snippet = Snippet::create([
                'title' => $request->title,
                'code' => $request->code,
                'language' => $request->language,
                'description' => $request->description,
                'user_id' => $user->id,
            ]);

            return response()->json([
                'success' => true,
                'snippet' => $snippet,
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Snippet $snippet)
    {
        $this->authorize('view', $snippet);
        return $snippet;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Snippet $snippet)
    {
        // $this->authorize('update', $snippet);
        try {
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            $request->validate([
                'title' => 'sometimes|string',
                'code' => 'sometimes',
                'language' => 'sometimes|string',
                'description' => 'nullable|string',
                'is_favorite' => 'boolean',
            ]);

            $snippet->update($request->all());

            return response()->json([
                'success' => 'true',
                'snippet' => $snippet,
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Snippet $snippet)
    {
        // $this->authorize('delete', $snippet);
        $user = JWTAuth::parseToken()->authenticate();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $snippet->delete();
        return response()->json(['success' => true]);
    }

    public function toggleFavorite(Snippet $snippet)
    {
        $user = JWTAuth::parseToken()->authenticate();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $snippet->is_favorite = !$snippet->is_favorite;
        $snippet->save();
        return response()->json(['message' => 'favorite status updated', 'is_favorite' => $snippet->is_favorite]);
    }
}
