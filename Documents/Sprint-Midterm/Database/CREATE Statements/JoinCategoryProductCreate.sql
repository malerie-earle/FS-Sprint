
CREATE TABLE IF NOT EXISTS public.join_category_product
(
    "product_ID" integer NOT NULL,
    "category_ID" integer NOT NULL,
    CONSTRAINT "product_category_PK" PRIMARY KEY ("product_ID", "category_ID"),
    CONSTRAINT category_id_fk FOREIGN KEY ("category_ID")
        REFERENCES public.product_category ("category_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.join_category_product
    OWNER to postgres;