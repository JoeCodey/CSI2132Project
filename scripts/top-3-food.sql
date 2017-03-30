set search_path = 'Project';
SELECT id, name, category_name,
    (SELECT SUM(count)
    FROM ingredient_for as ifor
    WHERE ifor.food_id = f.id) as frequency
FROM food as f ORDER BY frequency limit 3;
