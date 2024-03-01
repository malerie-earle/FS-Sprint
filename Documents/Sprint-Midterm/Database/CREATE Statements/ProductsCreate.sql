
CREATE TABLE IF NOT EXISTS public.products
(
    "product_ID" integer NOT NULL,
    product_name text COLLATE pg_catalog."default" NOT NULL,
    price numeric(10,2) NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    image text COLLATE pg_catalog."default" NOT NULL,
    "category_ID" integer NOT NULL,
    CONSTRAINT "product_ID" PRIMARY KEY ("product_ID"),
    CONSTRAINT "category_ID" FOREIGN KEY ("category_ID")
        REFERENCES public.product_category ("category_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;

CREATE INDEX IF NOT EXISTS "fki_category_ID"
    ON public.products USING btree
    ("category_ID" ASC NULLS LAST)
    TABLESPACE pg_default;