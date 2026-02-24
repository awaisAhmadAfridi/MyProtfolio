import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'design' | 'backend';
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'JQuery', level: 85, category: 'frontend' },
  { name: 'Bootstrap', level: 80, category: 'frontend' },
  { name: 'Javascript', level: 88, category: 'frontend' },
  { name: 'Tailwind CSS', level: 92, category: 'frontend' },
  // Design
  { name: 'Figma', level: 82, category: 'design' },
  { name: 'SQL', level: 90, category: 'backend' },
  { name: 'MySql', level: 75, category: 'backend' },
  // { name: 'Photoshop', level: 85, category: 'design' },
  // Backend
  { name: '.Net Core', level: 82, category: 'backend' },
  { name: '.Net Core MVC', level: 75, category: 'backend' },
  { name: 'C#', level: 78, category: 'backend' },
  { name: 'PHP', level: 68, category: 'backend' },
  { name: 'Laravel', level: 70, category: 'backend' },
];

const SkillNode = ({ skill, index }: { skill: Skill; index: number }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'from-purple to-purple-light';
      case 'design':
        return 'from-pink to-pink-light';
      case 'backend':
        return 'from-blue-accent to-cyan-400';
      default:
        return 'from-purple to-pink';
    }
  };

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Floating animation with random offset
    const duration = 3 + Math.random() * 2;
    const yOffset = 10 + Math.random() * 10;
    const delay = Math.random() * 2;

    gsap.to(node, {
      y: `+=${yOffset}`,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    });
  }, []);

  return (
    <div
      ref={nodeRef}
      className="group relative"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div
        className={`relative px-5 py-3 rounded-2xl bg-gradient-to-r ${getCategoryColor(
          skill.category
        )} opacity-90 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-110`}
      >
        {/* Glow effect */}
        <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${getCategoryColor(skill.category)} opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300`} />

        <div className="relative z-10">
          <span className="text-white font-medium text-sm sm:text-base">{skill.name}</span>
          {/* Level indicator on hover */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <div className="px-3 py-1 rounded-full bg-dark-light border border-white/10 text-xs text-muted-foreground">
              {skill.level}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Skills cloud implosion animation
      const nodes = cloudRef.current?.querySelectorAll('[class*="group relative"]');
      if (nodes) {
        gsap.fromTo(
          nodes,
          { opacity: 0, scale: 3 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            stagger: {
              each: 0.05,
              from: 'random',
            },
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: cloudRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Categories animation
      gsap.fromTo(
        categoriesRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    { name: 'Frontend', color: 'bg-purple', count: skills.filter((s) => s.category === 'frontend').length },
    { name: 'Design', color: 'bg-pink', count: skills.filter((s) => s.category === 'design').length },
    { name: 'Backend', color: 'bg-blue-accent', count: skills.filter((s) => s.category === 'backend').length },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-accent/50 to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <span className="text-pink text-sm font-medium tracking-wider uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A constellation of technologies I use to bring ideas to life
          </p>
        </div>

        {/* Skills cloud */}
        <div
          ref={cloudRef}
          className="relative flex flex-wrap justify-center gap-4 sm:gap-6 mb-16"
        >
          {skills.map((skill, index) => (
            <SkillNode key={skill.name} skill={skill} index={index} />
          ))}

          {/* Connecting lines decoration */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
            style={{ zIndex: -1 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6B46C1" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Categories */}
        <div
          ref={categoriesRef}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 opacity-0"
        >
          {categories.map((category) => (
            <div key={category.name} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${category.color}`} />
              <span className="text-muted-foreground">
                {category.name}{' '}
                <span className="text-foreground font-medium">({category.count})</span>
              </span>
            </div>
          ))}
        </div>

        {/* Proficiency bars */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['frontend', 'design', 'backend'].map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat);
            const avgLevel = Math.round(
              catSkills.reduce((acc, s) => acc + s.level, 0) / catSkills.length
            );

            return (
              <div key={cat} className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-semibold capitalize">{cat}</h3>
                  <span className="text-2xl font-bold text-gradient">{avgLevel}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple to-pink transition-all duration-1000"
                    style={{ width: `${avgLevel}%` }}
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {catSkills.slice(0, 4).map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
