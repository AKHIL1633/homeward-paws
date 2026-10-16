import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { ArrowDown, ArrowRight, Heart, Home, ShieldCheck, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import type { Pet } from '@/lib/types';
import { PetGrid } from './pet-grid';
import { SoundToggle } from './sound-toggle';
import { WalkHomeIllustration } from './walk-home-illustration';

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

export function HomeStory({ pets, loadFailed }: { pets: Pet[]; loadFailed: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-reveal', {
        autoAlpha: 0,
        y: 38,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power3.out',
      });

      gsap.from('.hero-frame', {
        autoAlpha: 0,
        scale: 0.93,
        rotation: 2,
        duration: 1.1,
        ease: 'power3.out',
      });

      ScrollTrigger.batch('.reveal-card', {
        start: 'top 88%',
        once: true,
        onEnter: (elements) => gsap.from(elements, {
          autoAlpha: 0,
          y: 44,
          stagger: 0.1,
          duration: 0.75,
          ease: 'power3.out',
        }),
      });
    });

    media.add({ desktop: '(min-width: 901px)', motion: '(prefers-reduced-motion: no-preference)' }, (context) => {
      if (!context.conditions?.desktop || !context.conditions.motion) return;

      const story = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.walk-story',
          start: 'top top',
          end: '+=180%',
          pin: '.walk-stage',
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      story
        .fromTo('.walk-route', { drawSVG: '0%' }, { drawSVG: '100%', duration: 3 }, 0)
        .to('.story-person', { x: 420, duration: 3 }, 0.1)
        .to('.story-dog', { x: 390, duration: 3 }, 0.12)
        .to('.story-leash', { x: 405, duration: 3 }, 0.12)
        .to('.person-leg-front', { rotation: 19, transformOrigin: 'top center', yoyo: true, repeat: 5, duration: 0.25 }, 0.15)
        .to('.person-leg-back', { rotation: -19, transformOrigin: 'top center', yoyo: true, repeat: 5, duration: 0.25 }, 0.15)
        .to('.dog-leg-a', { rotation: 20, transformOrigin: 'top center', yoyo: true, repeat: 5, duration: 0.25 }, 0.15)
        .to('.dog-leg-b', { rotation: -20, transformOrigin: 'top center', yoyo: true, repeat: 5, duration: 0.25 }, 0.15)
        .to('.dog-tail', { rotation: 20, transformOrigin: 'right center', yoyo: true, repeat: 9, duration: 0.16 }, 0.1)
        .to('.story-ball', {
          motionPath: { path: '#ball-path', align: '#ball-path', alignOrigin: [0.5, 0.5] },
          rotation: 420,
          duration: 0.9,
          ease: 'power1.inOut',
        }, 2.05)
        .to('.story-home', { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'back.out(1.3)' }, 2.45)
        .to('.story-buildings', { autoAlpha: 0.16, duration: 0.45 }, 2.45)
        .to('.story-copy[data-beat="meet"]', { autoAlpha: 0, y: -20, duration: 0.3 }, 0.55)
        .fromTo('.story-copy[data-beat="walk"]', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.72)
        .to('.story-copy[data-beat="walk"]', { autoAlpha: 0, y: -20, duration: 0.3 }, 2.05)
        .fromTo('.story-copy[data-beat="home"]', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 2.35);
    });

    return () => media.revert();
  }, { scope: root });

  return (
    <article ref={root} className="home-story">
      <section className="hero-chapter" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="chapter-label hero-reveal"><span>01</span> A small hello</p>
          <h1 id="home-title" className="hero-reveal">Life gets bigger when <em>someone small</em> joins it.</h1>
          <p className="hero-intro hero-reveal">Meet dogs, cats, and wonderfully unexpected companions looking for a thoughtful home.</p>
          <div className="hero-actions hero-reveal">
            <Link className="button button-primary" to="/pets">Meet the buddies <ArrowRight size={18} /></Link>
            <Link className="text-link" to="/auth">Help someone find a home</Link>
          </div>
          <div className="hero-tools hero-reveal"><SoundToggle /><a href="#introductions" className="scroll-cue">Scroll to meet them <ArrowDown size={15} /></a></div>
        </div>
        <div className="hero-frame">
          <div className="hero-frame-label">The good part starts here</div>
          <img src="/art/hello-companions.webp" alt="A dog, cat, and their companion sharing a first hello" />
          <span className="hero-sticker">Hello,<br />friend!</span>
        </div>
      </section>

      <section id="introductions" className="introductions section-shell" aria-labelledby="introductions-title">
        <div className="section-heading reveal-card">
          <div><p className="chapter-label"><span>02</span> Real introductions</p><h2 id="introductions-title">Meet your next <em>everyday.</em></h2></div>
          <Link className="arrow-link" to="/pets">See everyone <ArrowRight size={18} /></Link>
        </div>
        {loadFailed ? <div className="load-notice" role="status"><strong>The noticeboard is taking a nap.</strong><span>Browse again in a moment to meet the latest buddies.</span></div> : <PetGrid pets={pets} />}
      </section>

      <section className="walk-story" aria-labelledby="walk-title-copy">
        <div className="walk-stage">
          <div className="walk-copy">
            <p className="chapter-label"><span>03</span> The walk home</p>
            <div className="story-copy" data-beat="meet"><p>First, a little trust.</p><h2 id="walk-title-copy">Give them time to come closer.</h2></div>
            <div className="story-copy" data-beat="walk"><p>Then, your shared rhythm.</p><h2>A walk becomes <em>your walk.</em></h2></div>
            <div className="story-copy" data-beat="home"><p>And one day, it is ordinary.</p><h2>They are simply <em>home.</em></h2></div>
          </div>
          <div className="walk-canvas"><WalkHomeIllustration /></div>
          <a href="#how-it-works" className="skip-story">Skip story</a>
        </div>
      </section>

      <section id="how-it-works" className="how-section section-shell" aria-labelledby="how-title">
        <div className="how-intro reveal-card"><p className="chapter-label"><span>04</span> A thoughtful start</p><h2 id="how-title">Small steps.<br /><em>Big life change.</em></h2></div>
        <div className="how-grid">
          <article className="reveal-card"><span className="step-icon"><Sparkles /></span><p className="step-number">01</p><h3>Notice a spark</h3><p>Look beyond the photograph. Read their story, needs, and everyday rhythm.</p></article>
          <article className="reveal-card"><span className="step-icon"><Heart /></span><p className="step-number">02</p><h3>Talk honestly</h3><p>Ask the caregiver questions and share what life in your home really looks like.</p></article>
          <article className="reveal-card"><span className="step-icon"><Home /></span><p className="step-number">03</p><h3>Choose for life</h3><p>Take the next step only when the fit feels kind for every person and paw involved.</p></article>
        </div>
      </section>

      <section className="trust-strip" aria-label="Adoption principles">
        <span><ShieldCheck size={20} /> Clear caregivers</span><span>Real pet stories</span><span>Thoughtful introductions</span><span>Homes for the long run</span>
      </section>

      <section className="home-chapter section-shell">
        <div className="home-art reveal-card"><img src="/art/home-together.webp" alt="A dog and cat resting beside their person in a sunlit home" /></div>
        <div className="home-copy reveal-card"><p className="chapter-label"><span>05</span> The best part</p><h2>Love looks a lot like <em>ordinary days.</em></h2><p>A familiar footstep. A warm patch of floor. Someone waiting when you come home.</p><Link className="button button-primary" to="/pets">Find your hello <ArrowRight size={18} /></Link></div>
      </section>
    </article>
  );
}
