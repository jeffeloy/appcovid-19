import React, { useEffect, useState } from "react";
import { Container, Header, TextHeader, StatusBar } from "./styles";
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
        <TextHeader>COVID - 19</TextHeader>
        <TextHeader>LOGO</TextHeader>
      </Header>

      <MapView
        onRegionChangeComplete={handleRegionChanged}
        style={{ flex: 1 }}
        initialRegion={region}
      ></MapView>
    </Container>
  );
}

export default Home;
