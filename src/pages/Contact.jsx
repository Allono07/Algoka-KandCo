import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useNavigateWithTransition from '../hooks/useNavigateWithTransition';

export default function Contact() {
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const ledeRef = useRef(null);
  const navigateWithTransition = useNavigateWithTransition();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const animatedItems = [
        ledeRef.current,
        ...formRef.current.querySelectorAll('.form-field, .page-shell__submit'),
      ];

      gsap.fromTo(
        headingRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        animatedItems,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.12,
        }
      );
    }, rootRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="page-shell page-shell--contact">
      <button
        type="button"
        className="page-shell__back"
        data-cursor-hover
        onClick={() => navigateWithTransition('/')}
      >
        <span aria-hidden="true">←</span> Home
      </button>

      <div className="page-shell__inner">
        <div className="page-shell__heading-wrap">
          <h1 ref={headingRef} className="page-shell__heading">
            Let&apos;s talk.
          </h1>
        </div>

        <p ref={ledeRef} className="page-shell__lede">
          If you&apos;re shaping something ambitious, we&apos;d love to hear what needs to move
          next.
        </p>

        <form className="contact-form" ref={formRef} onSubmit={(event) => event.preventDefault()}>
          <label className="form-field">
            <span className="form-field__label">Name</span>
            <input type="text" name="name" placeholder="Your name" />
          </label>

          <label className="form-field">
            <span className="form-field__label">Email</span>
            <input type="email" name="email" placeholder="name@studio.com" />
          </label>

          <label className="form-field">
            <span className="form-field__label">Message</span>
            <textarea name="message" rows="4" placeholder="What are you building?" />
          </label>

          <button
            type="submit"
            className="pill-button pill-button--solid page-shell__submit"
            data-cursor-hover
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
