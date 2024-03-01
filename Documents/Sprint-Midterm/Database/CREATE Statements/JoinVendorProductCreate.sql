
CREATE TABLE IF NOT EXISTS public.join_vendor_products
(
    "vendor_ID" integer NOT NULL,
    "product_ID" integer NOT NULL,
    CONSTRAINT "vendor_product_PK" PRIMARY KEY ("vendor_ID", "product_ID"),
    CONSTRAINT person_id_fk FOREIGN KEY ("vendor_ID")
        REFERENCES public.person ("person_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.join_vendor_products
    OWNER to postgres;