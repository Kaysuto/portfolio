export interface BioLink {
  id: string;
  title: string;
  url: string;
  type: 'github' | 'live' | 'social' | 'bio_link' | 'other';
  description?: string;
  icon?: string;
  is_active: boolean;
  click_count: number;
  created_at: string;
  updated_at: string;
}

export const links: BioLink[] = [
  {
    id: '1',
    title: 'Email',
    url: 'mailto:contact@nohello.fr',
    type: 'bio_link',
    description: 'Me contacter directement',
    is_active: true,
    click_count: 0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Discord',
    url: 'https://discord.gg/yourlink',
    type: 'bio_link',
    description: 'Rejoindre la communauté',
    is_active: true,
    click_count: 0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'GitHub',
    url: 'https://github.com/Kaysuto',
    type: 'bio_link',
    description: 'Mes projets open-source',
    is_active: true,
    click_count: 0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    title: 'Site personnel',
    url: 'https://nohello.fr',
    type: 'bio_link',
    description: 'Mon univers digital',
    is_active: true,
    click_count: 0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];
