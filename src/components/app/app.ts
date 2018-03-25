import {Component, Vue} from 'vue-property-decorator';

import leaflet from 'krite/lib/components/map/map.vue';
import pdokSearch from 'krite/lib/components/buefy/pdokSearch/pdokSearch.vue';

@Component({
    components: {
        leaflet,
        pdokSearch,
    },
})
export default class App extends Vue {

}
