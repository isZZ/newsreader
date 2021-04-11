/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import dotenv from 'dotenv';
import axios from 'axios';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {useCreateStore, useProvider} from 'mobx-store-provider';
import {RootStoreModel} from './models/RootStoreModel';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import NewsItemScreen from './screens/NewsItemScreen';
import { NewsItemModel } from './models/NewsItemModel';
import {API_KEY} from 'react-native-dotenv';
import { toJS } from 'mobx';



const App = () => {
 
  const Provider = useProvider(RootStoreModel);
  const appStore = useCreateStore(RootStoreModel, {news: []});
  const isDarkMode = useColorScheme() === 'dark';
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createStackNavigator();

  // appStore.addNewsItem({
  //   id: 1,
  //   author: 'Me',
  //   title: 'M News Item',
  //   url: 'http://news.com',
  //   urlToImage: 'http://news.com',
  //   publishedAt: Date.now(),
  //   content: 'Some article',
  //   description:'Some type of description'
  // });

  useEffect(async () => {
    const result = await axios(
      'https://newsapi.org/v2/top-headlines?country=au&apiKey='+API_KEY,
    );

    if(result.data.status === 'ok'){
      appStore.refreshNewsItems(result.data.articles);
    }

  });

  return (
    <Provider value={appStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NewsItem" component={NewsItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <Route path={`${match.path}/:topicId`} component={Topic} />
        <Route path={`${match.path}/:id`} component={ NewsScreen } />
          </View>
      </SafeAreaView> */}
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
