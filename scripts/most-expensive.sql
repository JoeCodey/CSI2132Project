set search_path = 'Project';
SELECT name, cuisine, description,
	(SELECT SUM(f.price_per_item * ifor.count)
	FROM "Project".ingredient_for as ifor, "Project".food as f
	WHERE f.id = ifor.food_id AND ifor.meal_id = m.id) as price

FROM "Project".meal as m order by price desc limit 1;
