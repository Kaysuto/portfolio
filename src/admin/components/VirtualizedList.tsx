import React, { useCallback } from 'react';
import ReactWindow from 'react-window';
import { PortfolioLink } from '../services/linksService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, X, Pencil, Trash, Link as LinkIcon, Eye, EyeSlash, ChartBar, Target } from '@phosphor-icons/react';

interface VirtualizedListProps {
  items: PortfolioLink[];
  height: number;
  itemSize: number;
  onEdit: (link: PortfolioLink) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  avgClicks: number;
  getTypeColor: (type: string) => string;
  getTypeIcon: (type: string) => React.ReactNode;
}

interface ListItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    items: PortfolioLink[];
    onEdit: (link: PortfolioLink) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
    avgClicks: number;
    getTypeColor: (type: string) => string;
    getTypeIcon: (type: string) => React.ReactNode;
  };
}

const ListItem: React.FC<ListItemProps> = ({ index, style, data }) => {
  const {
    items,
    onEdit,
    onDelete,
    onToggleStatus,
    avgClicks,
    getTypeColor,
    getTypeIcon
  } = data;

  const link = items[index];

  if (!link) return null;

  return (
    <div
      style={style}
      className="px-6 py-4 border-b border-border/50 hover:bg-muted/30 transition-colors duration-150"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="font-medium truncate max-w-xs">{link.title}</h3>
            <Badge className={getTypeColor(link.type)}>
              {getTypeIcon(link.type)} {link.type}
            </Badge>
            <Badge variant={link.is_active ? "default" : "secondary"}>
              {link.is_active ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Actif
                </>
              ) : (
                <>
                  <X className="h-3 w-3 mr-1" />
                  Inactif
                </>
              )}
            </Badge>
            {link.click_count > avgClicks * 1.5 && (
              <Badge className="bg-orange-3 text-orange-11 border-orange-6 flex items-center gap-1">
                <Target className="h-3 w-3" />
                Populaire
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
            <span className="truncate max-w-xs">{link.url}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(link.url, '_blank')}
              className="h-6 w-6 p-0 shrink-0 opacity-60 hover:opacity-100"
            >
              <LinkIcon className="h-3 w-3" />
            </Button>
          </p>

          {link.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{link.description}</p>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <p className="flex items-center gap-1">
              <ChartBar className="h-3 w-3" />
              {link.click_count} clics
            </p>
            <p>Créé le {new Date(link.created_at).toLocaleDateString('fr-FR')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4 shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onToggleStatus(link.id)}
            className="h-8 w-8 p-0"
          >
            {link.is_active ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(link)}
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(link.id)}
            className="h-8 w-8 p-0"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  height,
  itemSize,
  onEdit,
  onDelete,
  onToggleStatus,
  avgClicks,
  getTypeColor,
  getTypeIcon,
}) => {
  const itemData = {
    items,
    onEdit,
    onDelete,
    onToggleStatus,
    avgClicks,
    getTypeColor,
    getTypeIcon,
  };

  const ItemRenderer = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => (
      <ListItem index={index} style={style} data={itemData} />
    ),
    [itemData]
  );

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucun lien trouvé.
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <ReactWindow.FixedSizeList
        height={height}
        itemCount={items.length}
        itemSize={itemSize}
        itemData={itemData}
        className="scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
      >
        {ItemRenderer}
      </ReactWindow.FixedSizeList>
    </div>
  );
};