import { useContext } from 'react';
import { TransitionContext } from '../context/TransitionContext';

export default function useNavigateWithTransition() {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error('useNavigateWithTransition must be used within a TransitionProvider.');
  }

  return context.navigateWithTransition;
}
