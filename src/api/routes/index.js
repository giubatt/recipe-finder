const express = require(`express`)
const recipesRoutes = require(`./recipes.route`)

const router = express.Router()

router.use(`/recipes`, recipesRoutes)

module.exports = router
