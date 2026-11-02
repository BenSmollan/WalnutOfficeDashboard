# Development Plan prototype

A clickable prototype of the development dashboard for the IQ9 meeting in January.
It works on a laptop and a phone. Every person, company and piece of feedback in it is made up.

## What's in it

The layout of My plan follows the reference mock-up Jo shared, in the Walnut Office look.

A **Prototype** bar above the product holds the demo controls:
- **View as** switches between Sam Patel (the individual) and Alex Morgan (Sam's manager). Each person only sees their own screens.
- **Reset demo** goes back to the **start of the cycle** (nothing chosen yet) or a **mid-cycle example** (three priorities agreed, some progress made). A first visit opens the mid-cycle example.

**Sam, the individual**

| Screen | Address | What you can do |
| --- | --- | --- |
| My plan | `#plan` | Greeting, the three sources, the three priorities with their evidence and progress, and Coming up: next practice, the manager check-in and this week's reflection |
| Insight | `#insight` | Why a priority matters; mark as read; private reflections |
| Build | `#build` | Short learning items to tick off |
| Practice | `#practice` | Conversations to rehearse in Ovida (a mock screen for now) |
| Progress | `#progress` | Progress on each priority, all reflections, and what the manager can see |
| My inputs | `#inputs` | Opened from the source tiles: the Enneagram summary, company feedback, and your goals to add or edit |
| Choose priorities | `#priorities` | Opened from "Review my priorities": add three, set others aside, reorder, set the plan |
| Preview | `#preview` | Your profile exactly as your manager sees it |

Insight, Build and Practice show one priority at a time, with a switch between the three. A single priority's page is `#p-<id>-<insight|build|practice>`.

**Alex, the manager**

| Screen | Address | What you can do |
| --- | --- | --- |
| Your team | `#team` | An overview of everyone who reports to you: plan status, shared priorities and progress |
| A team member | `#team-<id>` | Their "how to work with me" summary and priorities (only if shared), steps to prepare for a feedback conversation, and a rehearsal button |

Sam's entry in the team updates live from what you click as Sam. The other five team members are fixed example data in `src/content.js`.

The Practice buttons open a mock practice screen until we have Ovida's link. Set `product.ovidaUrl` in `src/content.js` to make them open Ovida instead.

The AI that writes the priorities is not in this version. It arrives in the second version, as agreed in the quote.

## Content

All the words live in `src/content.js`. It currently holds placeholder content written to test the screens.
Jo and Romy's sample person, profile, feedback and priorities replace it. Never put real client names, reports or feedback anywhere in this repo.

## How clicks are saved

Everything a viewer does (goals, choices, ticks, reflections, practice sessions, sharing switches) is saved in their own browser. The **Reset demo** button in the header clears it, so the prototype starts fresh before each demo. There are no logins or database.

## Look and feel

Colours, fonts and details follow the Walnut Office taste profile: deep teal and sage, Spectral italic headings, Plus Jakarta Sans for everything else, paper cards with a teal top edge, and coral kept for the main action on each screen. The values are at the top of `src/styles.css`.

## Running it

You need Node 20 or later.

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

To build for hosting:

```bash
npm run build
```

The finished site is in `dist/`. Any static host works (Netlify, Vercel, or a folder on the website). Once the AI is added, it needs a host that can run a small server function to keep the AI key secret, such as Netlify or Vercel.

To build one self-contained HTML file (used for the private preview link):

```bash
npm run build:single
```

## Code map

- `src/content.js`: all the placeholder content
- `src/useDemoState.js`: what the viewer has done, saved in the browser
- `src/router.js`: screen addresses in the URL hash, and which screens each viewer can open
- `src/team.js`: builds the manager's team list, including Sam's live entry
- `src/screens/`: one file per screen
- `src/components/`: shared pieces (header, three sources side by side, quotes, progress bar, practice screen)
- `src/styles.css`: the Walnut look
