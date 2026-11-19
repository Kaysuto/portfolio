-- Avis des visiteurs sur le portfolio : une note de 1 à 5, rien d'autre.
-- À exécuter une fois dans l'éditeur SQL du projet Supabase.
--
-- Le navigateur n'utilise que la clé publique (anon) : il peut AJOUTER une
-- note, jamais en lire, modifier ou supprimer une. La moyenne et le nombre
-- d'avis passent par la fonction `resume_avis`, qui ne renvoie que ces deux
-- agrégats.

create table if not exists public.avis (
  id bigint generated always as identity primary key,
  note smallint not null check (note between 1 and 5),
  cree_le timestamptz not null default now()
);

alter table public.avis enable row level security;

-- Seule la colonne `note` est écrite par le visiteur ; l'id et la date sont posés par la base.
revoke all on public.avis from anon, authenticated;
grant insert (note) on public.avis to anon, authenticated;

drop policy if exists "Un visiteur peut laisser une note" on public.avis;
create policy "Un visiteur peut laisser une note"
  on public.avis
  for insert
  to anon, authenticated
  with check (note between 1 and 5);

-- Moyenne arrondie au dixième et nombre d'avis, sans exposer les lignes.
create or replace function public.resume_avis()
returns table (moyenne numeric, total bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select round(avg(a.note)::numeric, 1), count(*) from public.avis a;
$$;

revoke all on function public.resume_avis() from public;
grant execute on function public.resume_avis() to anon, authenticated;
