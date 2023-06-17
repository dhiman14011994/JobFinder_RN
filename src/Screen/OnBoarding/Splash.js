import { useWindowDimensions } from 'react-native';
import React, { useEffect } from 'react';
import { RouteName } from '../../Navigation/routeName';

import {
  splashBubble,
  splashBottom,
  splashPeople,
  logo,
  // web
  splashBottomWeb,
  splashBubbleWeb,
  splashPeopleWeb,
} from '../../Resources/assets';
import { isNative } from '../../Util';
import {
  SpalshPeopleImageParent,
  SplashBottomImage,
  SplashBubbleBottomParent,
  SplashBubbleImage,
  SplashPeopleImage,
  SplashBottomImageParent,
  SplashWrapper,
  LogoImage,
  LogoParent,
} from './style';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(RouteName.OURGOAL);
    }, 1000);
  }, []);

  const { height, width } = useWindowDimensions();

  return (
    <SplashWrapper>
      <LogoParent isNative={isNative} height={height} width={width}>
        <LogoImage
          isNative={isNative}
          source={logo}
          resizeMode="contain"
          height={height}
          width={width}
        />
      </LogoParent>
      <SplashBottomImageParent>
        <SplashBottomImage
          source={isNative ? splashBottom : splashBottomWeb}
          resizeMode="cover"
          height={height}
          width={width}
        />
      </SplashBottomImageParent>
      <SplashBubbleBottomParent>
        <SplashBubbleImage
          source={isNative ? splashBubble : splashBubbleWeb}
          resizeMode="contain"
          height={height}
          width={width}
        />
      </SplashBubbleBottomParent>
      <SpalshPeopleImageParent height={height} width={width}>
        <SplashPeopleImage
          source={isNative ? splashPeople : splashPeopleWeb}
          resizeMode="contain"
          isNative={isNative}
          height={height}
          width={width}
        />
      </SpalshPeopleImageParent>
    </SplashWrapper>
  );
};

export default Splash;
