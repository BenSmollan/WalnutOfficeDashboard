import { useCallback, useState } from 'react';
import Header from './components/Header.jsx';
import PracticeModal from './components/PracticeModal.jsx';
import Inputs from './screens/Inputs.jsx';
import Choose from './screens/Choose.jsx';
import Plan from './screens/Plan.jsx';
import Priority from './screens/Priority.jsx';
import Team from './screens/Team.jsx';
import Profile from './screens/Profile.jsx';
import { SCREENS_FOR, useHashRoute } from './router.js';
import { useDemoState } from './useDemoState.js';

function homeFor(viewer, state) {
  if (viewer === 'manager') return 'team';
  return state.planSet ? 'plan' : 'inputs';
}

export default function App() {
  const [route, navigate] = useHashRoute();
  const [state, actions] = useDemoState();
  const [practising, setPractising] = useState(null);

  const viewer = state.viewer;
  // Each viewer only reaches their own screens. Anything else falls back to their home screen.
  const allowed = route.screen && SCREENS_FOR[viewer].includes(route.screen);
  const screen = allowed ? route.screen : homeFor(viewer, state);
  const closePractice = useCallback(() => setPractising(null), []);

  const onPractise = (conversation, openedExternally = false) => {
    if (openedExternally) {
      actions.logSession(conversation.id);
      return;
    }
    setPractising(conversation);
  };

  const switchViewer = (next) => {
    actions.setViewer(next);
    navigate(`#${homeFor(next, state)}`);
  };

  return (
    <>
      <Header
        screen={screen}
        viewer={viewer}
        onSwitchViewer={switchViewer}
        onReset={() => {
          actions.reset();
          navigate('#inputs');
        }}
      />
      <main className="main" id="main">
        {screen === 'inputs' && <Inputs state={state} actions={actions} />}
        {screen === 'priorities' && <Choose state={state} actions={actions} navigate={navigate} />}
        {screen === 'plan' && <Plan state={state} actions={actions} />}
        {screen === 'priority' && <Priority route={route} state={state} actions={actions} onPractise={onPractise} />}
        {screen === 'preview' && <Profile id="sam" state={state} onPractise={onPractise} preview />}
        {screen === 'team' && <Team state={state} />}
        {screen === 'member' && <Profile id={route.id} state={state} onPractise={onPractise} />}
      </main>
      <footer className="footer">
        <p>Prototype for demonstration. All people, companies and feedback shown are fictional.</p>
      </footer>
      {practising && (
        <PracticeModal
          conversation={practising}
          onClose={closePractice}
          onFinish={() => {
            actions.logSession(practising.id);
            setPractising(null);
          }}
        />
      )}
    </>
  );
}
