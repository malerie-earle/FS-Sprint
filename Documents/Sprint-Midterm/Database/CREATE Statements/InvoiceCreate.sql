
CREATE TABLE IF NOT EXISTS public.order_invoice
(
    "invoice_ID" integer NOT NULL,
    date date NOT NULL,
    shipping_information text COLLATE pg_catalog."default" NOT NULL,
    "customer_ID" integer NOT NULL,
    "vendor_ID" integer NOT NULL,
    "product_ID" integer NOT NULL,
    CONSTRAINT "order_invoice_PK" PRIMARY KEY ("invoice_ID"),
    CONSTRAINT "customer_ID" FOREIGN KEY ("customer_ID")
        REFERENCES public.customer ("customer_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "product_ID" FOREIGN KEY ("product_ID")
        REFERENCES public.products ("product_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "vendor_ID" FOREIGN KEY ("vendor_ID")
        REFERENCES public.vendor ("vendor_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.order_invoice
    OWNER to postgres;

CREATE INDEX IF NOT EXISTS "fki_customer_ID"
    ON public.order_invoice USING btree
    ("customer_ID" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS "fki_product_ID"
    ON public.order_invoice USING btree
    ("product_ID" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS "fki_vendor_ID"
    ON public.order_invoice USING btree
    ("vendor_ID" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS "fki_vendor_ID_FK"
    ON public.order_invoice USING btree
    ("vendor_ID" ASC NULLS LAST)
    TABLESPACE pg_default;