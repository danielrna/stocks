create schema IF NOT EXISTS public;

drop table if exists projects;
create TABLE IF NOT EXISTS public.projects
(
    id       SERIAL NOT NULL PRIMARY KEY,
    ownerId     varchar,
    name varchar,
    type   varchar,
    inputsId varchar,
    createdDate timestamp not null default current_date,
    updatedDate timestamp not null
);

create TABLE IF NOT EXISTS public.projectinputs
(
    id       SERIAL NOT NULL PRIMARY KEY,
    nbChambre smallint ,
    prixChambre smallint ,
    prix bigint ,
    travaux bigint ,
    apport bigint ,
    tauxCredit numeric ,
    dureeCredit smallint ,
    meubles bigint ,
    copro bigint ,
    impots bigint ,
    tf bigint ,
    pno bigint ,
    autre bigint ,
    cfe bigint ,
    entretien bigint ,
    chasse bigint ,
    vacance smallint ,

    updatedDate timestamp not null

);
