import React, { useEffect, useState } from "react";
import { Container, Text, Header, StatusBar } from "./styles";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
function Home() {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    async function loadPosition() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: false,
        });

        const { latitude, longitude } = coords;

        setRegion({
          latitude,
          longitude,
          latitudeDelta: 10.0,
          longitudeDelta: 20.0,
        });
      }
    }
    loadPosition();
  }, [region]);

  function handleRegionChanged(region) {
    setRegion(region);
  }
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#0f7778" />
      <Header>
        <Text>COVID - 19</Text>
        <Text>LOGO</Text>
      </Header>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        style={{ flex: 1 }}
        initialRegion={region}
      >
        <Marker coordinate={{ latitude: -12.563922, longitude: -41.3978822 }}>
          <Callout>
            <Text>Bahia</Text>
          </Callout>
        </Marker>
      </MapView>
    </Container>
  );
}

export default Home;
