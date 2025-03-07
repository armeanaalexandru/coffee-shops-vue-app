<template>
  <div>
    <div class="container">
      <h1 class="text-center text-lg md:text-4xl">Where to get a good coffee ☕️</h1>
      <div class="grid">
        <div class="col-12 md:col-4">
          <p class="text-sm md:text-md text-center">Filter shops:</p>
          <div class="flex flex-column align-items-center">
            <FloatLabel class="my-3" variant="on">
              <InputText id="label-x-value" v-model="userInputX" />
              <label for="label-x-value">X value</label>
            </FloatLabel>
            <FloatLabel class="my-3" variant="on">
              <InputText id="label-y-value" v-model="userInputY" />
              <label for="label-y-value">Y value</label>
            </FloatLabel>
            <FloatLabel class="my-3" variant="on">
              <InputText id="label-name" v-model="userInputName" />
              <label for="label-name">Name</label>
            </FloatLabel>
          </div>
        </div>
        <div class="col-12 md:col-8">
          <p class="text-sm md:text-md text-center">Coffee Shops near you:</p>
          <div
            class="overflow-y-auto h-20rem my-5 p-3 border-1 border-round-md bg-blue-50 text-sm md:text-md"
          >
            <div v-for="shop in coffeeShops" :key="shop.name">
              <p class="mt-3 mb-2 text-lg font-bold">{{ shop.name }}</p>
              <p class="my-1">
                <b>{{ shop.x }}</b
                >, <b>{{ shop.y }}</b> Distance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { calculateDistance, getNearestShops } from '@/scripts/utils.js'
import { createToken, fetchCoffeeShops } from '@/scripts/api.js'
const userInputX = ref(null)
const userInputY = ref(null)
const userInputName = ref(null)
const coffeeShops = ref()
const userX = parseFloat(0)
const userY = parseFloat(0)

onMounted(async () => {
  try {
    const baseUrl = 'https://api-challenge.agilefreaks.com'
    const token = await createToken(baseUrl)
    if (!token) {
      return
    }

    const shopsData = await fetchCoffeeShops(baseUrl, token)
    if (shopsData && shopsData.length > 0) {
      coffeeShops.value = shopsData
    } else {
      throw new Error('Failed to fetch coffee shops.')
    }
  } catch (error) {
    console.log(error.message)
  }
})
// if (isNaN(userX) || isNaN(userY)) {
//   console.error('Invalid coordinates. Please provide numbers.')
//   return
// }

// const nearestShops = getNearestShops({ x: userX, y: userY })

// if (nearestShops && nearestShops.length > 0) {
//   nearestShops.forEach((shop) => {
//     console.log(`${shop.name}, ${shop.distance}`)
//   })
// } else {
//   console.log('No coffee shops found near you.')
// }
</script>
