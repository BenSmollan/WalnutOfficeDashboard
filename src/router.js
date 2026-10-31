import { useEffect, useState } from 'react';

// Routes live in the URL hash so links and the back button work without a server.
// Names use only letters, digits and hyphens:
//   individual: #inputs, #priorities, #plan, #p-<priority id>-<insight|build|practice>, #preview
//   manager:    #team, #team-<person id>
const TABS = ['insight', 'build', 'practice'];

export const SCREENS_FOR = {
  individual: ['inputs', 'priorities', 'plan', 'priority', 'preview'],
  manager: ['team', 'member'],
};

export function parseHash(hash) {
  const h = (hash || '').replace(/^#\/?/, '');
  if (h.startsWith('p-')) {
    const rest = h.slice(2);
    const cut = rest.lastIndexOf('-');
    const tab = rest.slice(cut + 1);
    if (cut > 0 && TABS.includes(tab)) return { screen: 'priority', id: rest.slice(0, cut), tab };
  }
  if (h.startsWith('team-') && h.length > 5) return { screen: 'member', id: h.slice(5) };
  if (['inputs', 'priorities', 'plan', 'preview', 'team'].includes(h)) return { screen: h };
  return { screen: null };
}

export function priorityHash(id, tab = 'insight') {
  return `#p-${id}-${tab}`;
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  const navigate = (hash) => {
    if (window.location.hash === hash) return;
    window.location.hash = hash;
  };
  return [route, navigate];
}
