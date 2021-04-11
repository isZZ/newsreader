import { useStore } from 'mobx-store-provider';
import { observer } from "mobx-react-lite";
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import { NewsItemModel } from '../models/NewsItemModel';
import {RootStoreModel} from '../models/RootStoreModel';
import { Avatar, Button, Card, Title, Paragraph, Subheading, Chip } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


function HomeScreen(){
  const { news } = useStore(RootStoreModel);
  const [sourceIndex, setSourceIndex] = useState(-1);


  const sources: string[] = [];
  
  news.forEach(item => {
    if(item.source.name && sources.indexOf(item.source.name) === -1){
      sources.push(item.source.name);
    }
  });

  const filteredNews = sourceIndex === -1 ? news : news.filter((value) => value?.source?.name === sources[sourceIndex]);

  const renderItem = ({ item }) => {
    return (
      <Card style={ styles.card }>
        {item.urlToImage && <Card.Cover source={{ uri: item.urlToImage }} style={ styles.coverImage } />}
        <Card.Content>
          <Title style={ styles.title}>{ item.title }</Title>
          <Subheading>{item.author}</Subheading>
          <Paragraph>{item.description}</Paragraph>
          <OpenURLButton url={item.url} title={ "READ IT" }><Text>Open Up</Text></OpenURLButton>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView>
      <ScrollView horizontal={ true }>
        <View style={styles.chips}>
        <SourceChip name={ 'All' } selected={ sourceIndex < 0 } onPress={ () => setSourceIndex(-1) } />
        {sources.map((source, i) => <SourceChip name={ source } selected={ sourceIndex === i } onPress={ () => setSourceIndex(i) } />)}
        </View>
      </ScrollView>
      <FlatList
        data={filteredNews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={sourceIndex}
        style={ styles.flatList }
      />


        {/* {news.map((item, i) => (
          
        ))} */}
      </SafeAreaView>
    </View>
  );
}

const SourceChip = ({name, onPress, selected}) => (
  <Chip style={[styles.chip, selected && styles.chipSelected]} mode={'outlined'} onPress={onPress}>{ name }</Chip>
);

const OpenURLButton = ({ url, title }) => {
  const handlePress = useCallback(async () => {

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  }, [url]);

  return(
    <Card.Actions>
      <Button style={ styles.openLinkBtn } onPress={handlePress}>Read</Button>
    </Card.Actions>
  );
};

const styles = StyleSheet.create({
  coverImage:{
    height:300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom:20
  },
  description:{
    marginBottom:20
  },
  card:{
    paddingBottom: 40
  },
  screen: {
    backgroundColor: '#fff'
  },
  chips: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    paddingLeft: 20
  },
  chip: {
    marginRight: 5,
  },
  chipSelected:{
    backgroundColor: '#3ED993',
  },
  flatList: {
    marginBottom: 120
  },
  openLinkBtn:{
    marginLeft: -15
  }
});

export default observer(HomeScreen);