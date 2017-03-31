SET search_path = "Project" ;
CREATE OR REPLACE FUNCTION serve_meal_request()
RETURNS trigger AS
$BODY$
DECLARE
	food_item RECORD;
BEGIN
	FOR food_item IN
		SELECT ifor.food_id, ifor.count as food_count, c.count as request_count
		FROM "Project".ingredient_for as ifor, "Project".request_contains as c
		WHERE NEW.order_num=c.order_num AND c.meal_id=ifor.meal_id
	LOOP
		UPDATE "Project".food SET num_of_items = num_of_items-(food_item.food_count*food_item.request_count) WHERE id=food_item.food_id;
	END LOOP;
	RETURN NEW;
END
$BODY$

LANGUAGE plpgsql VOLATILE;
