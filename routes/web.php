<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectListingController;
use App\Http\Controllers\ProposalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// 1. Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// 2. Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // --- Project Listings ---
    Route::get('/projects', [ProjectListingController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [ProjectListingController::class, 'create'])->name('projects.create');
    Route::post('/projects', [ProjectListingController::class, 'store'])->name('projects.store');
    Route::get('/projects/{projectListing}', [ProjectListingController::class, 'show'])->name('projects.show');

    // --- Proposals ---
    // Freelancers submit proposals to a specific project
Route::post('/projects/{projectListing}/proposals', [ProposalController::class, 'store'])
    ->name('proposals.store');

    Route::get('/my-proposals', [ProposalController::class, 'myProposals'])
        ->name('proposals.index');

    // --- Profile Management ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
