import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Greeting fade in
      tl.fromTo(
        greetingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // Avatar 3D pop and float
      tl.fromTo(
        avatarRef.current,
        { opacity: 0, scale: 0, rotateY: -15 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
        '-=0.4'
      );

      // Name character stagger animation
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
          '-=0.8'
        );
      }

      // Role typewriter effect
      tl.fromTo(
        roleRef.current,
        { opacity: 0, width: 0 },
        { opacity: 1, width: '100%', duration: 1 },
        '-=0.4'
      );

      // CTA button bloom
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.2'
      );

      // Continuous floating animation for avatar
      gsap.to(avatarRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Breathing scale animation
      gsap.to(avatarRef.current, {
        scale: 1.03,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse move handler for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !avatarRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to(avatarRef.current, {
        rotateY: xPercent * 10,
        rotateX: -yPercent * 10,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split name into characters
  const name = 'Awais Afridi';
  const nameChars = name.split('').map((char, i) => (
    <span key={i} className="char inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(107, 70, 193, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(107, 70, 193, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Greeting */}
        <span
          ref={greetingRef}
          className="inline-flex items-center gap-2 text-muted-foreground text-sm sm:text-base mb-6 opacity-0"
        >
          <Sparkles className="w-4 h-4 text-pink" />
          Hello, I'm
          <Sparkles className="w-4 h-4 text-purple" />
        </span>

        {/* Avatar */}
        <div
          ref={avatarRef}
          className="relative mx-auto mb-8 w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 opacity-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple via-pink to-blue-accent animate-spin-slow opacity-50 blur-md" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 glow-purple">
            <img
              src="/images/MyPic.jpg"
              alt="Awais afridi"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative ring */}
          <div className="absolute -inset-4 rounded-full border border-purple/30 animate-pulse" />
          <div className="absolute -inset-8 rounded-full border border-pink/20 animate-pulse" style={{ animationDelay: '-1s' }} />
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 overflow-hidden"
        >
          <span className="text-gradient">{nameChars}</span>
        </h1>

        {/* Role */}
        <p
          ref={roleRef}
          className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-10 font-light opacity-0"
        >
          Creative Full Stack Developer
        </p>

        {/* CTA Button */}
        <div ref={ctaRef} className="opacity-0">
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="group relative px-8 py-6 text-lg font-medium bg-gradient-to-r from-purple to-pink hover:from-purple-light hover:to-pink-light transition-all duration-300 glow-purple hover:shadow-glow-pink"
          >
            View My Work
            <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
