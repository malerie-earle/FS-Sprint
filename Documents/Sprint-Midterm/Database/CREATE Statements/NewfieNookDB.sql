BEGIN;


CREATE TABLE IF NOT EXISTS public.address
(
    "address_ID" integer NOT NULL,
    street_address character varying(30) COLLATE pg_catalog."default" NOT NULL,
    city character varying(25) COLLATE pg_catalog."default" NOT NULL,
    province character varying(25) COLLATE pg_catalog."default" NOT NULL,
    postal_code character varying(8) COLLATE pg_catalog."default" NOT NULL,
    "person_ID" integer,
    CONSTRAINT "address_ID_PK" PRIMARY KEY ("address_ID")
);

CREATE TABLE IF NOT EXISTS public.customer
(
    "customer_ID" integer NOT NULL,
    "person_ID" integer,
    username character varying(15) COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    payment_info character varying COLLATE pg_catalog."default",
    CONSTRAINT "customer_ID_PK" PRIMARY KEY ("customer_ID")
);

CREATE TABLE IF NOT EXISTS public.join_customer_address
(
    "customer_ID" integer NOT NULL,
    "address_ID" integer NOT NULL,
    CONSTRAINT "customer_address_PK" PRIMARY KEY ("customer_ID", "address_ID")
);

CREATE TABLE IF NOT EXISTS public.join_customer_order
(
    "customer_ID" integer NOT NULL,
    "invoice_ID" integer NOT NULL,
    CONSTRAINT "customer_order_PK" PRIMARY KEY ("customer_ID", "invoice_ID")
);

CREATE TABLE IF NOT EXISTS public.join_product_order
(
    "product_ID" integer NOT NULL,
    "invoice_ID" integer NOT NULL,
    CONSTRAINT "product_order_PK" PRIMARY KEY ("product_ID", "invoice_ID")
);

CREATE TABLE IF NOT EXISTS public.join_vendor_address
(
    "vendor_ID" integer NOT NULL,
    "address_ID" integer NOT NULL,
    CONSTRAINT "vendor_address_PK" PRIMARY KEY ("vendor_ID", "address_ID")
);

CREATE TABLE IF NOT EXISTS public.join_vendor_order
(
    "vendor_ID" integer NOT NULL,
    "invoice_ID" integer NOT NULL,
    CONSTRAINT "vendor_order_PK" PRIMARY KEY ("invoice_ID", "vendor_ID")
);

CREATE TABLE IF NOT EXISTS public.join_vendor_products
(
    "vendor_ID" integer NOT NULL,
    "product_ID" integer NOT NULL,
    CONSTRAINT "vendor_product_PK" PRIMARY KEY ("vendor_ID", "product_ID")
);

CREATE TABLE IF NOT EXISTS public.order_invoice
(
    "invoice_ID" integer NOT NULL,
    date date NOT NULL,
    shipping_information text COLLATE pg_catalog."default" NOT NULL,
    "customer_ID" integer NOT NULL,
    "vendor_ID" integer NOT NULL,
    "product_ID" integer NOT NULL,
    CONSTRAINT "order_invoice_PK" PRIMARY KEY ("invoice_ID")
);

CREATE TABLE IF NOT EXISTS public.person
(
    "person_ID" integer NOT NULL,
    person_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    email character varying(30) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(20) COLLATE pg_catalog."default" NOT NULL,
    person_type character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "address_ID" integer NOT NULL,
    CONSTRAINT "person_ID_PK" PRIMARY KEY ("person_ID")
);

CREATE TABLE IF NOT EXISTS public.product_category
(
    "category_ID" integer NOT NULL,
    category_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "category_ID_PK" PRIMARY KEY ("category_ID")
);

CREATE TABLE IF NOT EXISTS public.products
(
    "product_ID" integer NOT NULL,
    product_name character varying COLLATE pg_catalog."default" NOT NULL,
    price "char" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    image text COLLATE pg_catalog."default" NOT NULL,
    "category_ID" integer NOT NULL,
    CONSTRAINT "products_ID_PK" PRIMARY KEY ("product_ID")
);

CREATE TABLE IF NOT EXISTS public.vendor
(
    "vendor_ID" integer NOT NULL,
    "person_ID" integer NOT NULL,
    vendor_name character varying COLLATE pg_catalog."default" NOT NULL,
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    payment_info character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "vendor_ID_PK" PRIMARY KEY ("vendor_ID")
);

ALTER TABLE IF EXISTS public.address
    ADD FOREIGN KEY ("person_ID")
    REFERENCES public.person ("person_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.customer
    ADD FOREIGN KEY ("person_ID")
    REFERENCES public.person ("person_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_customer_address
    ADD FOREIGN KEY ("customer_ID")
    REFERENCES public.customer ("customer_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_customer_address
    ADD FOREIGN KEY ("address_ID")
    REFERENCES public.address ("address_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_customer_order
    ADD FOREIGN KEY ("customer_ID")
    REFERENCES public.customer ("customer_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_customer_order
    ADD FOREIGN KEY ("invoice_ID")
    REFERENCES public.order_invoice ("invoice_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_customer_order
    ADD FOREIGN KEY ("customer_ID")
    REFERENCES public.join_customer_order ("customer_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_customer_order
    ADD FOREIGN KEY ("customer_ID")
    REFERENCES public.join_customer_order ("customer_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_customer_order
    ADD FOREIGN KEY ("customer_ID")
    REFERENCES public.order_invoice ("customer_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_product_order
    ADD FOREIGN KEY ("product_ID")
    REFERENCES public.products ("product_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_product_order
    ADD FOREIGN KEY ("invoice_ID")
    REFERENCES public.order_invoice ("invoice_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_product_order
    ADD FOREIGN KEY ("product_ID")
    REFERENCES public.order_invoice ("product_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_vendor_address
    ADD FOREIGN KEY ("vendor_ID")
    REFERENCES public.vendor ("vendor_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_vendor_address
    ADD FOREIGN KEY ("address_ID")
    REFERENCES public.address ("address_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_vendor_order
    ADD FOREIGN KEY ("vendor_ID")
    REFERENCES public.vendor ("vendor_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_vendor_order
    ADD FOREIGN KEY ("invoice_ID")
    REFERENCES public.order_invoice ("invoice_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_vendor_order
    ADD FOREIGN KEY ("vendor_ID")
    REFERENCES public.join_vendor_order ("vendor_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_vendor_products
    ADD FOREIGN KEY ("vendor_ID")
    REFERENCES public.vendor ("vendor_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.join_vendor_products
    ADD FOREIGN KEY ("product_ID")
    REFERENCES public.products ("product_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.order_invoice
    ADD CONSTRAINT "product_ID" FOREIGN KEY ("product_ID")
    REFERENCES public.products ("product_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX IF NOT EXISTS "fki_product_ID"
    ON public.order_invoice("product_ID");


ALTER TABLE IF EXISTS public.order_invoice
    ADD CONSTRAINT "vendor_ID" FOREIGN KEY ("vendor_ID")
    REFERENCES public.vendor ("vendor_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX IF NOT EXISTS "fki_vendor_ID"
    ON public.order_invoice("vendor_ID");


ALTER TABLE IF EXISTS public.order_invoice
    ADD CONSTRAINT "customer_ID" FOREIGN KEY ("customer_ID")
    REFERENCES public.customer ("customer_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX IF NOT EXISTS "fki_customer_ID"
    ON public.order_invoice("customer_ID");


ALTER TABLE IF EXISTS public.person
    ADD FOREIGN KEY ("address_ID")
    REFERENCES public.address ("address_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.product_category
    ADD FOREIGN KEY ("category_ID")
    REFERENCES public.products ("category_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.products
    ADD FOREIGN KEY ("category_ID")
    REFERENCES public.product_category ("category_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.vendor
    ADD FOREIGN KEY ("person_ID")
    REFERENCES public.person ("person_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;