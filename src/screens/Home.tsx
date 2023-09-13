import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3194a5',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  flagImage: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '700',
  },
  countryInfo: {
    fontSize: 14,
  },
});

const Home = () => {
  const [countries, setCountries] = useState<CountryStates[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={countries}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image source={{uri: item.flags.png}} style={styles.flagImage} />
            <View style={styles.detailsContainer}>
              <Text style={styles.countryName}>
                Nome: {item.translations.por.official}
              </Text>
              <Text style={styles.countryName}>
                Capital: {item.capital?.[0]}
              </Text>
              <Text style={styles.countryName}>Região: {item.region}</Text>
              <Text style={styles.countryName}>
                Língua: {item.languages[Object.keys(item.languages)[0]]}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
