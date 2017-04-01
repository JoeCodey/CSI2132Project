CREATE TRIGGER food_threshold_trigger
  BEFORE INSERT OR UPDATE OF num_of_items
  ON "Project".food
  FOR EACH ROW
  WHEN (NEW.num_of_items < NEW.threshold)
  EXECUTE PROCEDURE "Project".food_threshold();
