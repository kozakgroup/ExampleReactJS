// @flow
import {
  Dimensions,
} from 'react-native';
import { platform } from './utils';

// ==============================
// APP STYLE CONSTANTS
// ==============================

// color
const color = {
  suttonsBlue: '#0A202E',
  suttonsBlueLight: '#09344a',
  paleBlue: '#6a808f',
  shade4: '#7a868c',
  shade5: '#ABBCC6',
  shade6: '#CCD6DC',
  shade7: '#EDF1F3',
  pastelBlue: '#00b9f2',
  pastelGreen: '#3CBF88',
  red1: '#D94741',
  red2: '#FF6A64',
  darkGray: '#333',
  black: '#222222',
  topGradientColor: '#023657',
};

// font sizes
const fontSize = {
  xsmall: 12,
  small: 14,
  medium: 16,
  headerTitle: 21,
  large: 26,
  xlarge: 32,
};

// fonts
const fontFamily = {
  Bold: 'FrutigerLTStd-Bold',
  BoldItalic: 'FrutigerLTStd-BoldItalic',
  Regular: 'FrutigerLTStd-Roman',
  RegularItalic: 'FrutigerLTStd-Italic',
  Light: 'FrutigerLTStd-Light',
  LightItalic: 'FrutigerLTStd-LightItalic',
};


// Component Specific
// ------------------------------

// navbar
const navbar = {
  backgroundColor: 'white',
  buttonColor: color.blue,
  height: platform.isIOS() ? 64 : 44,
  textColor: color.text,
};

// list header
const listheader = {
  height: 34,
};

// next up
const nextup = {
  height: platform.isIOS() ? 70 : 110,
};

const talkPaneAndroidMinScrollAreaHeight = Dimensions.get('window').height - 48;

const navigationHeader = {
  header: {
    flexDirection: 'column-reverse',
    backgroundColor: color.suttonsBlue,
  },
  headerText: {
    color: '#FFF',
    width: '100%',
    fontSize: fontSize.headerTitle,
    textAlign: 'center',
  },
};

const tabBarNavigation = {
  container: {
    backgroundColor: color.suttonsBlue,
  },
  label: {
    fontFamily: fontFamily.Regular,
    fontSize: 10,
    paddingBottom: platform.isIOS() ? 5 : 0,
  },
};

export default {
  color,
  fontSize,
  fontFamily,
  navbar,
  nextup,
  listheader,
  talkPaneAndroidMinScrollAreaHeight,
  navigationHeader,
  tabBarNavigation,
};
