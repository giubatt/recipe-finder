const express = require(`express`)
const { validate, Joi } = require(`express-validation`)
const recipeController = require(`../controllers/recipe.controller`)

const router = express.Router()

router
  .route(`/`)
  /**
   * @api {get} recipes/ List Recipes
   * @apiDescription Get a list of recipes
   * @apiVersion 1.0.0
   * @apiName ListRecipes
   * @apiGroup Recipes
   *
   * @apiParam  {String}             [i]          Ingredients, separated by comma
   *
   * @apiSuccess {Object[]} users List of recipes.
   */
  .get(
    validate({
      query: Joi.object({
        i: Joi.string().custom((value, helpers) => {
          const ingredientsArray = value.split(`,`)
          if (ingredientsArray.length > 3) return helpers.error(`any.invalid`)
          return ingredientsArray
        }),
      }),
    }),
    async (req, res, next) => {
      const { query } = req
      const ingredients = query.i.split(`,`)

      const recipes = await recipeController.getRecipes(ingredients)

      res.json({
        keywords: ingredients,
        recipes,
      })
    },
  )

module.exports = router
