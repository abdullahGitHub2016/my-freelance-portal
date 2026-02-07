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
            ->with(['client']) // Load client for payment status
            ->withCount('proposals') // Load count for proposal ranges
            ->filter($request->only(['search', 'experience_levels', 'budget_type']))
            ->paginate(10);

        return Inertia::render('Projects/SearchResults', [
            'jobs' => $jobs,
            'filters' => $request->all(),
        ]);
    }

    /**
     * Display the specific project details.
     * * IMPORTANT: The variable $project MUST match the {project}
     * parameter in your routes/web.php for Route Model Binding to work.
     */
    public function show(Project $project)
    {
        return Inertia::render('Projects/Show', [
            'project' => $project->loadCount('proposals')->load('client'),
            'auth' => [
                'user' => Auth::user(),
            ],
            // Dynamic stats
            'stats' => [
                'proposals_count' => $project->proposals()->count(),
                'is_verified' => (bool) $project->client->email_verified_at, // Example logic
            ]
        ]);
    }

    /**
     * Store a new project listing.
     */
    public function store(Request $request, Project $project)
    {
        // DEBUG: If you still get the error, uncomment the line below to test
        // dd($project->toArray());

        $id = $project->id; // The red underline should disappear now

        $validated = $request->validate([
            'cover_letter'   => 'required|string|min:20',
            'bid_amount'     => 'required|numeric',
            'estimated_days' => 'required|integer',
        ]);

        // We manually set the job_id to ensure it's not null
        $proposal = new \App\Models\Proposal();
        $proposal->job_id = $project->id;
        $proposal->freelancer_id = Auth::id();
        $proposal->cover_letter = $validated['cover_letter'];
        $proposal->bid_amount = $validated['bid_amount'];
        $proposal->estimated_days = $validated['estimated_days'];
        $proposal->status = 'pending';

        $proposal->save();

        return redirect()->back()->with('success', 'Proposal submitted!');
    }
}
