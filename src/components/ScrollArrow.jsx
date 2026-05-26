import Lottie from 'lottie-react';
import arrowScroll from '../assets/arrow_scroll.json';

export default function ScrollArrow() {
  return (
    <div className="scroll-arrow" aria-hidden="true">
      <Lottie animationData={arrowScroll} loop autoplay />
    </div>
  );
}
