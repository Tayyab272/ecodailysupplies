


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE TYPE "public"."user_role" AS ENUM (
    'customer',
    'admin'
);


ALTER TYPE "public"."user_role" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_admin"("user_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$;


ALTER FUNCTION "public"."is_admin"("user_id" "uuid") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."is_admin"("user_id" "uuid") IS 'Check if a user has admin role';



CREATE OR REPLACE FUNCTION "public"."make_user_admin"("user_email" "text") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Find user by email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = user_email;
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;
  
  -- Update user role to admin
  UPDATE public.users
  SET role = 'admin'
  WHERE id = target_user_id;
  
  RETURN TRUE;
END;
$$;


ALTER FUNCTION "public"."make_user_admin"("user_email" "text") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."make_user_admin"("user_email" "text") IS 'Make a user an admin by email';



CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."addresses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "type" "text" NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "company" "text",
    "address_line_1" "text" NOT NULL,
    "address_line_2" "text",
    "city" "text" NOT NULL,
    "state" "text" NOT NULL,
    "postal_code" "text" NOT NULL,
    "country" "text" DEFAULT 'US'::"text" NOT NULL,
    "phone" "text",
    "is_default" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "addresses_type_check" CHECK (("type" = ANY (ARRAY['shipping'::"text", 'billing'::"text"])))
);


ALTER TABLE "public"."addresses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."b2b_requests" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "company_name" "text" NOT NULL,
    "contact_name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text" NOT NULL,
    "company_website" "text",
    "vat_number" "text",
    "products_interested" "text" NOT NULL,
    "estimated_quantity" "text" NOT NULL,
    "budget_range" "text",
    "preferred_delivery_date" "date",
    "delivery_address" "jsonb" NOT NULL,
    "additional_notes" "text",
    "is_existing_customer" boolean DEFAULT false,
    "status" "text" DEFAULT 'pending'::"text",
    "admin_notes" "text",
    "reviewed_at" timestamp with time zone,
    "reviewed_by" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "b2b_requests_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'reviewed'::"text", 'quoted'::"text", 'converted'::"text", 'rejected'::"text"])))
);


ALTER TABLE "public"."b2b_requests" OWNER TO "postgres";


COMMENT ON TABLE "public"."b2b_requests" IS 'Stores B2B bulk order custom requests from business customers';



COMMENT ON COLUMN "public"."b2b_requests"."status" IS 'Request status: pending, reviewed, quoted, converted, rejected';



CREATE TABLE IF NOT EXISTS "public"."carts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "session_id" "text",
    "items" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "carts_user_or_session" CHECK (((("user_id" IS NOT NULL) AND ("session_id" IS NULL)) OR (("user_id" IS NULL) AND ("session_id" IS NOT NULL))))
);


ALTER TABLE "public"."carts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."orders" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "email" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text",
    "total_amount" numeric(10,2) NOT NULL,
    "currency" "text" DEFAULT 'USD'::"text",
    "stripe_session_id" "text",
    "stripe_payment_intent_id" "text",
    "shipping_address" "jsonb" NOT NULL,
    "billing_address" "jsonb" NOT NULL,
    "items" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "subtotal" numeric(10,2) DEFAULT 0,
    "discount" numeric(10,2) DEFAULT 0,
    "shipping" numeric(10,2) DEFAULT 0,
    "tax" numeric(10,2) DEFAULT 0,
    "customer_name" "text",
    "customer_phone" "text",
    "tracking_number" "text",
    "shipped_at" timestamp with time zone,
    "delivered_at" timestamp with time zone,
    "cancelled_at" timestamp with time zone,
    "cancellation_reason" "text",
    "refund_amount" numeric(10,2),
    "refund_status" "text" DEFAULT 'none'::"text",
    "payment_method" "text" DEFAULT 'card'::"text",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "shipping_method" "text",
    "shipping_cost" numeric(10,2) DEFAULT 0.00,
    "vat_amount" numeric(10,2) DEFAULT 0.00,
    "vat_rate" numeric(5,4) DEFAULT 0.20,
    CONSTRAINT "orders_refund_status_check" CHECK (("refund_status" = ANY (ARRAY['none'::"text", 'partial'::"text", 'full'::"text"]))),
    CONSTRAINT "orders_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'processing'::"text", 'shipped'::"text", 'delivered'::"text", 'cancelled'::"text"]))),
    CONSTRAINT "orders_user_or_email_required" CHECK ((("user_id" IS NOT NULL) OR (("user_id" IS NULL) AND ("email" IS NOT NULL) AND ("email" <> ''::"text"))))
);


ALTER TABLE "public"."orders" OWNER TO "postgres";


COMMENT ON TABLE "public"."orders" IS 'Stores customer orders with full payment and shipping details';



COMMENT ON COLUMN "public"."orders"."total_amount" IS 'Final total amount charged (subtotal + tax + shipping - discount)';



COMMENT ON COLUMN "public"."orders"."subtotal" IS 'Order subtotal before tax, shipping, and discounts';



COMMENT ON COLUMN "public"."orders"."discount" IS 'Total discount amount applied (from promo codes)';



COMMENT ON COLUMN "public"."orders"."shipping" IS 'Shipping cost';



COMMENT ON COLUMN "public"."orders"."tax" IS 'Tax amount';



COMMENT ON COLUMN "public"."orders"."customer_name" IS 'Customer name from Stripe checkout';



COMMENT ON COLUMN "public"."orders"."customer_phone" IS 'Customer phone number';



COMMENT ON COLUMN "public"."orders"."tracking_number" IS 'Shipping tracking number (populated after fulfillment)';



COMMENT ON COLUMN "public"."orders"."metadata" IS 'Additional order metadata (JSON)';



COMMENT ON COLUMN "public"."orders"."shipping_method" IS 'Selected shipping method (e.g., evri-48, evri-24, dhl-next-day, free-collection)';



COMMENT ON COLUMN "public"."orders"."shipping_cost" IS 'Cost of shipping in GBP';



COMMENT ON COLUMN "public"."orders"."vat_amount" IS 'VAT amount (20% of subtotal + shipping)';



COMMENT ON COLUMN "public"."orders"."vat_rate" IS 'VAT rate applied (default 0.20 for 20%)';



CREATE OR REPLACE VIEW "public"."order_analytics" AS
 SELECT "date"("created_at") AS "order_date",
    "count"(*) AS "total_orders",
    "sum"("total_amount") AS "total_revenue",
    "avg"("total_amount") AS "average_order_value",
    "count"(DISTINCT "user_id") AS "unique_customers",
    "sum"(
        CASE
            WHEN ("status" = 'delivered'::"text") THEN 1
            ELSE 0
        END) AS "delivered_orders",
    "sum"(
        CASE
            WHEN ("status" = 'cancelled'::"text") THEN 1
            ELSE 0
        END) AS "cancelled_orders"
   FROM "public"."orders"
  GROUP BY ("date"("created_at"))
  ORDER BY ("date"("created_at")) DESC;


ALTER VIEW "public"."order_analytics" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."order_items" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "order_id" "uuid" NOT NULL,
    "product_id" "text" NOT NULL,
    "product_name" "text" NOT NULL,
    "product_code" "text" NOT NULL,
    "variant_name" "text",
    "variant_sku" "text",
    "quantity" integer NOT NULL,
    "unit_price" numeric(10,2) NOT NULL,
    "total_price" numeric(10,2) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "order_items_quantity_check" CHECK (("quantity" > 0))
);


ALTER TABLE "public"."order_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."saved_addresses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "company" "text",
    "address_line_1" "text" NOT NULL,
    "address_line_2" "text",
    "city" "text" NOT NULL,
    "state" "text" NOT NULL,
    "postal_code" "text" NOT NULL,
    "country" "text" DEFAULT 'US'::"text" NOT NULL,
    "phone" "text",
    "is_default" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."saved_addresses" OWNER TO "postgres";


COMMENT ON TABLE "public"."saved_addresses" IS 'User saved addresses - RLS disabled, security handled at application layer via user_id filtering';



CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "full_name" "text",
    "avatar_url" "text",
    "phone" "text",
    "company" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "role" "text" DEFAULT 'customer'::"text",
    CONSTRAINT "users_role_check" CHECK (("role" = ANY (ARRAY['customer'::"text", 'admin'::"text"])))
);


ALTER TABLE "public"."users" OWNER TO "postgres";


COMMENT ON COLUMN "public"."users"."role" IS 'User role: customer (default) or admin';



ALTER TABLE ONLY "public"."addresses"
    ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."b2b_requests"
    ADD CONSTRAINT "b2b_requests_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."carts"
    ADD CONSTRAINT "carts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."carts"
    ADD CONSTRAINT "carts_session_id_unique" UNIQUE ("session_id");



COMMENT ON CONSTRAINT "carts_session_id_unique" ON "public"."carts" IS 'Ensures each guest session has only one cart';



ALTER TABLE ONLY "public"."carts"
    ADD CONSTRAINT "carts_user_id_unique" UNIQUE ("user_id");



COMMENT ON CONSTRAINT "carts_user_id_unique" ON "public"."carts" IS 'Ensures each user has only one cart';



ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_stripe_payment_intent_id_key" UNIQUE ("stripe_payment_intent_id");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_stripe_session_id_key" UNIQUE ("stripe_session_id");



ALTER TABLE ONLY "public"."saved_addresses"
    ADD CONSTRAINT "saved_addresses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_addresses_type" ON "public"."addresses" USING "btree" ("type");



CREATE INDEX "idx_addresses_user_id" ON "public"."addresses" USING "btree" ("user_id");



CREATE INDEX "idx_addresses_user_type" ON "public"."addresses" USING "btree" ("user_id", "type");



CREATE INDEX "idx_b2b_requests_created_at" ON "public"."b2b_requests" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_b2b_requests_email" ON "public"."b2b_requests" USING "btree" ("email");



CREATE INDEX "idx_b2b_requests_status" ON "public"."b2b_requests" USING "btree" ("status");



CREATE INDEX "idx_b2b_requests_user_id" ON "public"."b2b_requests" USING "btree" ("user_id");



CREATE INDEX "idx_carts_session_id" ON "public"."carts" USING "btree" ("session_id");



CREATE INDEX "idx_carts_updated_at" ON "public"."carts" USING "btree" ("updated_at");



CREATE INDEX "idx_carts_user_id" ON "public"."carts" USING "btree" ("user_id");



CREATE INDEX "idx_order_items_order_id" ON "public"."order_items" USING "btree" ("order_id");



CREATE INDEX "idx_order_items_product_id" ON "public"."order_items" USING "btree" ("product_id");



CREATE INDEX "idx_orders_created_at" ON "public"."orders" USING "btree" ("created_at");



CREATE INDEX "idx_orders_email" ON "public"."orders" USING "btree" ("email");



CREATE INDEX "idx_orders_shipping_method" ON "public"."orders" USING "btree" ("shipping_method");



CREATE INDEX "idx_orders_status" ON "public"."orders" USING "btree" ("status");



CREATE INDEX "idx_orders_stripe_intent" ON "public"."orders" USING "btree" ("stripe_payment_intent_id");



CREATE INDEX "idx_orders_stripe_payment_intent_id" ON "public"."orders" USING "btree" ("stripe_payment_intent_id");



CREATE INDEX "idx_orders_stripe_session" ON "public"."orders" USING "btree" ("stripe_session_id");



CREATE INDEX "idx_orders_stripe_session_id" ON "public"."orders" USING "btree" ("stripe_session_id");



CREATE INDEX "idx_orders_user_id" ON "public"."orders" USING "btree" ("user_id");



CREATE INDEX "idx_saved_addresses_created_at" ON "public"."saved_addresses" USING "btree" ("created_at");



CREATE INDEX "idx_saved_addresses_default" ON "public"."saved_addresses" USING "btree" ("user_id", "is_default");



CREATE INDEX "idx_saved_addresses_user_default" ON "public"."saved_addresses" USING "btree" ("user_id", "is_default");



CREATE INDEX "idx_saved_addresses_user_id" ON "public"."saved_addresses" USING "btree" ("user_id");



CREATE INDEX "idx_users_created_at" ON "public"."users" USING "btree" ("created_at");



CREATE INDEX "idx_users_email" ON "public"."users" USING "btree" ("email");



CREATE INDEX "idx_users_role" ON "public"."users" USING "btree" ("role");



CREATE OR REPLACE TRIGGER "update_orders_updated_at" BEFORE UPDATE ON "public"."orders" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."addresses"
    ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."b2b_requests"
    ADD CONSTRAINT "b2b_requests_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."b2b_requests"
    ADD CONSTRAINT "b2b_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."carts"
    ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."saved_addresses"
    ADD CONSTRAINT "saved_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Allow order creation for guests and users" ON "public"."orders" FOR INSERT TO "authenticated", "anon" WITH CHECK ((("auth"."uid"() = "user_id") OR (("user_id" IS NULL) AND ("email" IS NOT NULL) AND ("email" <> ''::"text"))));



CREATE POLICY "Allow users to view their orders" ON "public"."orders" FOR SELECT TO "authenticated", "anon" USING ((("auth"."uid"() = "user_id") OR (("user_id" IS NULL) AND ("stripe_session_id" IS NOT NULL))));



CREATE POLICY "Anyone can create B2B requests" ON "public"."b2b_requests" FOR INSERT TO "authenticated", "anon" WITH CHECK (true);



CREATE POLICY "Guest users can manage cart by session_id" ON "public"."carts" TO "anon" USING (("user_id" IS NULL)) WITH CHECK (("user_id" IS NULL));



CREATE POLICY "Service role can insert orders" ON "public"."orders" FOR INSERT TO "service_role" WITH CHECK (true);



CREATE POLICY "Service role can manage all carts" ON "public"."carts" TO "service_role" USING (true) WITH CHECK (true);



CREATE POLICY "Service role can select all orders" ON "public"."orders" FOR SELECT TO "service_role" USING (true);



CREATE POLICY "Service role can update all orders" ON "public"."orders" FOR UPDATE TO "service_role" USING (true) WITH CHECK (true);



CREATE POLICY "System can insert order items" ON "public"."order_items" FOR INSERT WITH CHECK (true);



CREATE POLICY "System can update orders" ON "public"."orders" FOR UPDATE USING (true);



CREATE POLICY "Users can delete own addresses" ON "public"."addresses" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete own carts" ON "public"."carts" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert own addresses" ON "public"."addresses" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert own carts" ON "public"."carts" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert own orders" ON "public"."orders" FOR INSERT WITH CHECK ((("auth"."uid"() = "user_id") OR ("user_id" IS NULL)));



CREATE POLICY "Users can insert own profile" ON "public"."users" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "Users can update own addresses" ON "public"."addresses" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own carts" ON "public"."carts" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own profile" ON "public"."users" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view order items for own orders" ON "public"."order_items" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."orders"
  WHERE (("orders"."id" = "order_items"."order_id") AND ("orders"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can view own B2B requests" ON "public"."b2b_requests" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own addresses" ON "public"."addresses" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own carts" ON "public"."carts" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own orders" ON "public"."orders" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own profile" ON "public"."users" FOR SELECT USING (("auth"."uid"() = "id"));



ALTER TABLE "public"."addresses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."b2b_requests" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."carts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."order_items" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."orders" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."is_admin"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"("user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."make_user_admin"("user_email" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."make_user_admin"("user_email" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."make_user_admin"("user_email" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";



GRANT ALL ON TABLE "public"."addresses" TO "anon";
GRANT ALL ON TABLE "public"."addresses" TO "authenticated";
GRANT ALL ON TABLE "public"."addresses" TO "service_role";



GRANT ALL ON TABLE "public"."b2b_requests" TO "anon";
GRANT ALL ON TABLE "public"."b2b_requests" TO "authenticated";
GRANT ALL ON TABLE "public"."b2b_requests" TO "service_role";



GRANT ALL ON TABLE "public"."carts" TO "anon";
GRANT ALL ON TABLE "public"."carts" TO "authenticated";
GRANT ALL ON TABLE "public"."carts" TO "service_role";



GRANT ALL ON TABLE "public"."orders" TO "anon";
GRANT ALL ON TABLE "public"."orders" TO "authenticated";
GRANT ALL ON TABLE "public"."orders" TO "service_role";



GRANT ALL ON TABLE "public"."order_analytics" TO "anon";
GRANT ALL ON TABLE "public"."order_analytics" TO "authenticated";
GRANT ALL ON TABLE "public"."order_analytics" TO "service_role";



GRANT ALL ON TABLE "public"."order_items" TO "anon";
GRANT ALL ON TABLE "public"."order_items" TO "authenticated";
GRANT ALL ON TABLE "public"."order_items" TO "service_role";



GRANT ALL ON TABLE "public"."saved_addresses" TO "anon";
GRANT ALL ON TABLE "public"."saved_addresses" TO "authenticated";
GRANT ALL ON TABLE "public"."saved_addresses" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";







