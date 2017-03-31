CREATE TRIGGER approve_ingredient_order_trigger
  BEFORE UPDATE OF approved
  ON "Project".ingredient_order
  FOR EACH ROW
  WHEN (((old.approved IS FALSE) AND (new.approved IS TRUE)))
  EXECUTE PROCEDURE "Project".approve_ingredient_order();
