import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  TextHeader,
  StatusBar,
  CalloutContent,
  CalloutText,
} from "./styles";

import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { View, Text } from "react-native";
import api from "../../services/api";

function Home() {
  const [region, setRegion] = useState(null);
  const [states, setStates] = useState("");

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

  async function loadsCasesInformation() {
    const response = await api.get(`/brazil/uf/BA`);

    setStates(response.data);
  }
  loadsCasesInformation();
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
      >
        <Marker
          coordinate={{
            latitude: -12.6583856,
            longitude: -43.0575209,
          }}
        >
          <Callout>
            <View style={{ backgroundColor: "#f0f0f5", width: 300 }}>
              <Text style={{ color: "#333333" }}>{states.state}</Text>
              <Text style={{ color: "#333333" }}>
                Casos Confirmados: {states.cases}
              </Text>
              <Text style={{ color: "#333333" }}>Mortos: {states.deaths}</Text>
              <Text style={{ color: "#333333" }}>
                Atualizado no dia: {states.datetime}
              </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </Container>
  );
}

export default Home;
