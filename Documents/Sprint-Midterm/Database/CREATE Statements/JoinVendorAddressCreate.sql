
CREATE TABLE IF NOT EXISTS public.join_vendor_address
(
    "vendor_ID" integer NOT NULL,
    "address_ID" integer NOT NULL,
    CONSTRAINT "vendor_address_PK" PRIMARY KEY ("vendor_ID", "address_ID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.join_vendor_address
    OWNER to postgres;