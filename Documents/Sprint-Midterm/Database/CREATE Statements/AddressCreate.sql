
CREATE TABLE IF NOT EXISTS public.address
(
    "address_ID" integer NOT NULL,
    street_address character varying(30) COLLATE pg_catalog."default" NOT NULL,
    city character varying(25) COLLATE pg_catalog."default" NOT NULL,
    province character varying(25) COLLATE pg_catalog."default" NOT NULL,
    postal_code character varying(8) COLLATE pg_catalog."default" NOT NULL,
    "person_ID" integer NOT NULL,
    address_type character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "address_ID_PK" PRIMARY KEY ("address_ID"),
    CONSTRAINT "person_ID_FK" FOREIGN KEY ("person_ID")
        REFERENCES public.person ("person_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.address
    OWNER to postgres;

CREATE INDEX IF NOT EXISTS "fki_person_ID"
    ON public.address USING btree
    ("person_ID" ASC NULLS LAST)
    TABLESPACE pg_default;