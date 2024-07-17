/* global ymaps */
import lozad from 'lozad';

import Component from './component';

import { paths, names } from '@/config';

const { markers: path } = paths;

const title = 'YandexMap';

const defaults = {
    key: null,
    zoom: 10,
    delay: 200,
    offset: [],
    controls: ['zoomControl', 'geolocationControl', 'fullscreenControl'],
    markers: {
        path: `${path}/marker.svg`,
        size: [50, 50],
        offset: [-25, -25],
        render: null,
        click: null,
    },
    clusters: {
        enable: false,
        size: [50, 50],
        render: null,
    },
    events: {
        multiTouch: true,
        scrollZoom: true,
        drag: true,
    },
    lozad: {
        rootMargin: '60px 0px',
    },
};

export default class extends Component {
    constructor(...args) {
        super(title, defaults, ...args);

        this.init();
    }

    init() {
        const { getId, loaded, buildLayout, warning } = this;

        if (!window.maps) {
            window.maps = {};
        }

        super.init((el, options) => {
            const {
                lozad: { rootMargin },
            } = options;

            const id = getId(el);

            if (!id) {
                warning.show('Не задан идентификатор для карты');

                return;
            }

            if (!window.data || !window.data[id]) {
                warning.show('Не заданы объекты для карты');

                return;
            }

            if (!Array.isArray(window.data[id])) {
                warning.show('Неверный тип объектов');

                return;
            }

            if (!window.data[id].length) {
                warning.show('Массив объектов пуст');

                return;
            }

            if (window.maps[id]) {
                return;
            }

            buildLayout(el);

            const observer = lozad(el, {
                rootMargin,
                loaded,
            });

            observer.observe();
        });
    }

    loaded = (el) => {
        const { getOption, waitApi, render } = this;
        const { yandexMapApiReady } = names;

        const apiKey = getOption(el, 'key');
        const apiKeyString = apiKey ? '&amp;apikey=' + apiKey : '';
        const apiURL = `https://api-maps.yandex.ru/2.1/?lang=ru_RU${apiKeyString}`;

        if (!window[yandexMapApiReady]) {
            $.getScript(apiURL, () => waitApi(el));
        } else {
            render(el);
        }
    };

    buildLayout = (el) => {
        const { parseDataSelector, getElements } = this;
        const { $scene, $spinner } = getElements(el, ['scene', 'spinner']);
        const { attr } = parseDataSelector();

        if ($scene.length || $spinner.length) {
            return;
        }

        $(
            `<div class="map__spinner" ${attr}-spinner></div><div class="map__scene" ${attr}-scene></div><div class="map__caption is-hidden" ${attr}-caption></div>`,
        ).appendTo(el);
    };

    getOption = (el, id) => {
        const { parseDataSelector, options } = this;
        const { attr } = parseDataSelector(id);

        const option = $(el).attr(attr) || options[id];

        return option;
    };

    getData = (el) => {
        const { getId } = this;

        const id = getId(el);

        return window.data[id];
    };

    waitApi = (el) => {
        const {
            render,
            options: { delay },
        } = this;
        const { yandexMapApiReady } = names;

        if (ymaps && ymaps.Map) {
            window[yandexMapApiReady] = true;

            render(el);
        } else {
            setTimeout(() => this.waitApi(el), delay);
        }
    };

    getTileContainer = (map) => {
        const {
            layer: {
                tileContainer: { CanvasContainer, DomContainer },
            },
        } = ymaps;

        const layer = map.layers.get(0).get(0);

        for (let k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (layer[k] instanceof CanvasContainer || layer[k] instanceof DomContainer) {
                    return layer[k];
                }
            }
        }

        return null;
    };

    waitForTilesLoad = (map) => {
        const { getTileContainer } = this;

        return new ymaps.vow.Promise((resolve) => {
            const tileContainer = getTileContainer(map);

            let readyAll = true;

            tileContainer.tiles.each((tile) => {
                readyAll = readyAll && tile.isReady();
            });

            if (readyAll) {
                resolve();
            } else {
                tileContainer.events.once('ready', resolve);
            }
        });
    };

    addMarkers = (el, map) => {
        const { getId, getData, options, addClusters } = this;

        const {
            markers: { path: iconImageHref, size: iconImageSize, offset: iconImageOffset, render, click },
        } = options;

        const id = getId(el);
        const data = getData(el);

        const markers = [];

        data.forEach((object) => {
            const { coords } = object;

            let options = {
                iconLayout: 'default#image',
                iconImageHref,
                iconImageSize,
                iconImageOffset,
            };

            if (typeof render === 'function') {
                const layout = render(id, object);

                if (layout) {
                    const iconLayout = ymaps.templateLayoutFactory.createClass(render(id, object));

                    options = {
                        iconLayout,
                        iconPane: 'overlaps',
                    };
                }
            }

            const marker = new ymaps.Placemark(
                coords,
                {},
                {
                    ...options,
                    id,
                    object,
                    map,
                },
            );

            if (typeof click === 'function') {
                marker.events.add('click', click);
            }

            markers.push(marker);
            map.geoObjects.add(marker);
        });

        $(el).data('markers', markers);

        addClusters(el, map);
    };

    addClusters = (el, map) => {
        const { options } = this;
        const {
            clusters: { enable, size, render },
        } = options;

        const markers = $(el).data('markers') || [];

        if (!enable || !markers.length) {
            return;
        }

        const clusterOptions = {
            hasBalloon: false,
            hasHint: false,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false,
        };

        const clusterIconShape = {
            type: 'Rectangle',
        };

        if (Array.isArray(size)) {
            clusterOptions.clusterIconShape = {
                ...clusterIconShape,
                coordinates: [[0, 0], size],
            };
        }

        const clusterer = new ymaps.Clusterer(clusterOptions);

        clusterer.createCluster = function (center, geoObjects) {
            const cluster = ymaps.Clusterer.prototype.createCluster.call(this, center, geoObjects);
            const total = geoObjects.length;

            let layout = '<div class="cluster" data-cluster>{{ total }}</div>';

            if (typeof render === 'function') {
                layout = render(total, geoObjects, center) || layout;
            }

            const clusterIconLayout = ymaps.templateLayoutFactory.createClass(layout);

            cluster.options.set({
                clusterIconLayout,
            });

            if (typeof size === 'function') {
                const coordinates = [[0, 0], size(total, geoObjects, center)];

                cluster.options.set('clusterIconShape', {
                    ...clusterIconShape,
                    coordinates,
                });
            }

            return cluster;
        };

        clusterer.add(markers);
        map.geoObjects.add(clusterer);
    };

    centerize = (el, map) => {
        const { getData } = this;

        const data = getData(el);
        const bounds = map.geoObjects.getBounds();

        if (data.length > 1) {
            map.setBounds(bounds);
        }
    };

    setOffset = (el, map, offset) => {
        if (!Array.isArray(offset) || offset.length !== 2) {
            return;
        }

        const zoom = map.getZoom();
        const center = map.getCenter();
        const pixelCenter = map.getGlobalPixelCenter(center);

        const updatedCenter = [pixelCenter[0] - offset[0], pixelCenter[1] - offset[1]];

        const geoCenter = map.options.get('projection').fromGlobalPixels(updatedCenter, zoom);

        map.setCenter(geoCenter);
    };

    setEvents = (el, map) => {
        const {
            options: { events },
        } = this;

        Object.entries(events).forEach(([key, value]) => {
            const action = value ? 'enable' : 'disable';

            map.behaviors[action](key);
        });
    };

    show = (el, map) => {
        const { getId, getElements } = this;
        const { $root } = getElements(el);

        const id = getId(el);

        $root.addClass('is-ready');

        window.maps[id] = map;
    };

    render = (el) => {
        const {
            getElement,
            getId,
            getData,
            getOption,
            addMarkers,
            show,
            waitForTilesLoad,
            centerize,
            setOffset,
            setEvents,
            options: { controls, offset },
        } = this;

        const { $scene } = getElement(el, 'scene');

        const id = getId(el);
        const data = getData(el);
        const zoom = getOption(el, 'zoom');

        const scene = $scene[0];
        const center = data[0].coords;

        const options = {
            center,
            zoom,
            controls,
        };

        if ($(el).closest('.modal').length) {
            options.controls = options.controls.filter((control) => control !== 'fullscreenControl');
        }

        ymaps.ready(async () => {
            const map = new ymaps.Map(scene, options, {
                zoomControlPosition: { right: '10px', top: '105px' },
            });

            addMarkers(el, map);
            centerize(el, map);
            setOffset(el, map, offset);
            setEvents(el, map);

            await waitForTilesLoad(map);

            show(el, map);

            window.maps[id] = map;
            window.maps[id].setOffset = (offset) => setOffset(el, map, offset);

            map.events.add('destroy', () => delete window.maps[id]);
        });
    };
}
