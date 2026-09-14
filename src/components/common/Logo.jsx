import React from 'react';
import './Logo.css';

export default function Logo({ variant = 'default', size = 'medium', className = '' }) {
  // variant: 'default' | 'light' | 'dark' | 'footer'
  // size: 'small' | 'medium' | 'large'

  return (
    <div className={`nativera-logo nativera-logo--${variant} nativera-logo--${size} ${className}`}>
      <div className="nativera-logo__icon-wrapper">
        <svg
          className="nativera-logo__icon"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Subtle outer leaf ring */}
          <circle
            cx="22"
            cy="22"
            r="20.5"
            className="nativera-logo__ring"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="90 20"
          />

          {/* Golden Sun & Growth Arc at top */}
          <circle
            cx="22"
            cy="8.5"
            r="2.2"
            className="nativera-logo__sun"
          />

          {/* Left Organic Leaf */}
          <path
            d="M22 35.5C22 35.5 12.5 28.5 12.5 19C12.5 13.5 16.5 9.5 22 9.5C22 15 18.5 23.5 22 35.5Z"
            className="nativera-logo__leaf-left"
          />

          {/* Right Organic Leaf */}
          <path
            d="M22 35.5C22 35.5 31.5 27.5 31 16.5C30.3 8 22.5 7.5 22 7.5C22 14.5 25.5 22.5 22 35.5Z"
            className="nativera-logo__leaf-right"
          />

          {/* Central Stem Line */}
          <path
            d="M22 35.5V17"
            className="nativera-logo__stem"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Root Base Dot */}
          <circle
            cx="22"
            cy="36"
            r="1.5"
            className="nativera-logo__root"
          />
        </svg>
      </div>

      <div className="nativera-logo__text">
        <span className="nativera-logo__title">NATIVERA</span>
        <span className="nativera-logo__subtitle">AGRICULTURAL NURSERY</span>
      </div>
    </div>
  );
}
