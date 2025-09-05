import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className='min-h-screen px-6 py-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12 animate-fadeInUp'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            <span className='text-foreground'>Paramètres &</span>
            <br />
            <span className='text-accent'>Configuration</span>
          </h1>
          <p className='text-xl text-muted-foreground'>
            Gestion et configuration du portfolio
          </p>
        </div>

        <div className='bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6'>
          <h2 className='text-2xl font-bold text-foreground mb-6'>Paramètres</h2>
          <p className='text-muted-foreground'>Section en développement. Bientôt disponible.</p>
        </div>
      </div>
    </div>
  );
};