import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import sheet from '../../styles/sheet';
import {SF_OFFICE_COORDINATE, DEFAULT_CENTER_COORDINATE} from '../../utils';

import Page from '../common/Page';
import BaseExamplePropTypes from '../common/BaseExamplePropTypes';
let filePath = {
  "type": "FeatureCollection",
      "features": [
    {
      "type": "Feature",
      "properties": {
        "dbh": 0
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          74.3229617,
          31.4413603
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "dbh": 12
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          74.308334,
          35.920834
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "dbh": 17
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          71.25724,
          29.143644
        ]
      }
    }
  ]
}
class Heatmap extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'blue',
      coordinates: [SF_OFFICE_COORDINATE],
      heatmap: {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "dbh": 2
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                74.3229617,
                31.4413603
              ]
            }
          }
          ]
      },
      busyHours: 0,
    };

  }


  componentDidUpdate(prevProps, prevState) {

    if(prevProps.place !== this.props.place){
      console.log(Object.values(this.props?.place?.geometry?.location), "=========")
      this.setState({...this.state, coordinates: [Object.values(this.props.place.geometry.location).reverse()]})
    }
    if(prevProps.busyHours !== this.props.busyHours){
      this.setState({...this.state, heatmap:{
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "dbh": this.props.busyHours
              },
              "geometry": {
                "type": "Point",
                "coordinates": Object.values(this.props.place.geometry.location).reverse()
              }
            }
          ]
        }, busyHours: this.props.busyHours/100})
    }

  }

  render() {
    return (
      <Page {...this.props}>
        <MapboxGL.MapView style={sheet.matchParent}>
          <MapboxGL.Camera
            zoomLevel={5}
            centerCoordinate={this.state.coordinates[0]}
          />
          {console.log(filePath)}
          <MapboxGL.ShapeSource
            id="places"
            shape={this.state.heatmap}>
            <MapboxGL.HeatmapLayer
              id="places"
              sourceID="places"
              style={{
                heatmapIntensity: this.state.busyHours,
                heatmapWeight: ['get', 'dbh'],
                heatmapColor: [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0,
                  'rgba(33,102,172,0)',
                  0.2,
                  'rgb(103,169,207)',
                  0.4,
                  'rgb(209,229,240)',
                  0.6,
                  'rgb(253,219,199)',
                  0.8,
                  'rgb(239,138,98)',
                  1,
                  'rgb(178,24,43)',
                ],
              }}
            />
          </MapboxGL.ShapeSource>
          <MapboxGL.MarkerView coordinate={this.state.coordinates[0]}>
            {/*<AnnotationContent title={'this is a marker view'} />*/}
          </MapboxGL.MarkerView>
        </MapboxGL.MapView>
      </Page>
    );
  }
}

export default Heatmap;
