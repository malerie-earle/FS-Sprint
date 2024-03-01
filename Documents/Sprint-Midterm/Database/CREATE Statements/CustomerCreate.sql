CREATE TABLE IF NOT EXISTS public.customer
(
    "customer_ID" integer NOT NULL,
    "person_ID" integer NOT NULL,
    username character varying(15) COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    payment_info character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "customer_ID_PK" PRIMARY KEY ("customer_ID"),
    CONSTRAINT "person_ID_FK" FOREIGN KEY ("person_ID")
        REFERENCES public.person ("person_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.customer
    OWNER to postgres;

CREATE INDEX IF NOT EXISTS "fki_person_ID_FK"
    ON public.customer USING btree
    ("person_ID" ASC NULLS LAST)
    TABLESPACE pg_default;