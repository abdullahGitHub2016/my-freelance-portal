<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;


class ProjectController extends Controller
{
    /**
     * Display the 'Find Work' feed.
     */
    public function index(Request $request)
    {
        $jobs = Project::query()
            // Add 'min_budget' and 'max_budget' to the allowed filter keys
            ->filter($request->only(['search', 'experience_levels', 'budget_type', 'min_budget', 'max_budget']))
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Projects/SearchResults', [
            'jobs' => $jobs,
            'filters' => $request->all(),
        ]);
    }

    /**
     * Display the specific project details.
     * * IMPORTANT: The variable $projectListing MUST match the {projectListing}
     * parameter in your routes/web.php for Route Model Binding to work.
     */
    public function show(Project $projectListing): Response
    {
        // Load the client relationship
        $projectListing->load('client:id,name');

        return Inertia::render('Projects/Show', [
            'project' => $projectListing,
            'auth_user_id' => Auth::id(),
        ]);
    }

    /**
     * Store a new project listing.
     */
    public function store(Request $request, Project $projectListing)
    {
        // DEBUG: If you still get the error, uncomment the line below to test
        // dd($projectListing->toArray());

        $id = $projectListing->id; // The red underline should disappear now

        $validated = $request->validate([
            'cover_letter'   => 'required|string|min:20',
            'bid_amount'     => 'required|numeric',
            'estimated_days' => 'required|integer',
        ]);

        // We manually set the job_id to ensure it's not null
        $proposal = new \App\Models\Proposal();
        $proposal->job_id = $projectListing->id;
        $proposal->freelancer_id = Auth::id();
        $proposal->cover_letter = $validated['cover_letter'];
        $proposal->bid_amount = $validated['bid_amount'];
        $proposal->estimated_days = $validated['estimated_days'];
        $proposal->status = 'pending';

        $proposal->save();

        return redirect()->back()->with('success', 'Proposal submitted!');
    }
}
