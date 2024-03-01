
CREATE TABLE IF NOT EXISTS public.join_vendor_order
(
    "vendor_ID" integer NOT NULL,
    "invoice_ID" integer NOT NULL,
    CONSTRAINT "vendor_order_PK" PRIMARY KEY ("invoice_ID", "vendor_ID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.join_vendor_order
    OWNER to postgres;