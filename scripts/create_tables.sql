set search_path = 'Project';


create table db_user(
	id serial not null,
	role char(20) not null,
	name varchar(40) not null,
	email varchar(40) not null unique,
	primary key(id)
);

create table category(
	category_name varchar(20) not null,
	primary key (category_name)
);
create table food(
	id serial not null,
	name varchar(20) not null,
	category_name varchar(20) not null,
	price_per_item float not null,
	num_of_items integer not null default 0,
	threshold float,
	primary key (id),
	foreign key (category_name) references category(category_name) 
	on update cascade on delete restrict
);

create table meal(
	id serial not null,
	name varchar(20) not null,
	description text,
	cuisine varchar(20),
	primary key (id)
);

create table ingredient_for(
	meal_id integer not null,
	food_id integer not null,
	primary key(meal_id, food_id),
	foreign key (meal_id) references meal(id)
	on update cascade on delete cascade,
	foreign key (food_id) references food(id)
	on update cascade on delete restrict
);

create table ingredient_order(
	id serial not null,
	approved_by_id integer,
	approved boolean default false,
	requester_id integer not null,
	primary key(id),
	foreign key (approved_by_id) references db_user(id)
	on update cascade on delete set null,
	foreign key (requester_id) references db_user(id)
	on update cascade on delete cascade
);

create table order_contains(
	order_id integer,
	food_id integer,
	primary key (order_id, food_id),
	foreign key (order_id) references ingredient_order(id)
	on update cascade on delete cascade,
	foreign key (food_id) references food(id)
	on update cascade on delete cascade
);

create table meal_request(
	order_num serial not null,
	meal_id integer not null,
	requester_id integer not null,
	primary key(meal_id, requester_id),
	foreign key(meal_id) references meal(id)
	on update cascade on delete restrict,
	foreign key(requester_id) references db_user(id)
	on update cascade on delete cascade
);
