import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('screen');

const widthToDp = widhtNum => {
  let givenWidth =
    typeof widhtNum === 'number' ? widhtNum : parseFloat(widhtNum);

  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightToDp = heightNum => {
  let givenheight =
    typeof heightNum === 'number' ? heightNum : parseFloat(heightNum);

  return PixelRatio.roundToNearestPixel((width * givenheight) / 100);
};

export {height, width, widthToDp, heightToDp};
