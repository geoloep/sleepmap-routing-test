import { ServiceManager } from 'krite/lib/services/manager';

declare module 'vue/types/vue' {
    interface Vue {
        $services: ServiceManager;
    }
}