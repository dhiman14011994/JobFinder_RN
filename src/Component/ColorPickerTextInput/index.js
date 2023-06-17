import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { downArrow } from '../../Resources/assets';
import CustomButton from '../../Component/CustomButton';
import Strings from '../../Resources/Strings';
import Colors from '../../Resources/Colors';
import { style } from './styles';

const ColorPickerTextInput = ({ onSelectedColor }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    name: 'Black',
    color: Colors.Black,
  });

  return (
    <View>
      <Text style={style.backgroundText}>Background Color</Text>
      <TouchableOpacity
        onPress={() => setShowColorPicker(true)}
        style={style.colorButton}
      >
        <Text style={style.colorText}>{selectedColor.name}</Text>
        <View style={style.mainContainer}>
          <View
            style={[
              style.subContainer,
              {
                backgroundColor: selectedColor.color,
              },
            ]}
          />
          <Image
            resizeMode="contain"
            style={style.arrowImage}
            source={downArrow}
          />
        </View>
      </TouchableOpacity>

      <Modal
        animationType={'fade'}
        transparent={false}
        visible={showColorPicker}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        {/*All views of Modal*/}
        <SafeAreaView style={{ flex: 1 }}>
          <View style={style.modalContainer}>
            <ColoList
              onSelectedColor={(color) => setSelectedColor(color)}
              selectedColor={selectedColor}
            />
            <CustomButton
              width={'100%'}
              height={'55px'}
              backgroundColor={Colors.Blueberry}
              marginTop={'22px'}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.White}
              onPress={() => {
                onSelectedColor(selectedColor);
                setShowColorPicker(false);
              }}
              text={Strings.CHOOSE_COLOR}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default ColorPickerTextInput;

const ColoList = ({ onSelectedColor, selectedColor }) => {
  const colors = {
    black: '#000000',
    blue: '#0000FF',
    blueviolet: '#8A2BE2',
    brown: '#A52A2A',
    burlywood: '#DEB887',
    cadetblue: '#5F9EA0',
    chartreuse: '#7FFF00',
    chocolate: '#D2691E',
    coral: '#FF7F50',
    cornflowerblue: '#6495ED',
    crimson: '#DC143C',
    darkblue: '#00008B',
    darkcyan: '#008B8B',
    darkgoldenrod: '#B8860B',
    darkgray: '#A9A9A9',
    darkgrey: '#A9A9A9',
    darkgreen: '#006400',
    darkkhaki: '#BDB76B',
    darkmagenta: '#8B008B',
    darkolivegreen: '#556B2F',
    darkorange: '#FF8C00',
    darkorchid: '#9932CC',
    darkred: '#8B0000',
    darksalmon: '#E9967A',
    darkseagreen: '#8FBC8F',
    darkslateblue: '#483D8B',
    darkslategray: '#2F4F4F',
    darkslategrey: '#2F4F4F',
    darkturquoise: '#00CED1',
    darkviolet: '#9400D3',
    deeppink: '#FF1493',
    deepskyblue: '#00BFFF',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1E90FF',
    firebrick: '#B22222',
    forestgreen: '#228B22',
    fuchsia: '#FF00FF',
    gold: '#FFD700',
    goldenrod: '#DAA520',
    gray: '#808080',
    grey: '#808080',
    green: '#008000',
    greenyellow: '#ADFF2F',
    hotpink: '#FF69B4',
    indianred: '#CD5C5C',
    indigo: '#4B0082',
    khaki: '#F0E68C',
    lime: '#00FF00',
    limegreen: '#32CD32',
    magenta: '#FF00FF',
    maroon: '#800000',
    mediumaquamarine: '#66CDAA',
    mediumblue: '#0000CD',
    mediumorchid: '#BA55D3',
    mediumpurple: '#9370DB',
    mediumseagreen: '#3CB371',
    mediumslateblue: '#7B68EE',
    mediumvioletred: '#C71585',
    midnightblue: '#191970',
    navy: '#000080',
    olive: '#808000',
    olivedrab: '#6B8E23',
    orange: '#FFA500',
    orangered: '#FF4500',
    orchid: '#DA70D6',
    palegreen: '#98FB98',
    palevioletred: '#DB7093',
    peru: '#CD853F',
    plum: '#DDA0DD',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#FF0000',
    rosybrown: '#BC8F8F',
    royalblue: '#4169E1',
    saddlebrown: '#8B4513',
    salmon: '#FA8072',
    sandybrown: '#F4A460',
    seagreen: '#2E8B57',
    sienna: '#A0522D',
    skyblue: '#87CEEB',
    slateblue: '#6A5ACD',
    slategray: '#708090',
    slategrey: '#708090',
    springgreen: '#00FF7F',
    steelblue: '#4682B4',
    tan: '#D2B48C',
    teal: '#008080',
    tomato: '#FF6347',
    turquoise: '#40E0D0',
    violet: '#EE82EE',
    yellow: '#FFFF00',
    yellowgreen: '#9ACD32',
  };
  const hexToWord = Object.entries(colors).map(([k, v]) =>
    Object({
      name: k,
      color: v,
    })
  );

  // console.log(hexToWord);
  return (
    <View>
      <FlatList
        data={hexToWord}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => onSelectedColor(item)}
              style={[
                style.colorItemButton,
                {
                  backgroundColor: selectedColor
                    ? selectedColor.name === item.name
                      ? '#EEEEEE'
                      : Colors.White
                    : Colors.White,
                },
              ]}
            >
              <Text style={style.colorItemName}>{item.name}</Text>
              <View
                style={[
                  style.colorView,
                  {
                    backgroundColor: item.color,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={(props) => {
          return <View style={style.separatorComponent} />;
        }}
      />
    </View>
  );
};
