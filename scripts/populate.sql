set search_path = 'Project';


/* Populate users with different roles */
insert into db_user (email, role, name) values('edufr076@uottawa.ca', 'admin', 'Eric Dufresne');
insert into db_user (email, role, name) values('tshah071@uottawa.ca', 'admin', 'Tarim Shahab');
insert into db_user (email, role, name) values('jlefe074@uottawa.ca', 'admin', 'Joseph C LeFebvre');
insert into db_user (email, role, name) values('aglav016@uottawa.ca', 'admin', 'Adam Glavine');
insert into db_user (email, role, name) values('example@hotmail.com', 'chef', 'Chef Mcguy');
insert into db_user (email, role, name) values('example2@hotmail.com', 'user', 'User Mcguy');

/* Populate categories with ones specified in requirements */
insert into category (category_name) values ('Grain');
insert into category (category_name) values ('Dairy');
insert into category (category_name) values ('Meat');
insert into category (category_name) values ('Vegetable');
insert into category (category_name) values ('Fruit');
insert into category (category_name) values ('Juice');
insert into category (category_name) values ('Egg');

insert into meal (name, description, cuisine) values ('Cheeseburger', 'A simple hamburger with cheese', 'Pub fare');
insert into meal (name, description, cuisine) values ('Pizza', 'Italian Pepperoni Pizza', 'Italian');

insert into food (name, category_name, price_per_item, num_of_items, threshold) values ('Cheese', 'Dairy', 3.45, 12, 10);
insert into food (name, category_name, price_per_item, num_of_items, threshold) values ('Buns', 'Grain', 6.54, 12, 10);
insert into food (name, category_name, price_per_item, num_of_items, threshold) values ('Lettuce', 'Vegetable', 1.21, 12, 10);
insert into food (name, category_name, price_per_item, num_of_items, threshold) values ('Tomato', 'Fruit', 3.45, 12, 10);
insert into food (name, category_name, price_per_item, num_of_items, threshold) values ('Ground Beef', 'Meat', 4.45, 12, 10);
insert into food (name, category_name, price_per_item, num_of_items, threshold) values ('Pizza Dough', 'Grain', 3.45, 12, 10);
insert into food (name, category_name, price_per_item, num_of_items, threshold) values ('Tomato Sauce', 'Fruit', 3.45, 12, 10);
insert into food (name, category_name, price_per_item, num_of_items, threshold) values ('Pepperoni', 'Meat', 3.45, 12, 10);

insert into ingredient_for (meal_id, food_id) values (1, 1);
insert into ingredient_for (meal_id, food_id) values (1, 2);
insert into ingredient_for (meal_id, food_id) values (1, 3);
insert into ingredient_for (meal_id, food_id) values (1, 4);
insert into ingredient_for (meal_id, food_id) values (1, 5);
insert into ingredient_for (meal_id, food_id) values (2, 1);
insert into ingredient_for (meal_id, food_id) values (2, 6);
insert into ingredient_for (meal_id, food_id) values (2, 7);
insert into ingredient_for (meal_id, food_id) values (2, 8);

insert into meal_request (meal_id, requester_id) values (1, 6);

insert into ingredient_order (approved, requester_id) values (false, 5);

insert into order_contains (order_id, food_id) values (1, 1);
insert into order_contains (order_id, food_id) values (1, 2);





