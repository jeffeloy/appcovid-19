import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  TextHeader,
  StatusBar,
  CalloutContent,
  CalloutText,
  ImageMarker,
  ImageHeader,
} from "./styles";

import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

import api from "../../services/api";

import logoImg from "../../assets/logo.png";

import coords from "../../database/states";

function Home() {
  const [region, setRegion] = useState(null);
  const [states, setStates] = useState([]);

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
  }, []);

  function handleRegionChanged(region) {
    setRegion(region);
  }

  async function loadsCasesInformation() {
    const getStates = (await api.get("/report/v1")).data;

    const states = getStates.data;

    const StatesInfor = [];

    // Organizando estados por ordem alfabética
    const States = states.sort((a, b) => {
      return a.state > b.state ? 1 : b.state > a.state ? -1 : 0;
    });
    for (let i = 0; i < States.length; i++) {
      var id = parseInt(i) + 1;
      var { uf, state, cases, deaths, suspects, refuses } = States[i];
      var { latitude, longitude } = coords[i];
      // Convertendo data e horário
      var dateTime = new Date(States[i].datetime);
      var formatDateTime = `${dateTime.getDate()}-${
        parseInt(dateTime.getMonth()) + 1
      }-${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()}`;

      StatesInfor.push({
        uf,
        state,
        cases,
        deaths,
        suspects,
        refuses,
        formatDateTime,
        latitude,
        longitude,
      });
    }
    setStates(StatesInfor);
  }
  loadsCasesInformation();
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#0f7778" />
      <Header>
        <TextHeader>COVID - 19</TextHeader>
        <ImageHeader source={logoImg} />
      </Header>

      <MapView
        onRegionChangeComplete={handleRegionChanged}
        style={{ flex: 1 }}
        initialRegion={region}
      >
        {states.map((state) => {
          return (
            <Marker
              key={state.uf}
              coordinate={{
                latitude: Number(state.latitude),
                longitude: Number(state.longitude),
              }}
            >
              <ImageMarker source={logoImg} />
              <Callout>
                <CalloutContent>
                  <CalloutText>{state.state}</CalloutText>
                  <CalloutText>Casos Confirmados: {state.cases}</CalloutText>
                  <CalloutText>Mortos: {state.deaths}</CalloutText>
                  <CalloutText>
                    Atualizado no dia: {state.formatDateTime}
                  </CalloutText>
                </CalloutContent>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </Container>
  );
}

export default Home;
