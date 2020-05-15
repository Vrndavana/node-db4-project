const knex = require("knex");
const knexfile = require("../knexfile.js");
const database = knex(knexfile.development);

function getRecipes() {
    return database("recipes").select();
}

// This function ins searchingrecipes for an id that input
function getList(id) {
    return database("recipes")
    .where( "recipes.id", id)
    .join("recipes-ingrediants", "recipes.id", "recipe-ingrediants.recipe_id")
    .join("ingrediants", "ingrediants.id", "recipe-ingrediants.ingrediants_id")
    .select("ingrediants.ingrediants_name", "ingrediants.ingrediants_value")
}

