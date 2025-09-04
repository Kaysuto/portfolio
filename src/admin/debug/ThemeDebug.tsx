import React from 'react';

// Composant de débogage pour tester les styles DaisyUI
const ThemeDebug: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-primary">Test Thème DaisyUI</h2>
      
      {/* Test des couleurs de base */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-base-100 p-4 rounded-lg border">
          <p className="text-base-content">Base 100 - {document.documentElement.getAttribute('data-theme')}</p>
        </div>
        <div className="bg-base-200 p-4 rounded-lg">
          <p className="text-base-content">Base 200</p>
        </div>
        <div className="bg-base-300 p-4 rounded-lg">
          <p className="text-base-content">Base 300</p>
        </div>
        <div className="bg-primary p-4 rounded-lg">
          <p className="text-primary-content">Primary</p>
        </div>
      </div>

      {/* Test des composants DaisyUI */}
      <div className="space-y-2">
        <button className="btn btn-primary">Bouton Primary</button>
        <button className="btn btn-secondary">Bouton Secondary</button>
        <button className="btn btn-accent">Bouton Accent</button>
      </div>

      {/* Test des cartes */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title text-primary">Test Card</h3>
          <p className="text-base-content">Cette carte utilise les styles DaisyUI</p>
        </div>
      </div>

      {/* Test du badge */}
      <div className="flex gap-2">
        <div className="badge badge-primary">Primary</div>
        <div className="badge badge-secondary">Secondary</div>
        <div className="badge badge-accent">Accent</div>
      </div>

      {/* Informations de débogage */}
      <div className="bg-base-200 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Informations de débogage :</h4>
        <p>Data-theme du document : {document.documentElement.getAttribute('data-theme') || 'Non défini'}</p>
        <p>Data-theme du body : {document.body.getAttribute('data-theme') || 'Non défini'}</p>
        <p>Classes CSS calculées :</p>
        <pre className="text-xs bg-base-300 p-2 rounded mt-2">
          {JSON.stringify(getComputedStyle(document.documentElement).getPropertyValue('--p'), null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ThemeDebug;
