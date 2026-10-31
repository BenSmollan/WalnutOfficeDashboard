import { useEffect, useState } from 'react';

// Routes live in the URL hash so links and the back button work without a server.
// Names use only letters, digits and hyphens: #inputs, #priorities, #plan, #manager,
// and #p-<priority id>-<insight|build|practice> for a single priority.
const TABS = ['insight', 'build', 'practice'];

export function parseHash(hash) {
  const h = (hash || '').replace(/^#\/?/, '');
  if (h.startsWith('p-')) {
    const rest = h.slice(2);
    const cut = rest.lastIndexOf('-');
    const tab = rest.slice(cut + 1);
    if (cut > 0 && TABS.includes(tab)) return { screen: 'priority', id: rest.slice(0, cut), tab };
  }
  if (['inputs', 'priorities', 'plan', 'manager'].includes(h)) return { screen: h };
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
