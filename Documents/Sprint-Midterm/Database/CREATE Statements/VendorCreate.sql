
CREATE TABLE IF NOT EXISTS public.vendor
(
    "vendor_ID" integer NOT NULL,
    "person_ID" integer NOT NULL,
    vendor_name character varying COLLATE pg_catalog."default" NOT NULL,
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    payment_info character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "vendor_ID_PK" PRIMARY KEY ("vendor_ID"),
    CONSTRAINT "person_ID_FK" FOREIGN KEY ("person_ID")
        REFERENCES public.person ("person_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.vendor
    OWNER to postgres;