
CREATE TABLE IF NOT EXISTS public.join_customer_address
(
    "customer_ID" integer NOT NULL,
    "address_ID" integer NOT NULL,
    CONSTRAINT "customer_address_PK" PRIMARY KEY ("customer_ID", "address_ID"),
    CONSTRAINT "address_ID_FK" FOREIGN KEY ("address_ID")
        REFERENCES public.address ("address_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "person_ID_FK" FOREIGN KEY ("customer_ID")
        REFERENCES public.person ("person_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.join_customer_address
    OWNER to postgres;