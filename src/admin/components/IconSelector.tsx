import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MagnifyingGlass, X, CaretLeft, CaretRight } from '@phosphor-icons/react';
import * as PhosphorIcons from '@phosphor-icons/react';

// Liste des icônes Phosphor populaires pour les liens
const POPULAR_LINK_ICONS = [
  'Globe', 'Link', 'LinkSimple', 'ArrowSquareOut', 'House', 'User', 'EnvelopeSimple',
  'Phone', 'MapPin', 'Calendar', 'Clock', 'Heart', 'Star', 'Bookmark',
  'GithubLogo', 'LinkedinLogo', 'TwitterLogo', 'InstagramLogo', 'FacebookLogo',
  'YoutubeLogo', 'TiktokLogo', 'DiscordLogo', 'TelegramLogo', 'WhatsappLogo',
  'GameController', 'Camera', 'Image', 'Play', 'Pause', 'Music',
  'Book', 'Pen', 'PaintBrush', 'Palette', 'Code', 'Terminal',
  'ShoppingCart', 'CreditCard', 'Money', 'Briefcase', 'Building', 'Storefront',
  'Airplane', 'Car', 'Bicycle', 'Train', 'Ship', 'Rocket',
  'Lightning', 'Fire', 'Leaf', 'Sun', 'Moon', 'Cloud',
  'Medal', 'Trophy', 'Flag', 'Target', 'Crosshair', 'Compass'
];

// Extraire toutes les icônes Phosphor disponibles
const getAllPhosphorIcons = (): string[] => {
  return Object.keys(PhosphorIcons).filter(key => {
    // Exclure les variantes avec suffixes et les utilitaires
    return !key.includes('Icon') && 
           key !== 'IconContext' && 
           key !== 'IconWeight' &&
           typeof (PhosphorIcons as any)[key] === 'object';
  }).sort();
};

interface IconSelectorProps {
  value: string;
  onChange: (iconName: string) => void;
  className?: string;
}

export const IconSelector: React.FC<IconSelectorProps> = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showAllIcons, setShowAllIcons] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const ICONS_PER_PAGE = 48; // 8x6 grille

  // Obtenir la liste d'icônes en fonction du mode
  const allIcons = useMemo(() => getAllPhosphorIcons(), []);
  const iconsToShow = showAllIcons ? allIcons : POPULAR_LINK_ICONS;

  // Filtrer les icônes en fonction de la recherche
  const filteredIcons = useMemo(() => {
    return iconsToShow.filter(iconName =>
      iconName.toLowerCase().includes(search.toLowerCase())
    );
  }, [iconsToShow, search]);

  // Pagination - Assurer qu'on a au moins 1 page
  const totalPages = Math.max(1, Math.ceil(filteredIcons.length / ICONS_PER_PAGE));
  const startIndex = (currentPage - 1) * ICONS_PER_PAGE;
  const iconsForCurrentPage = filteredIcons.slice(startIndex, startIndex + ICONS_PER_PAGE);

  // Reset page when changing search or mode
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, showAllIcons]);

  const getIconComponent = (iconName: string) => {
    const IconComponent = (PhosphorIcons as any)[iconName];
    return IconComponent ? <IconComponent size={20} /> : <PhosphorIcons.Globe size={20} />;
  };

  const getCurrentIcon = () => {
    return getIconComponent(value || 'Globe');
  };

  const handleIconSelect = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
    setSearch('');
    setShowAllIcons(false);
    setCurrentPage(1);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearch('');
    setShowAllIcons(false);
    setCurrentPage(1);
  };

  if (!isOpen) {
    return (
      <div className={className}>
        <Label htmlFor="icon-selector">Icône</Label>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full justify-start gap-2 h-10"
        >
          {getCurrentIcon()}
          <span className="flex-1 text-left">{value || 'Choisir une icône'}</span>
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <Label>Icône</Label>
      <div className="border rounded-lg p-4 bg-background">
        {/* Header avec recherche et contrôles */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une icône..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAllIcons(!showAllIcons)}
            className="whitespace-nowrap"
          >
            {showAllIcons ? 'Toutes' : 'Populaires'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClose}
          >
            <X size={16} />
          </Button>
        </div>

        {/* Grille d'icônes avec hauteur adaptative */}
        <div className="grid grid-cols-8 gap-3 border rounded-md p-5 min-h-[320px] justify-items-center">
          {iconsForCurrentPage.map((iconName) => (
            <Button
              key={iconName}
              type="button"
              variant={value === iconName ? "default" : "outline"}
              size="sm"
              onClick={() => handleIconSelect(iconName)}
              className="h-10 w-10 !p-0 !gap-0 flex items-center justify-center shrink-0"
              title={iconName}
            >
              {getIconComponent(iconName)}
            </Button>
          ))}
          {/* Remplir les cases vides pour maintenir la grille */}
          {Array.from({ length: ICONS_PER_PAGE - iconsForCurrentPage.length }, (_, i) => (
            <div key={`empty-${i}`} className="h-10 w-10" />
          ))}
        </div>

        {/* Pagination - Afficher seulement si plus d'une page ou en mode "Toutes" */}
        {(totalPages > 1 || showAllIcons) && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <CaretLeft size={16} className="mr-1" />
              Précédent
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{currentPage} / {totalPages}</span>
              <span className="text-xs">
                ({filteredIcons.length} icônes)
              </span>
            </div>

            <Button
              type="button"
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Suivant
              <CaretRight size={16} className="ml-1" />
            </Button>
          </div>
        )}

        {/* État vide */}
        {filteredIcons.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <PhosphorIcons.MagnifyingGlass size={32} className="mx-auto mb-2 opacity-50" />
            <p>Aucune icône trouvée pour "{search}"</p>
          </div>
        )}

        {/* Sélection actuelle */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sélectionné :</span>
            {getCurrentIcon()}
            <span className="text-sm font-medium">{value || 'Aucune'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
