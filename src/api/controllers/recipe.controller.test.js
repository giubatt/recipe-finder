const recipeController = require(`./recipe.controller`)

jest.mock(`./gif.controller.js`)

describe(`formatRecipes`, () => {
  test(`ingredients are ordered in alphabetical order`, async () => {
    // Arrange
    const recipes = [
      {
        title: `test recipe`,
        ingredients: `test, aaa, ggg, bbb, hhhh`,
        href: `http://example.com/`,
      },
    ]

    // Act
    const result = await recipeController.formatRecipes(recipes)

    // Assert
    expect(result[0]).toEqual(
      expect.objectContaining({
        ingredients: [`aaa`, `bbb`, `ggg`, `hhhh`, `test`],
      }),
    )
  })
})
