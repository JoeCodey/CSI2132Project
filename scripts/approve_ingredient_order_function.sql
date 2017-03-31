CREATE OR REPLACE FUNCTION "Project".approve_ingredient_order()
  RETURNS trigger AS
$BODY$
DECLARE
	order_info RECORD;
BEGIN
	FOR order_info IN
		SELECT c.food_id, c.count
		FROM "Project".order_contains as c
		WHERE NEW.id=c.order_id
	LOOP
		UPDATE "Project".food SET num_of_items = num_of_items+order_info.order_count WHERE id=order_info.food_id;
	END LOOP;
	RETURN NEW;
END
$BODY$

LANGUAGE plpgsql VOLATILE;
