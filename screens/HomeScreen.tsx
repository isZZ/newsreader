import { useStore } from 'mobx-store-provider';
import { observer } from "mobx-react-lite";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NewsItemModel } from '../models/NewsItemModel';
import {RootStoreModel} from '../models/RootStoreModel';
import { Avatar, Button, Card, Title, Paragraph, Subheading } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';


function HomeScreen(){
  const { news } = useStore(RootStoreModel);
  return (
    <View>
      <ScrollView>
        {news.map(item => (
          <Card key={ item.id }>
            <Card.Cover source={{ uri: item.urlToImage }} />
            <Card.Content>
              <Title>{ item.title }</Title>
              <Subheading>{item.author}</Subheading>
              <Paragraph>{item.description}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

export default observer(HomeScreen);