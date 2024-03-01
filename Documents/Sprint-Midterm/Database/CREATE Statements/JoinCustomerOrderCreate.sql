
CREATE TABLE IF NOT EXISTS public.join_customer_order
(
    "customer_ID" integer NOT NULL,
    "invoice_ID" integer NOT NULL,
    CONSTRAINT "customer_order_PK" PRIMARY KEY ("customer_ID", "invoice_ID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.join_customer_order
    OWNER to postgres;