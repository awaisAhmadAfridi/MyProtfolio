import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Neon Nexus',
    description: 'A cyberpunk-inspired dashboard with real-time data visualization and immersive UI interactions.',
    image: '/images/project1.jpg',
    tags: ['React', 'D3.js', 'WebGL'],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-purple to-pink',
  },
  {
    id: 2,
    title: 'EcoLife',
    description: 'Sustainability tracking app helping users reduce their carbon footprint through gamification.',
    image: '/images/project2.jpg',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-green-400 to-emerald-600',
  },
  {
    id: 3,
    title: 'AeroSpace',
    description: '3D flight visualization platform with real-time tracking and immersive globe interactions.',
    image: '/images/project3.jpg',
    tags: ['Three.js', 'WebGL', 'TypeScript'],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-blue-400 to-cyan-600',
  },
  {
    id: 4,
    title: 'CryptoVault',
    description: 'Modern cryptocurrency trading interface with advanced charting and portfolio management.',
    image: '/images/project4.jpg',
    tags: ['Vue.js', 'Python', 'WebSocket'],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-amber-400 to-yellow-600',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      gsap.to(card, {
        rotateX: -rotateX,
        rotateY: rotateY,
        translateZ: 50,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Parallax effect on image
      gsap.to(image, {
        x: (x - centerX) / 20,
        y: (y - centerY) / 20,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        translateZ: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(image, {
        x: 0,
        y: 0,
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

  return (
    <div
      ref={cardRef}
      className="group relative flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-[45vw] xl:w-[35vw] opacity-0"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Card glow effect */}
      <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />

      <div className="relative h-full rounded-3xl overflow-hidden glass border border-white/10 group-hover:border-white/20 transition-all duration-500">
        {/* Image container */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <div
            ref={imageRef}
            className="absolute inset-0 scale-110"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

          {/* Project number */}
          <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-sm font-bold">
            0{index + 1}
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 sm:p-8">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-sm sm:text-base mb-6 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href={project.liveUrl}
              className="flex items-center gap-2 text-sm font-medium text-purple hover:text-pink transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('[class*="flex-shrink-0"]');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink/50 to-transparent" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-pink/10 rounded-full blur-3xl" />

      {/* Heading */}
      <div ref={headingRef} className="px-4 sm:px-6 lg:px-8 mb-16 opacity-0">
        <div className="max-w-6xl mx-auto">
          <span className="text-purple text-sm font-medium tracking-wider uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold">
            Selected <span className="text-gradient">Works</span>
          </h2>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div ref={trackRef} className="relative">
        <div
          ref={cardsRef}
          className="flex gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 pb-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div key={project.id} className="snap-center">
              <ProjectCard project={project} index={index} />
            </div>
          ))}

          {/* View all card */}
          <div className="flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-[45vw] xl:w-[35vw] flex items-center justify-center">
            <a
              href="#"
              className="group relative w-full h-full min-h-[400px] rounded-3xl glass border border-white/10 hover:border-purple/50 flex flex-col items-center justify-center transition-all duration-500"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple to-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-2">View All Projects</h3>
              <p className="text-muted-foreground text-center px-8">
                Explore my complete portfolio of creative work
              </p>
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground text-sm">
          <span>Scroll to explore</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Projects;
