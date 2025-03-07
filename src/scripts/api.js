async function createToken(baseUrl) {
  try {
    const tokenResponse = await fetch(`${baseUrl}/v1/tokens`, {
      method: 'POST',
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      throw new Error(`Token reuqest failed with status ${tokenResponse.status}: ${errorText}`)
    }

    const tokenData = await tokenResponse.json()
    return tokenData.token
  } catch (error) {
    console.error('Error fetching token:', error)
    return null
  }
}

async function fetchCoffeeShops(baseUrl, token) {
  let retryCount = 0
  const maxRetries = 3
  const controller = new AbortController()
  const signal = controller.signal

  const timeout = setTimeout(() => {
    controller.abort()
  }, 5000)

  async function makeRequest() {
    try {
      const coffeeShopsResponse = await fetch(`${baseUrl}/v1/coffee_shops?token=${token}`, {
        signal,
      })
      clearTimeout(timeout)
      if (!coffeeShopsResponse.ok) {
        if (coffeeShopsResponse.status === 401) {
          throw new Error(`Authorization error. Please check your token.`)
        } else if (coffeeShopsResponse.status === 406) {
          throw new Error(`Format error. Please check the Accept header.`)
        } else if (coffeeShopsResponse.status === 503 || coffeeShopsResponse.status === 504) {
          if (retryCount < maxRetries) {
            retryCount++
            console.error(`Service unavailable or timeout. Retrying (attempt ${retryCount})...`)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return makeRequest()
          } else {
            throw new Error(`Max retries reached. Service unavailable or timeout.`)
          }
        } else {
          const errorText = await coffeeShopsResponse.text()
          throw new Error(
            `Coffee shops request failed with status ${coffeeShopsResponse.status}: ${errorText}`,
          )
        }
      }

      const shopsData = await coffeeShopsResponse.json()
      return shopsData
    } catch (error) {
      clearTimeout(timeout)
      console.error('Error fetching coffee shops:', error)
      if (error.name === 'AbortError') {
        throw new Error(`Request time out. Please try again later.`)
      }
      throw error
    }
  }
  return makeRequest()
}

export { createToken, fetchCoffeeShops }
