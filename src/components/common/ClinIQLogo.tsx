import React from 'react';

// MedIQ Logo: Medical cross + AI circuit/brain, blue/teal palette
const MedIQLogo: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="MedIQ Logo"
  >
    {/* Blue medical cross */}
    <rect x="20" y="6" width="8" height="36" rx="4" fill="#2563eb" />
    <rect x="6" y="20" width="36" height="8" rx="4" fill="#2563eb" />
    {/* AI circuit/brain (stylized) */}
    <circle cx="24" cy="24" r="10" fill="#38bdf8" stroke="#2563eb" strokeWidth="2.5" />
    <circle cx="24" cy="19" r="1.7" fill="#fff" stroke="#2563eb" strokeWidth="1" />
    <circle cx="29" cy="24" r="1.7" fill="#fff" stroke="#2563eb" strokeWidth="1" />
    <circle cx="24" cy="29" r="1.7" fill="#fff" stroke="#2563eb" strokeWidth="1" />
    <circle cx="19" cy="24" r="1.7" fill="#fff" stroke="#2563eb" strokeWidth="1" />
    <line x1="24" y1="19" x2="29" y2="24" stroke="#2563eb" strokeWidth="1.2" />
    <line x1="29" y1="24" x2="24" y2="29" stroke="#2563eb" strokeWidth="1.2" />
    <line x1="24" y1="29" x2="19" y2="24" stroke="#2563eb" strokeWidth="1.2" />
    <line x1="19" y1="24" x2="24" y2="19" stroke="#2563eb" strokeWidth="1.2" />
  </svg>
);

export default MedIQLogo;
