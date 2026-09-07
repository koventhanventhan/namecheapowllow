const fs = require('fs');
const path = 'app/globals.css';

// Read as buffer
const buf = fs.readFileSync(path);

// The clean part ends at "background-size: 20px 20px;\n}\n"
// Let's find this string in the buffer.
const searchStr = 'background-size: 20px 20px;\r\n}\r\n';
const searchStr2 = 'background-size: 20px 20px;\n}\n';

let cleanText = buf.toString('utf8');
let cutIdx = cleanText.indexOf(searchStr);
if (cutIdx === -1) {
    cutIdx = cleanText.indexOf(searchStr2);
    if (cutIdx > -1) cutIdx += searchStr2.length;
} else {
    cutIdx += searchStr.length;
}

if (cutIdx > -1) {
    let goodPart = cleanText.substring(0, cutIdx);
    
    // Append the correct CSS
    goodPart += `
@layer utilities {
  .fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }

  .shimmer-text {
    background: linear-gradient(
      to right,
      hsl(var(--foreground)) 20%,
      hsl(var(--primary)) 50%,
      hsl(var(--foreground)) 80%
    );
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  .nav-link-animated {
    position: relative;
    display: inline-block;
  }
  .nav-link-animated::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: hsl(var(--primary));
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
  }
  .nav-link-animated:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  to {
    background-position: 200% center;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .fade-in-up {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
  .shimmer-text {
    background: none !important;
    color: hsl(var(--primary)) !important;
    -webkit-text-fill-color: initial !important;
    animation: none !important;
  }
}
`;
    fs.writeFileSync(path, goodPart, 'utf8');
    console.log('Fixed globals.css successfully.');
} else {
    console.log('Could not find the cut index.');
}
