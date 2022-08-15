create schema IF NOT EXISTS public;

drop table if exists projects;
drop table if exists projectinputs;
drop table if exists incomes;
drop table if exists loans;
drop table if exists houses;
create TABLE IF NOT EXISTS public.projects
(
    id       SERIAL NOT NULL PRIMARY KEY,
    userId     varchar,
    name varchar,
    type   varchar,
    inputsId bigint,
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
    loanRate numeric ,
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
    projectId bigint,

    updatedDate timestamp not null

);
create TABLE IF NOT EXISTS public.incomes
(
    id       SERIAL NOT NULL PRIMARY KEY,
    userId     varchar,
    name varchar,
    type   varchar,
    value  bigint ,
    projectId bigint,
    createdDate timestamp not null default current_date,
    updatedDate timestamp not null
);

create TABLE IF NOT EXISTS public.loans
(
    id       SERIAL NOT NULL PRIMARY KEY,
    userId     varchar,
    name varchar,
    type   varchar,
    value  bigint ,
    projectId bigint,
    createdDate timestamp not null default current_date,
    updatedDate timestamp not null
);
create TABLE IF NOT EXISTS public.houses
(
    id       SERIAL NOT NULL PRIMARY KEY,
    userId     varchar,
    name varchar,
    type   varchar,
    acquisitionPrice  bigint ,
    acquisitionDate  timestamp not null ,
    city  varchar ,
    projectId bigint,
    createdDate timestamp not null default current_date,
    updatedDate timestamp not null
);
