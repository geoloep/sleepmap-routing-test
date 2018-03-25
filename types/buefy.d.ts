declare module 'buefy' {
    import { PluginObject } from 'vue/types/plugin';

    const plugin: PluginObject<any>;

    export default plugin;
}

declare module 'buefy/src/components/*' {
    import { ComponentOptions } from 'vue/types/index';

    const component: ComponentOptions<any>;

    export default component;
}