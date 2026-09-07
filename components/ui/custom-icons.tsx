import * as React from 'react';

export function MissionSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <img 
      src="https://cdn-icons-png.flaticon.com/512/3721/3721184.png" 
      alt="Mission Target"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      className={props.className}
    />
  );
}

export function VisionSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div 
      className={`bg-current ${props.className || ''}`}
      style={{ 
        width: '100%', 
        height: '100%', 
        maskImage: `url('https://cdn-icons-png.flaticon.com/512/11377/11377754.png')`,
        WebkitMaskImage: `url('https://cdn-icons-png.flaticon.com/512/11377/11377754.png')`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center'
      }}
    />
  );
}

export function TeamSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" fill="currentColor" fillOpacity="0.2" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function ExpertiseSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="7" fill="currentColor" fillOpacity="0.2" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      <circle cx="12" cy="8" r="3" />
    </svg>
  );
}

export function ProjectSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="currentColor" fillOpacity="0.1" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="17" x2="12" y2="17" />
      <path d="M4 3h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="currentColor" fillOpacity="0.2" stroke="none" />
    </svg>
  );
}

export function InnovationSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <circle cx="12" cy="8" r="2" fill="currentColor" />
    </svg>
  );
}
