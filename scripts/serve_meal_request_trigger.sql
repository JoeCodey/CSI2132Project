CREATE TRIGGER serve_meal_request_trigger
BEFORE UPDATE OF active ON "Project".meal_request
FOR EACH ROW
WHEN (OLD.active IS TRUE AND NEW.active IS FALSE)
EXECUTE PROCEDURE "Project".serve_meal_request();
