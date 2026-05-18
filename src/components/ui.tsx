import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  // If custom bg is passed, don't use default bg-white border.
  const hasCustomBg = className.includes('bg-');
  const baseClasses = hasCustomBg ? '' : 'bg-white border border-slate-200 shadow-sm';
  return (
    <div className={`${baseClasses} rounded-3xl p-6 mb-6 ${className}`}>
      {children}
    </div>
  );
}

export function Input({
  label,
  value,
  onChange,
  type = 'text',
  prefix,
  suffix
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-[0.7rem] uppercase font-bold text-slate-500 mb-2 tracking-wider">
        {label}
      </label>
      <div className="relative flex items-center">
        {prefix && <span className="absolute left-4 text-slate-400 font-bold">{prefix}</span>}
        <input
          type={type}
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-bold text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
            prefix ? 'pl-10' : ''
          } ${suffix ? 'pr-10' : ''}`}
        />
        {suffix && <span className="absolute right-4 text-slate-400 font-bold">{suffix}</span>}
      </div>
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="mb-4">
      <label className="block text-[0.7rem] uppercase font-bold text-slate-500 mb-2 tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Stat({
  label,
  value,
  highlight = false,
  subtext
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
  subtext?: string;
}) {
  return (
    <div className="flex flex-col mb-4 last:mb-0">
      <span className={`text-[0.7rem] uppercase font-bold tracking-wider mb-1 ${highlight ? 'text-indigo-200' : 'text-slate-500'}`}>
        {label}
      </span>
      <span className={`leading-none break-all sm:break-normal ${highlight ? 'font-bold text-4xl sm:text-5xl tracking-tight text-white' : 'font-bold text-2xl text-slate-900'}`}>
        {value}
      </span>
      {subtext && <span className={`text-xs mt-1 ${highlight ? 'text-indigo-100' : 'text-slate-400'}`}>{subtext}</span>}
    </div>
  );
}
