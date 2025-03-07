import { createToken, fetchCoffeeShops } from '@/scripts/api.js'

function calculateDistance(userPosX, userPosY, shopPosX, shopPosY) {
  const distanceX = shopPosX - userPosX
  const distanceY = shopPosY - userPosY
  return Math.sqrt(distanceX * distanceX + distanceY * distanceY)
}

async function getNearestShops(position) {
  const baseUrl = 'https://api-challenge.agilefreaks.com'

  const token = await createToken(baseUrl)
  if (!token) {
    return
  }

  const shopsData = await fetchCoffeeShops(baseUrl, token)
  if (!shopsData || shopsData.length === 0) {
    return
  }

  return shopsData
    .map((shop) => {
      const distance = calculateDistance(
        position.x,
        position.y,
        parseFloat(shop.x),
        parseFloat(shop.y),
      )
      return { ...shop, distance }
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)
    .map((shop) => ({
      name: shop.name,
      distance: shop.distance.toFixed(4),
    }))
}
export { calculateDistance, getNearestShops }
