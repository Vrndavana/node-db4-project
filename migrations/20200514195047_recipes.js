
exports.up = function(knex) {
  return knex.schema
  .createTable( "recipes", function(recipes){
      recipes.increments();// <- this will make a default id
      recipes.string("recipes_name").notNullable();

  })
  .createTable( "ingrediants", (ingrediants) => {
      ingrediants.increments(); // <- this will make a default id
      ingrediants.string("ingrediants_name").notNullable();
      ingrediants.float("ingrediant_value").notNullable();
  })
  .createTable( "recipe-ingrediants", (ri) => {
    ri.primary(["recipe_id", "ingrediants_id"]) // Primary key is a combo of these 2
    ri.integer("recipe_id")
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    ri.integer("ingrediants_id")
    .references("id")
    .inTable("ingrediants")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
  })
  .createTable("steps", (steps) => {
      steps.increments()
      steps.string("steps_name").notNullable()
      steps.integer("recipe_id").notNullable()
      .references("id")
      .inTable("recipe")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

  })
};

exports.down = function(knex) {
  return knex.schema 
  .dropTableIfExists("steps")
  .dropTableIfExists("recipe-ingrediants")
  .dropTableIfExists("ingrediants")
  .dropTableIfExists("recipes")
};
