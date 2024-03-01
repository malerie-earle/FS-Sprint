
CREATE TABLE IF NOT EXISTS public.person
(
    "person_ID" integer NOT NULL,
    person_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    email character varying(30) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(20) COLLATE pg_catalog."default" NOT NULL,
    person_type character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "address_ID" integer NOT NULL,
    CONSTRAINT "person_ID_PK" PRIMARY KEY ("person_ID"),
    CONSTRAINT "address_ID" FOREIGN KEY ("address_ID")
        REFERENCES public.address ("address_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.person
    OWNER to postgres;

CREATE INDEX IF NOT EXISTS "fki_address_ID"
    ON public.person USING btree
    ("address_ID" ASC NULLS LAST)
    TABLESPACE pg_default;