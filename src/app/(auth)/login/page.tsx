
'use client';
import { useEffect, useRef } from 'react';
import './../auth.css';
import { useRouter } from 'next/navigation';

export default function AuthUI() {
  const router = useRouter();
  const isClient = typeof window !== 'undefined';

  const switchCtnRef = useRef<HTMLDivElement>(null);
  const switchC1Ref = useRef<HTMLDivElement>(null);
  const switchC2Ref = useRef<HTMLDivElement>(null);
  const switchCircleRefs = useRef<HTMLDivElement[]>([]);
  const aContainerRef = useRef<HTMLDivElement>(null);
  const bContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isClient) return;

    const switchCtn = switchCtnRef.current;
    const switchC1 = switchC1Ref.current;
    const switchC2 = switchC2Ref.current;
    const switchCircles = switchCircleRefs.current;
    const aContainer = aContainerRef.current;
    const bContainer = bContainerRef.current;

    const allButtons = document.querySelectorAll('.auth-button.submit');
    const switchBtns = document.querySelectorAll('.switch-btn');

    if (
      !switchCtn ||
      !switchC1 ||
      !switchC2 ||
      !aContainer ||
      !bContainer
    ) {
      return;
    }

    const getButtons = (e: Event) => {
        e.preventDefault();
        // In a real app, you'd have auth logic here.
        // For now, just redirect to dashboard.
        router.push('/dashboard');
    }

    const changeForm = () => {
      switchCtn.classList.add('is-gx');
      setTimeout(function () {
        switchCtn.classList.remove('is-gx');
      }, 1500);

      switchCtn.classList.toggle('is-txr');
      switchCircles[0].classList.toggle('is-txr');
      switchCircles[1].classList.toggle('is-txr');

      switchC1.classList.toggle('is-hidden');
      switchC2.classList.toggle('is-hidden');
      aContainer.classList.toggle('is-txl');
      bContainer.classList.toggle('is-txl');
      bContainer.classList.toggle('is-z200');
    };

    const mainF = () => {
      allButtons.forEach((button) => {
        button.addEventListener('click', getButtons);
      });
      switchBtns.forEach((btn) => {
        btn.addEventListener('click', changeForm);
      });
    };

    mainF();

    document.body.classList.add('auth-body');

    // Cleanup function to remove class and event listeners
    return () => {
      document.body.classList.remove('auth-body');
       allButtons.forEach((button) => {
        button.removeEventListener('click', getButtons);
      });
      switchBtns.forEach((btn) => {
        btn.removeEventListener('click', changeForm);
      });
    };
  }, [isClient, router]);

  const addSwitchCircleRef = (el: HTMLDivElement) => {
    if (el && !switchCircleRefs.current.includes(el)) {
        switchCircleRefs.current.push(el);
    }
  }


  return (
    <div className="auth-main">
      <div
        className="auth-container a-container"
        id="a-container"
        ref={aContainerRef}
      >
        <form id="a-form" className="auth-form">
          <h2 className="auth-form_title auth-title">Create Account</h2>
          <div className="form__icons">
            <img
                className="auth-form__icon"
                src="https://e7.pngegg.com/pngimages/715/371/png-clipart-youtube-google-logo-google-s-google-account-youtube-text-trademark-thumbnail.png"
                alt="Google icon"
              />
          </div>
          <span className="auth-form__span">or use email for registration</span>
          <input
            className="auth-form__input"
            type="text"
            placeholder="Name"
          />
          <input
            className="auth-form__input"
            type="text"
            placeholder="Email"
          />
          <input
            className="auth-form__input"
            type="password"
            placeholder="Password"
          />
          <button className="auth-form__button auth-button submit">SIGN UP</button>
        </form>
      </div>

      <div
        className="auth-container b-container"
        id="b-container"
        ref={bContainerRef}
      >
        <form id="b-form" className="auth-form">
          <h2 className="auth-form_title auth-title">Sign in</h2>
          <div className="form__icons">
            <img
                className="auth-form__icon"
                src="https://e7.pngegg.com/pngimages/715/371/png-clipart-youtube-google-logo-google-s-google-account-youtube-text-trademark-thumbnail.png"
                alt="Google icon"
              />
          </div>
          <span className="auth-form__span">or use your email account</span>
          <input
            className="auth-form__input"
            type="text"
            placeholder="Email"
          />
          <input
            className="auth-form__input"
            type="password"
            placeholder="Password"
          />
          <a className="auth-form__link">Forgot your password?</a>
          <button className="auth-form__button auth-button submit">SIGN IN</button>
        </form>
      </div>

      <div className="auth-switch" id="switch-cnt" ref={switchCtnRef}>
        <div
          className="auth-switch__circle"
          ref={addSwitchCircleRef}
        ></div>
        <div
          className="auth-switch__circle auth-switch__circle--t"
          ref={addSwitchCircleRef}
        ></div>
        <div
          className="auth-switch__container"
          id="switch-c1"
          ref={switchC1Ref}
        >
          <h2 className="auth-switch__title auth-title">CorporateIntern</h2>
          <p className="auth-switch__description auth-description">
            To keep connected with us please login with your personal info
          </p>
          <button className="auth-switch__button auth-button switch-btn">
            SIGN IN
          </button>
        </div>

        <div
          className="auth-switch__container is-hidden"
          id="switch-c2"
          ref={switchC2Ref}
        >
          <h2 className="auth-switch__title auth-title">CorporateIntern</h2>
          <p className="auth-switch__description auth-description">
            Enter your personal details and start journey with us
          </p>
          <button className="auth-switch__button auth-button switch-btn">
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}
