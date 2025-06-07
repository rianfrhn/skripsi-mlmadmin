import React from 'react';
export default function SegmentedToggle({ options, selected, onChange }) {
  return (
    <div className="btn-group">
      {options.map(opt => (
        <button
          key={opt.value}
          className={`btn ${selected === opt.value ? 'btn-active' : 'btn-outline'}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}