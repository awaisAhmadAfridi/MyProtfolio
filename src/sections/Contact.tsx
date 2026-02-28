import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

      // Form inputs stagger animation
      const inputs = formRef.current?.querySelectorAll('.form-field');
      if (inputs) {
        gsap.fromTo(
          inputs,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Info section animation
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic input effect
  useEffect(() => {
    const inputs = formRef.current?.querySelectorAll('.magnetic-input');
    if (!inputs) return;

    inputs.forEach((input) => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (input as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;

        gsap.to(input, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(input, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      };

      input.addEventListener('mousemove', handleMouseMove);
      input.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('mousemove', () => {});
        input.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.sendForm(
      'service_wgg03ia',
      'template_49rhj6m',
      formRef.current!,
      'qLkuOAn0Fq40qx6gU'
    );

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      formRef.current?.reset();
    }, 3000);
  } catch (error) {
    console.error('Failed to send email:', error);
    alert('Failed to send message. Please try again.');
    setIsSubmitting(false);
  }
};

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'awaisafridi7408@gmail.com' },
    { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+92 3239329755' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: 'Peshawar KPK, Pakistan' },
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', url: 'https://github.com/awaisAhmadAfridi' },
    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/awais-ahmad-afridi' },
    { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', url: '#' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <span className="text-blue-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Get in Touch
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Let's <span className="text-gradient">Create Together</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's talk and bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="form-field opacity-0">
              <label className="block text-sm font-medium mb-2">Name</label>
              <div className="magnetic-input">
                <Input
                  type="text"
                  placeholder="Your name"
                  required
                  name="user_name" 
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border-white/10 focus:border-purple focus:ring-purple/20 transition-all duration-300"
                />
              </div>
            </div>

            <div className="form-field opacity-0">
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="magnetic-input">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  required
                  name="user_email"
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border-white/10 focus:border-purple focus:ring-purple/20 transition-all duration-300"
                />
              </div>
            </div>

            <div className="form-field opacity-0">
              <label className="block text-sm font-medium mb-2">Message</label>
              <div className="magnetic-input">
                <Textarea
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  name="message"
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border-white/10 focus:border-purple focus:ring-purple/20 transition-all duration-300 resize-none"
                />
              </div>
            </div>

            <div className="form-field opacity-0">
              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`group relative w-full py-6 text-lg font-medium overflow-hidden transition-all duration-500 ${
                  isSubmitted
                    ? 'bg-green-500 hover:bg-green-500'
                    : 'bg-gradient-to-r from-purple to-pink hover:from-purple-light hover:to-pink-light'
                }`}
              >
                {/* Liquid fill effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-pink to-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </div>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8 opacity-0">
            {/* Info cards */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="group flex items-center gap-4 p-4 rounded-2xl glass hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple/20 flex items-center justify-center text-purple group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium group-hover:text-gradient transition-all">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <h3 className="font-heading text-lg font-semibold mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    className="group w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-purple/20 transition-all duration-300"
                    aria-label={link.label}
                    target="_blank"
                  >
                    <span className="text-muted-foreground group-hover:text-purple transition-colors">
                      {link.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />
              </div>
              <div>
                <div className="font-medium">Available for Work</div>
                <div className="text-sm text-muted-foreground">Open to new projects</div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
