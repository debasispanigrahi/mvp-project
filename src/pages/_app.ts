import type { App } from "vue";
import PrimeVue from "primevue/config";
import 'primevue/resources/themes/aura-light-green/theme.css'

export default (app: App) => {
  app.use(PrimeVue);
};
