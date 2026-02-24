import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Users, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

const AnimatedStat = ({ value, suffix, label, icon }: StatProps) => {
  const [count, setCount] = useState(0);
  const statRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = statRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        gsap.to(
          { val: 0 },
          {
            val: value,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              setCount(Math.floor(this.targets()[0].val));
            },
          }
        );
      },
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <div
      ref={statRef}
      className="group relative p-6 rounded-2xl glass hover:bg-white/10 transition-all duration-300 cursor-pointer"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple/20 to-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-4xl font-heading font-bold text-gradient mb-1">
          {count}
          {suffix}
        </div>
        <div className="text-muted-foreground text-sm">{label}</div>
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card reveal animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text reveal animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt effect on mouse move
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const stats = [
    { value: 50, suffix: '+', label: 'Projects Completed', icon: <Briefcase className="w-6 h-6 text-purple" /> },
    { value: 5, suffix: '', label: 'Years Experience', icon: <Code2 className="w-6 h-6 text-pink" /> },
    { value: 30, suffix: '+', label: 'Happy Clients', icon: <Users className="w-6 h-6 text-blue-accent" /> },
    { value: 15, suffix: '+', label: 'Design Awards', icon: <Palette className="w-6 h-6 text-purple" /> },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <h2
          ref={headingRef}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-16 opacity-0"
        >
          About <span className="text-gradient">Me</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Glass card with bio */}
          <div
            ref={cardRef}
            className="relative p-8 sm:p-10 rounded-3xl glass opacity-0"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink/20 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold mb-6">
                Crafting Digital <span className="text-gradient">Experiences</span>
              </h3>

              <p
                ref={textRef}
                className="text-muted-foreground text-lg leading-relaxed mb-6 opacity-0"
              >
                I craft digital experiences that merge artistic vision with technical precision. 
                With over 5 years in the industry, I specialize in creating interfaces that 
                don't just look good—they feel alive.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                My passion lies at the intersection of design and development, where I bring 
                creative concepts to life through clean code and thoughtful interactions. Every 
                project is an opportunity to push boundaries and create something memorable.
              </p>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Three.js', 'Figma', 'Node.js', 'GSAP'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 hover:border-purple/50 hover:bg-purple/10 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <AnimatedStat key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
