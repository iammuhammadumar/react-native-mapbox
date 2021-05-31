import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';

import config from './utils/config';

const clientOptions = {accessToken: "sk.eyJ1IjoiaWFtaGFpZGVya2hhbiIsImEiOiJja3A2MWp0d20yZTB5MnVxd2oyMGowY3N3In0.TPONs-Tj8ibfXLnWgfB-cg"};
const directionsClient = MapboxDirectionsFactory(clientOptions);

export {directionsClient};
