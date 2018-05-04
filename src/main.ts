import Vue from 'vue';

import Buefy from 'buefy';
import ServicePlugin from 'krite/lib/plugins/servicePlugin';

Vue.use(Buefy);
Vue.use(ServicePlugin);

import * as L from 'leaflet';

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
    defaultMarker: new L.DivIcon({
        className: 'krite-map-marker',
        html: '<span class="mdi mdi-map-marker mdi-48px has-text-link krite-map-marker"></span>',
        iconAnchor: L.point(24, 54),
    }),
}));

import { OsmLayer } from 'krite/lib/sources/osm/source';
import { SleepmapLayer } from './sources/sleepmap/layer';

map.addLayer(new OsmLayer());
map.addLayer(new SleepmapLayer(
    new L.DivIcon({
        className: 'krite-map-marker',
        html: '<span class="mdi mdi-map-marker mdi-48px has-text-link krite-map-marker"></span>',
        iconAnchor: L.point(24, 54),
    }), new L.DivIcon({
        className: 'krite-map-marker',
        html: '<span class="mdi mdi-map-marker mdi-48px has-text-danger krite-map-marker"></span>',
        iconAnchor: L.point(24, 54),
    }),
));

import App from './components/app/app.vue';

const app = new Vue({
    el: '#app',
    render: (h: any) => h(App),
});

fetch('/dist/vs.json').then(async (response) => {
    L.geoJSON(await response.json()).addTo(map.map);
});
