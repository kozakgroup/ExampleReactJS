import React, { Component } from 'react';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';
import {
  Provider,
} from 'react-redux';
import { StackNavigator } from 'react-navigation';
import SplashScreen from 'rn-splash-screen';
import Orientation from 'react-native-orientation';
import OneSignal from 'react-native-onesignal';
import store from './store';
import {
  STACK,
  STACK_CONFIG,
} from './config';
import LogModal from './components/LogModal/LogModal';
import { setOneSignalConfig } from './actions/oneSignalConfig';
import NavigationTracking from './services/NavigationTracking';

const AppNavigator = StackNavigator(STACK, STACK_CONFIG);

const registerOneSignalDevice = device => store
  .dispatch(setOneSignalConfig({ playerId: device.userId }));

const styles = {
  wrapper: {
    flex: 1,
  },
};

const tracker = NavigationTracking(store.dispatch);

export default class Main extends Component {
  componentDidMount() {
    Text.defaultProps.allowFontScaling = false;
    SplashScreen.hide();
    Orientation.lockToPortrait();
    OneSignal.configure({});
    OneSignal.addEventListener('ids', registerOneSignalDevice);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', registerOneSignalDevice);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.wrapper}>
          <StatusBar barStyle="light-content" />
          <AppNavigator onNavigationStateChange={tracker} />
          <LogModal />
        </View>
      </Provider>
    );
  }
}
