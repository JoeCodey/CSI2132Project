SELECT id, name, cuisine, description,
	(SELECT SUM(f.price_per_item * ifor.count)
	FROM "Project".ingredient_for as ifor, "Project".food as f
	WHERE f.id = ifor.food_id AND ifor.meal_id = m.id) as price,

	(SELECT MIN(f.num_of_items / ifor.count)
	FROM "Project".ingredient_for as ifor, "Project".food as f
	WHERE f.id = ifor.food_id AND ifor.meal_id = m.id) as available_meals
FROM "Project".meal as m
WHERE
	(SELECT COUNT(f.id)
	FROM "Project".ingredient_for as ifor, "Project".food as f
	WHERE ifor.meal_id = m.id AND f.id = ifor.food_id AND ifor.count > f.num_of_items) =0;


-- All meal query
SELECT id, name, cuisine, description,
  (SELECT SUM(f.price_per_item * ifor.count) FROM "Project".ingredient_for as ifor, "Project".food as f WHERE f.id = ifor.food_id AND ifor.meal_id = m.id) as price
  FROM "Project".meal as m;

-- Inline
SELECT name, cuisine, description, (SELECT SUM(f.price_per_item * ifor.count) FROM "Project".ingredient_for as ifor, "Project".food as f WHERE f.id = ifor.food_id AND ifor.meal_id = m.id) as price, (SELECT MIN(f.num_of_items / ifor.count) FROM "Project".ingredient_for as ifor, "Project".food as f WHERE f.id = ifor.food_id AND ifor.meal_id = m.id) as available_meals FROM "Project".meal as m WHERE (SELECT COUNT(f.id) FROM "Project".ingredient_for as ifor, "Project".food as f WHERE ifor.meal_id = m.id AND f.id = ifor.food_id AND ifor.count > f.num_of_items) =0;
