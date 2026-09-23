create extension if not exists "pgcrypto";

create table business_settings(
    id uuid primary key default gen_random_uuid(),
    business_name text not null,
    tagline text,
    description text,
    whatsapp text not null,
    location text,
    hero_title text,
    hero_subtitle text,
    default_whatsapp_message text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table services(
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text unique not null,
    category text not null check(category in('colchones','salas','sofas','vehiculos','otro')),
    short_description text,
    description text,
    price integer not null default 0 check(price>=0),
    price_type text not null default 'fixed' check(price_type in('fixed','from','quote')),
    includes text[] default '{}',
    image_url text,
    active boolean default true,
    sort_order int default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table gallery_items(
    id uuid primary key default gen_random_uuid(),
    title text not null,
    category text not null check(category in('colchones','salas','sofas','vehiculos','otro')),
    before_image_url text,
    after_image_url text,
    description text,
    active boolean default true,
    sort_order int default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table quotes(
    id uuid primary key default gen_random_uuid(),
    name text,
    phone text,
    service text,
    piece_type text,
    size text,
    neighborhood text,
    comments text,
    created_at timestamptz default now()
);

create index on services(active,sort_order);
create index on gallery_items(active,sort_order);

alter table business_settings enable row level security;
alter table services enable row level security;
alter table gallery_items enable row level security;
alter table quotes enable row level security;

create policy "read settings"
on business_settings
for select
using(true);

create policy "read active services"
on services
for select
using(active or auth.role()='authenticated');

create policy "read active gallery"
on gallery_items
for select
using(active or auth.role()='authenticated');

create policy "admin settings"
on business_settings
for all
to authenticated
using(true)
with check(true);

create policy "admin services"
on services
for all
to authenticated
using(true)
with check(true);

create policy "admin gallery"
on gallery_items
for all
to authenticated
using(true)
with check(true);

create policy "admin quotes"
on quotes
for all
to authenticated
using(true)
with check(true);

insert into storage.buckets(
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
)
values
(
    'gallery',
    'gallery',
    true,
    5242880,
    '{image/jpeg,image/png,image/webp}'
),
(
    'services',
    'services',
    true,
    5242880,
    '{image/jpeg,image/png,image/webp}'
)
on conflict do nothing;

create policy "public read images"
on storage.objects
for select
using(bucket_id in('gallery','services'));

create policy "admin write images"
on storage.objects
for insert
to authenticated
with check(bucket_id in('gallery','services'));

create policy "admin update images"
on storage.objects
for update
to authenticated
using(bucket_id in('gallery','services'));

create policy "admin delete images"
on storage.objects
for delete
to authenticated
using(bucket_id in('gallery','services'));

insert into business_settings(
    business_name,
    tagline,
    description,
    whatsapp,
    location,
    hero_title,
    hero_subtitle,
    default_whatsapp_message
)
values(
    'CHꙨꙨ BA''AK',
    'SOLUCIONES ANCESTRALES DE LIMPIEZA',
    'Lavado profesional de colchones, salas, sofás y tapicería de vehículos a domicilio en Tapachula y alrededores.',
    '529623257800',
    'Tapachula, Chiapas',
    E'LIMPIEZA PROFUNDA\nA DOMICILIO',
    'El cambio se nota al lavarlo.',
    E'Hola, CHꙨꙨ BA''AK. Quiero información sobre sus servicios de limpieza.'
);

insert into services(
    name,
    slug,
    category,
    short_description,
    price,
    price_type,
    includes,
    sort_order
)
values
(
    'Colchón individual',
    'colchon-individual',
    'colchones',
    'Limpieza profunda a domicilio.',
    350,
    'fixed',
    '{Limpieza profunda,Eliminación de suciedad,Tratamiento de malos olores,Servicio a domicilio,Atención profesional}',
    1
),
(
    'Colchón matrimonial',
    'colchon-matrimonial',
    'colchones',
    'Limpieza profunda a domicilio.',
    500,
    'fixed',
    '{Limpieza profunda,Eliminación de suciedad,Tratamiento de malos olores,Servicio a domicilio,Atención profesional}',
    2
),
(
    'Colchón King Size',
    'colchon-king-size',
    'colchones',
    'Limpieza profunda a domicilio.',
    600,
    'fixed',
    '{Limpieza profunda,Eliminación de suciedad,Tratamiento de malos olores,Servicio a domicilio,Atención profesional}',
    3
),
(
    'Love Seat',
    'love-seat',
    'sofas',
    'Lavado de tapicería a domicilio.',
    450,
    'from',
    '{Limpieza profunda,Eliminación de suciedad,Tratamiento de malos olores,Servicio a domicilio,Atención profesional}',
    4
),
(
    'Sofá 3 piezas',
    'sofa-3-piezas',
    'sofas',
    'Lavado de tapicería a domicilio.',
    600,
    'from',
    '{Limpieza profunda,Eliminación de suciedad,Tratamiento de malos olores,Servicio a domicilio,Atención profesional}',
    5
),
(
    'Sala en L',
    'sala-en-l',
    'salas',
    'Lavado de tapicería a domicilio.',
    800,
    'from',
    '{Limpieza profunda,Eliminación de suciedad,Tratamiento de malos olores,Servicio a domicilio,Atención profesional}',
    6
),
(
    'Vestiduras de vehículos',
    'vestiduras-de-vehiculos',
    'vehiculos',
    'Limpieza de tapicería interior.',
    0,
    'quote',
    '{Limpieza profunda,Eliminación de suciedad,Tratamiento de malos olores,Servicio a domicilio,Atención profesional}',
    7
);
