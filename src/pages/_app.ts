import type { App } from "vue";
import PrimeVue from "primevue/config";

import Tooltip from 'primevue/tooltip';

import 'primevue/resources/themes/aura-light-green/theme.css'
import ToastService from 'primevue/toastservice';

export default (app: App) => {
  app.use(PrimeVue);
  app.directive('tooltip', Tooltip);
  app.use(ToastService);
};
