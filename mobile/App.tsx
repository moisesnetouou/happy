import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from './src/images/map-marker.png';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -3.0934418,
          longitude: -59.9912742,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08
        }}
      >
        <Marker 
          icon={mapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8
          }}
          coordinate={{
            latitude: -3.0934418,
            longitude: -59.9912742
          }}
        >
          <Callout tooltip onPress={()=> {}}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>
                Lar do Abrigo
              </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          2 orfanatos encontrados
        </Text>
        
        <TouchableOpacity style={styles.createOrphanageButton} onPress={()=> {}}>
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255,0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 3
  },

  calloutText: {
    color: '#0089A5',
    fontSize: 14
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3
  }, 
  
  footerText: {
    color: '#8fa7b3'
  }, 
  
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
});
