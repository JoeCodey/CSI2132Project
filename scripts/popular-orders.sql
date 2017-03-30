set search_path = 'Project';
SELECT id, m.name, m.cuisine, description,
    (SELECT SUM(f.price_per_item * ifor.count)
	  FROM "Project".ingredient_for as ifor, "Project".food as f
	  WHERE f.id = ifor.food_id AND ifor.meal_id = m.id) as price,

	  (SELECT SUM(count)
	  FROM "Project".request_contains as rc
	  WHERE m.id = rc.meal_id) as frequency

FROM meal as m ORDER BY frequency LIMIT 5;
