import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import FloatLabel from 'primevue/floatlabel'

export default {
  install: (app) => {
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    })
    app.component('Button', Button)
    app.component('InputText', InputText)
    app.component('InputNumber', InputNumber)
    app.component('FloatLabel', FloatLabel)
  },
}
