"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";

interface NavLink {
  label: string;
  href: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
}

interface Stat {
  value: string;
  label: string;
}

interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface PortfolioPageProps {
  navLinks?: NavLink[];
  resume?: ButtonProps;
  hero?: {
    titleLine1: React.ReactNode;
    titleLine2Gradient: React.ReactNode;
    subtitle: React.ReactNode;
  };
  ctaButtons?: {
    primary?: ButtonProps;
    secondary?: ButtonProps;
  };
  projects?: Project[];
  stats?: Stat[];
  showAnimatedBackground?: boolean;
}

const AuroraBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "0";
    renderer.domElement.style.pointerEvents = "none";
    currentMount.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float iTime; uniform vec2 iResolution;
        #define NUM_OCTAVES 3
        float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
        float noise(vec2 p){ vec2 ip=floor(p);vec2 u=fract(p);u=u*u*(3.0-2.0*u);float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);return res*res; }
        float fbm(vec2 x) { float v=0.0;float a=0.3;vec2 shift=vec2(100);mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));for(int i=0;i<NUM_OCTAVES;++i){v+=a*noise(x);x=rot*x*2.0+shift;a*=0.4;}return v;}
        void main() {
            vec2 p=((gl_FragCoord.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.,-4.,4.,6.);vec4 o=vec4(0.);float f=2.+fbm(p+vec2(iTime*5.,0.))*.5;
            for(float i=0.;i++<35.;){vec2 v=p+cos(i*i+(iTime+p.x*.08)*.025+i*vec2(13.,11.))*3.5;float tailNoise=fbm(v+vec2(iTime*.5,i))*.3*(1.-(i/35.));vec4 auroraColors=vec4(.0+.4*sin(i*.2+iTime*.4),.5+.5*cos(i*.3+iTime*.5),1.,1.);vec4 currentContribution=auroraColors*exp(sin(i*i+iTime*.8))/length(max(v,vec2(v.x*f*.015,v.y*1.5)));float thinnessFactor=smoothstep(0.,1.,i/35.)*.6;o+=currentContribution*(1.+tailNoise*.8)*thinnessFactor;}
            o=tanh(pow(o/100.,vec4(1.6)));gl_FragColor=o*1.5;
        }`,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      material.uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

const defaultData = {
  navLinks: [
    { label: "Research", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "Code", href: "/code" },
    { label: "Members", href: "/members" },
  ],
  resume: { label: "Submit Project", href: "/research" },
  hero: {
    titleLine1: "Núcleo de Engenharia, Robótica e",
    titleLine2Gradient: "Desenvolvimento de Software",
    subtitle: "Inovação tecnológica e pesquisa de ponta na UFC",
  },
  ctaButtons: {
    primary: { label: "Explorar Projetos", href: "/research" },
    secondary: { label: "Publicações", href: "/publications" },
  },
  projects: [
    {
      title: "IA & Machine Learning",
      description: "Pesquisa em redes neurais e algoritmos de aprendizado profundo.",
      tags: ["Python", "TensorFlow", "PyTorch"],
    },
    {
      title: "Visão Computacional",
      description: "Desenvolvimento de sistemas de reconhecimento visual.",
      tags: ["OpenCV", "YOLO", "CUDA"],
    },
    {
      title: "Robótica Autônoma",
      description: "Projetos de robôs autônomos para aplicações industriais.",
      tags: ["ROS", "Arduino", "LIDAR"],
    },
  ],
  stats: [
    { value: "50+", label: "Publicações" },
    { value: "20+", label: "Projetos" },
    { value: "15+", label: "Pesquisadores" },
  ],
};

function renderButton(
  button: ButtonProps | undefined,
  className: string
) {
  if (!button) return null;

  if (button.href) {
    return (
      <a href={button.href} className={className}>
        {button.label}
      </a>
    );
  }

  return (
    <button onClick={button.onClick} className={className}>
      {button.label}
    </button>
  );
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({
  navLinks = defaultData.navLinks,
  resume = defaultData.resume,
  hero = defaultData.hero,
  ctaButtons = defaultData.ctaButtons,
  projects = defaultData.projects,
  stats = defaultData.stats,
  showAnimatedBackground = true,
}) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {showAnimatedBackground && <AuroraBackground />}

      <nav className="relative z-10 w-full px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/brand/Nerds.png"
              alt="NERDS"
              width={100}
              height={28}
              className="h-7 w-auto md:h-8 drop-shadow-[0_0_8px_rgba(0,241,254,0.4)]"
              priority
            />
          </div>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          {renderButton(
            resume,
            "px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950 hover:opacity-90 transition-opacity"
          )}
        </div>
      </nav>

      <main className="relative z-10 w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 md:mb-6 leading-tight">
              {hero.titleLine1}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {hero.titleLine2Gradient}
              </span>
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {hero.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-10 md:mb-16">
            {renderButton(
              ctaButtons.primary,
              "min-w-[160px] px-5 py-2.5 md:px-6 md:py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950 hover:opacity-90 transition-opacity"
            )}
            {renderButton(
              ctaButtons.secondary,
              "min-w-[160px] px-5 py-2.5 md:px-6 md:py-3 text-sm font-medium rounded-lg glass-button text-slate-200 hover:text-white transition-colors"
            )}
          </div>

          <div className="mb-10 md:mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="glass-panel rounded-xl p-4 md:p-5 text-left border border-cyan-500/10"
                >
                  <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 mb-3 md:mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[10px] md:text-xs px-2 py-0.5 md:py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10 lg:gap-12 text-center">
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                <div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-slate-400">
                    {stat.label}
                  </div>
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden sm:block w-px h-8 md:h-10 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export { PortfolioPage };