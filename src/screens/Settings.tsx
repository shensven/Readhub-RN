import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {List, TouchableRipple} from 'react-native-paper';
import IonPizzaOutline from '../icons/IonPizzaOutline';
import IonTrashOutline from '../icons/IonTrashOutline';
import IonShieldOutline from '../icons/IonShieldOutline';
import IonCodeSlashOutline from '../icons/IonCodeSlashOutline';
import IonBugOutline from '../icons/IonBugOutline';
import IonShapesOutline from '../icons/IonShapesOutline';
import IonChevronForwardOutline from '../icons/IonChevronForwardOutline';
import IonOpenOutline from '../icons/IonOpenOutline';

const Settings: React.FC = () => {
  const data = [
    {
      title: '欢迎',
      leftIcon: <IonPizzaOutline size={23} />,
      rightIcon: <IonChevronForwardOutline size={20} />,
      onPress: () => {},
    },
    {
      title: '重置阅读进度',
      leftIcon: <IonTrashOutline size={23} />,
      rightIcon: <IonChevronForwardOutline size={20} />,
      onPress: () => {},
    },
    {
      title: '隐私政策',
      leftIcon: <IonShieldOutline size={22} />,
      rightIcon: <IonChevronForwardOutline size={20} />,
      onPress: () => {},
    },
    {
      title: '开源库',
      leftIcon: <IonCodeSlashOutline size={22} />,
      rightIcon: <IonChevronForwardOutline size={20} />,
      onPress: () => {},
    },
    {
      title: '反馈',
      leftIcon: <IonBugOutline size={23} />,
      rightIcon: <IonOpenOutline size={16} />,
      description: 'https://github.com/shensven/Readhubn/issues',
      onPress: () => {},
    },
    {
      title: '关于',
      leftIcon: <IonShapesOutline size={22} />,
      rightIcon: <IonChevronForwardOutline size={20} />,
      onPress: () => {},
    },
  ];

  const renderCard = ({item}) => {
    return (
      <TouchableRipple onPress={item.onPress} style={styles.item}>
        <List.Item
          title={item.title}
          description={item.description}
          descriptionStyle={styles.description}
          left={() => <List.Icon icon={() => item.leftIcon} />}
          right={() => <List.Icon icon={() => item.rightIcon} />}
        />
      </TouchableRipple>
    );
  };

  return <FlatList data={data} renderItem={renderCard} keyExtractor={item => item.title} />;
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
  },
  description: {
    fontSize: 10,
  },
});

export default Settings;
