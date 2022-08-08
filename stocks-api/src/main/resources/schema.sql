create schema IF NOT EXISTS public;

drop table if exists projects;
create TABLE IF NOT EXISTS public.projects
(
    id       SERIAL NOT NULL PRIMARY KEY,
    ownerId     varchar,
    name varchar,
    type   varchar,
    inputsId varchar,
    createdDate date not null default current_date,
    updatedDate date not null
);
