import * as L from 'leaflet';

import { ILayer } from 'krite/lib/types';

import pool from 'krite/lib/servicePool';
import { MapService } from 'krite/lib/services/map';

export class SleepmapLayer implements ILayer {
    title = 'Sleepmap';
    name = 'Sleepmap';
    abstract = 'Sleepmap';
    bounds = new L.LatLngBounds(L.latLng(-180, 90), L.latLng(180, 90));
    preview = 'n.v.t.';

    legend = '';

    leaflet = L.layerGroup([]);

    private startMarker: L.Marker;
    private endMarker: L.Marker;

    private path = L.geoJSON(undefined, {
        style: (feature) => {
            return {
                weight: 6,
            };
        },
    });

    private backend = 'http://localhost:8000/api/route/';

    constructor(readonly icon: L.Icon | L.DivIcon) {
        this.leaflet.addLayer(this.path);
        this.placeMarkers();
    }

    /**
     * Place initial markers
     */
    placeMarkers() {
        const start = this.startMarker = L.marker([52.084, 5.082], {
            draggable: true,
            icon: this.icon,
        });

        const end = this.endMarker = L.marker([52.105, 5.140], {
            draggable: true,
            icon: this.icon,
        });

        this.leaflet.addLayer(start);
        this.leaflet.addLayer(end);

        start.on('dragend', this.renewPath);
        end.on('dragend', this.renewPath);

        this.renewPath();
    }

    renewPath = async () => {
        const route = await this.routeLookup();

        this.path.clearLayers();

        this.path.addData(route.route.geojson);
    }

    async routeLookup() {
        const response = await fetch(this.backend, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                start: (this.startMarker as any).toGeoJSON(),
                end: (this.endMarker as any).toGeoJSON(),
            }),
        });

        if (!response.ok) {
            throw new Error('Repsonse backend not ok');
        }

        return await response.json();
    }
}
