CREATE TRIGGER food_threshold_trigger
  AFTER INSERT OR UPDATE OF num_of_items
  ON "Project".food
  FOR EACH ROW
  WHEN (((new.num_of_items)::double precision < new.threshold))
  EXECUTE PROCEDURE "Project".food_threshold();
