import { forwardRef } from 'react';

const Curtain = forwardRef(function Curtain(_, ref) {
  return <div id="curtain" ref={ref} aria-hidden="true" />;
});

export default Curtain;
