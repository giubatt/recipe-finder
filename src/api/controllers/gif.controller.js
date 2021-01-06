const qs = require(`querystring`)
const fetch = require(`node-fetch`)
const { giphy } = require(`../../config/vars`)

exports.getGIF = async (query) => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?${qs.stringify({
      api_key: giphy.apiKey,
      q: query,
      limit: 1,
    })}`,
  )

  const data = await response.json()
  const gifData = data?.data[0]

  return gifData?.images?.original?.url
}
