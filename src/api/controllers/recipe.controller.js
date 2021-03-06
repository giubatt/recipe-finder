const qs = require(`querystring`)
const fetch = require(`node-fetch`)
const gifController = require(`./gif.controller`)

exports.getRecipes = async (ingredients) => {
  const response = await fetch(
    `http://www.recipepuppy.com/api/?${qs.stringify({
      i: ingredients.join(`,`),
    })}`,
  )

  const data = await response.json()
  const recipes = data.results

  return exports.formatRecipes(recipes)
}

exports.formatRecipes = (recipes) => {
  const recipePromises = recipes.map(async (recipe) => ({
    title: recipe.title,
    ingredients: recipe.ingredients.split(`, `).sort(),
    link: recipe.href,
    gif: await gifController.getGIF(recipe.title),
  }))

  return Promise.all(recipePromises)
}
