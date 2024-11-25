<?php

namespace App\Http\Controllers;

use App\Models\Expert;
use App\Http\Requests\StoreExpertRequest;
use App\Http\Requests\UpdateExpertRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpertController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
       
        $registerData = $request->data;
       return Inertia::render('Auth/ExpertInfoForm', ['registerData'=> $registerData]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpertRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Expert $expert)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expert $expert)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpertRequest $request, Expert $expert)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expert $expert)
    {
        //
    }
}
