<?php

namespace App\Http\Controllers;

use App\Models\ProjectListing;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;


class ProjectListingController extends Controller
{
    /**
     * Display the 'Find Work' feed.
     */
    public function index(): Response
    {
        $projects = ProjectListing::where('status', 'open')
            ->with('client:id,name')
            ->latest()
            ->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }

    /**
     * Display the specific project details.
     * * IMPORTANT: The variable $projectListing MUST match the {projectListing}
     * parameter in your routes/web.php for Route Model Binding to work.
     */
    public function show(ProjectListing $projectListing): Response
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
    public function store(Request $request, ProjectListing $projectListing)
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
