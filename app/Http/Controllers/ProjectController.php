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
            ->with(['client', 'country']) // 'country' is the requirement for the freelancer
            ->withCount('proposals')
            ->latest()
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
            'stats' => [
                'proposals_count' => $project->proposals()->count(),
                'is_verified' => (bool) $project->client->email_verified_at,
            ],
            'hasSubmittedProposal' => $project->proposals()
                ->where('freelancer_id', Auth::id())
                ->exists()
        ]);
    }

    // app/Http/Controllers/ProjectController.php

    public function create()
    {
        if (Auth::user()->role !== 'client') {
            return redirect()->route('projects.index')->with('error', 'Only clients can post jobs.');
        }
        return Inertia::render('Projects/Create');
    }

    /**
     * Store a new project listing.
     */
    /**
     * Store a new project listing (Client Action).
     */
    /**
     * Store a NEW PROJECT (Client Action)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'            => 'required|string|max:255',
            'description'      => 'required|string',
            'category'         => 'required|string',
            'budget_type'      => 'required|in:fixed,hourly',
            'budget_amount'    => 'required|numeric|min:1',
            'experience_level' => 'required|in:entry,intermediate,expert',
            'duration'         => 'nullable|string',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Using relationship ensures client_id is set automatically
        $user->projects()->create([
            ...$validated,
            'status' => 'open',
            'connects_required' => 4,
        ]);

        return redirect()->route('projects.my-postings')->with('success', 'Job posted!');
    }

    /**
     * Show the form for editing the project.
     */
    public function edit(Project $project)
    {
        if (Auth::id() !== $project->client_id) abort(403);
        return Inertia::render('Projects/Edit', ['project' => $project]);
    }

    /**
     * Update the project in the database.
     */
    public function update(Request $request, Project $project)
    {
        if (Auth::id() !== $project->client_id) abort(403);

        $validated = $request->validate([
            'title'            => 'required|string|max:255',
            'description'      => 'required|string',
            'category'         => 'required|string',
            'budget_type'      => 'required|in:fixed,hourly',
            'budget_amount'    => 'required|numeric',
            'experience_level' => 'required|in:entry,intermediate,expert',
            'status'           => 'required|in:open,in_progress,completed,cancelled',
        ]);

        $project->update($validated);

        return redirect()->route('projects.my-postings')->with('success', 'Updated!');
    }

    // app/Http/Controllers/ProjectController.php

    public function proposals(Project $project)
    {
        // Authorization: Only the person who posted the job can see the bids
        if (Auth::id() !== $project->client_id) {
            abort(403);
        }

        return Inertia::render('Projects/Proposals', [
            'project' => $project,
            'proposals' => $project->proposals()
                ->with(['freelancer.address.country']) // Lively location data
                ->latest()
                ->get()
        ]);
    }

    public function updateStatus(Request $request, Proposal $proposal)
    {
        // Authorization: Only the client who owns the project can accept/decline bids
        if (Auth::id() !== $proposal->project->client_id) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:accepted,declined,pending',
        ]);

        $proposal->update([
            'status' => $validated['status']
        ]);

        return back()->with('message', "Proposal has been {$validated['status']}.");
    }

    // app/Http/Controllers/ProjectController.php

    public function myPostings()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        return Inertia::render('Projects/MyPostings', [
            'projects' => $user->projects()->withCount('proposals')->latest()->get()
        ]);
    }
}
