import { howToWorkWithMe, person, samInTeam, team } from './content.js';
import { planPriorities, progressFor } from './useDemoState.js';

export const STATUS_LABEL = {
  active: 'Plan set',
  choosing: 'Choosing priorities',
  invited: 'Not started',
};

// Sam's entry is built from what the viewer has clicked, so the manager view
// changes as soon as Sam sets a plan or changes what is shared.
function samMember(state) {
  return {
    id: 'sam',
    name: person.name,
    firstName: person.firstName,
    role: person.role,
    status: state.planSet ? 'active' : 'choosing',
    lastActive: samInTeam.lastActive,
    nextOneToOne: samInTeam.nextOneToOne,
    sharing: state.sharing,
    howToWorkWithMe,
    priorities: state.planSet
      ? planPriorities(state).map((p) => {
          const pr = progressFor(state, p);
          return { id: p.id, title: p.title, why: p.why, done: pr.doneSteps, steps: pr.steps };
        })
      : [],
    practice: samInTeam.practice,
  };
}

export function teamMembers(state) {
  return [samMember(state), ...team];
}

export function findMember(state, id) {
  return teamMembers(state).find((m) => m.id === id);
}

export function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
