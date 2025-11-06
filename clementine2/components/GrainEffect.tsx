'use client';

export default function GrainEffect() {
  return (
    <div
      className="grain-animated fixed inset-0 z-[9998] pointer-events-none"
      style={{
        backgroundImage: 'url("/noise.png")',
        backgroundRepeat: 'repeat',
      }}
    />
  );
}

