import { useCallback, useState } from 'react';
import Header from './components/Header.jsx';
import PracticeModal from './components/PracticeModal.jsx';
import Inputs from './screens/Inputs.jsx';
import Choose from './screens/Choose.jsx';
import Plan from './screens/Plan.jsx';
import Priority from './screens/Priority.jsx';
import Manager from './screens/Manager.jsx';
import { useHashRoute } from './router.js';
import { useDemoState } from './useDemoState.js';

export default function App() {
  const [route, navigate] = useHashRoute();
  const [state, actions] = useDemoState();
  const [practising, setPractising] = useState(null);

  const screen = route.screen || (state.planSet ? 'plan' : 'inputs');
  const closePractice = useCallback(() => setPractising(null), []);

  const onPractise = (conversation, openedExternally = false) => {
    if (openedExternally) {
      actions.logSession(conversation.id);
      return;
    }
    setPractising(conversation);
  };

  return (
    <>
      <Header route={{ ...route, screen }} onReset={() => { actions.reset(); navigate('#inputs'); }} />
      <main className="main" id="main">
        {screen === 'inputs' && <Inputs state={state} actions={actions} />}
        {screen === 'priorities' && <Choose state={state} actions={actions} navigate={navigate} />}
        {screen === 'plan' && <Plan state={state} actions={actions} />}
        {screen === 'priority' && <Priority route={route} state={state} actions={actions} onPractise={onPractise} />}
        {screen === 'manager' && <Manager state={state} onPractise={onPractise} />}
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
