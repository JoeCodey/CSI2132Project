CREATE OR REPLACE FUNCTION "Project".food_threshold_trigger()
  RETURNS trigger AS
$BODY$
DECLARE
	order_num INTEGER;
BEGIN
	INSERT INTO "Project".ingredient_order (approved, requester_id) VALUES (false, 43) RETURNING id INTO order_num;
	INSERT INTO "Project".order_contains (order_id, food_id, count) VALUES (order_num, NEW.id, ((NEW.threshold - NEW.num_of_items) + 5));
END
$BODY$

LANGUAGE plpgsql VOLATILE

