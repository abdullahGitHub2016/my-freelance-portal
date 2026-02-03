<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProposalController extends Controller
{
    /**
     * Display a listing of the freelancer's proposals.
     */
    public function index()
    {
        return Inertia::render('Proposals/Index', [
            'proposals' => Proposal::where('freelancer_id', Auth::id())
                ->with('projectListing')
                ->latest()
                ->get()
        ]);
    }

    /**
     * Store a newly created proposal in storage.
     */
    public function store(Request $request, Project $project)
    {
        // Using the validator facade or $request->validate with a type hint
        // helps remove the P1013 error in Intelephense.
        /** @var \Illuminate\Http\Request $request */
        $validated = $request->validate([
            'cover_letter'   => 'required|string|min:20',
            'bid_amount'     => 'required|numeric|min:1',
            'estimated_days' => 'required|integer|min:1',
        ]);

        // Prevent duplicate proposals for the same job
        $alreadyApplied = $project->proposals()
            ->where('freelancer_id', Auth::id())
            ->exists();

        if ($alreadyApplied) {
            return back()->withErrors([
                'cover_letter' => 'You have already submitted a proposal for this project.'
            ]);
        }

        // Create the proposal through the relationship
        $project->proposals()->create([
            'freelancer_id'  => Auth::id(),
            'cover_letter'   => $validated['cover_letter'],
            'bid_amount'     => $validated['bid_amount'],
            'estimated_days' => $validated['estimated_days'],
            'status'         => 'pending',
        ]);

        return redirect()->route('proposals.index')
            ->with('message', 'Proposal submitted successfully!');
    }
}
