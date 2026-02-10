<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
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
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
    Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    // This will be the main "Find Work" page
    Route::get('/find-work', [ProjectController::class, 'index'])->name('projects.index');

    // --- Proposals ---
    Route::get('/my-proposals', [ProposalController::class, 'myProposals'])
        ->name('proposals.index');

    // Freelancers submit proposals to a specific project
    Route::post('/projects/{project}/proposals', [ProposalController::class, 'store'])
        ->name('proposals.store');
    Route::get('/projects/{project}/proposals', [ProjectController::class, 'proposals'])
        ->name('projects.proposals');
    Route::get('projects/{project}/proposals/create', [ProposalController::class, 'create'])
        ->name('proposals.create');

    Route::patch('/proposals/{proposal}/status', [ProposalController::class, 'updateStatus'])
        ->name('proposals.update-status');
    // Add this line specifically:
    Route::get('/my-postings', [ProjectController::class, 'myPostings'])
        ->name('projects.my-postings');



    // --- Profile Management ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
