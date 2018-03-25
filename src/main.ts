import Vue from 'vue';

import Buefy from 'buefy';
import ServicePlugin from 'krite/lib/plugins/servicePlugin';

Vue.use(Buefy);
Vue.use(ServicePlugin);

import './style/style.scss';
import 'leaflet/dist/leaflet.css';

import pool from 'krite/lib/servicePool';
import { MapService } from 'krite/lib/services/map';
import { ProjectWebMercatorService } from 'krite/lib/services/projectWebMercator';
import { PdokLocatieserverService } from 'krite/lib/services/pdokLocatieserver';

const mapOptions: L.MapOptions = {
    center: [52.09, 5.11],
    zoom: 12,
    preferCanvas: true,
};

pool.addServices({
    ProjectService: new ProjectWebMercatorService(),
    PdokLocatieserverService: new PdokLocatieserverService(),
});

const map = pool.addService<MapService>('MapService', new MapService(undefined, mapOptions, {
    checkZoom: true,
    defaultMarker: new L.DivIcon({
        className: 'krite-map-marker',
        html: '<span class="mdi mdi-map-marker mdi-48px has-text-link krite-map-marker"></span>',
        iconAnchor: L.point(24, 54),
    }),
}));

import { OsmLayer } from 'krite/lib/sources/osm/source';

map.addLayer(new OsmLayer());

import App from './components/app/app.vue';

const app = new Vue({
    el: '#app',
    render: (h: any) => h(App),
});
