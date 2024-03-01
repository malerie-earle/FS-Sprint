
CREATE TABLE IF NOT EXISTS public.join_product_order
(
    "product_ID" integer NOT NULL,
    "invoice_ID" integer NOT NULL,
    CONSTRAINT "product_order_PK" PRIMARY KEY ("product_ID", "invoice_ID"),
    CONSTRAINT invoice_id_fk FOREIGN KEY ("invoice_ID")
        REFERENCES public.order_invoice ("invoice_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.join_product_order
    OWNER to postgres;