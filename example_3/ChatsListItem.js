import React, { PureComponent } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './styles';
import ProfileImage from './../ProfileImage/ProfileImage';
import themes from './../../themes';

moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'just now',
    ss: '%s s',
    m: '1 m',
    mm: '%d m',
    h: '1 h',
    hh: '%d h',
    d: '1 d',
    dd: '%d d',
    M: '1 m',
    MM: '%d m',
    y: '1 y',
    yy: '%d y',
  },
});

export default class ChatsListItem extends PureComponent {
  static propTypes = {
    profileImageThumbnail: PropTypes.string,
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    created: PropTypes.bool.isRequired,
    isNew: PropTypes.bool.isRequired,
    itemColor: PropTypes.string,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    profileImageThumbnail: '',
    itemColor: '',
    onPress: () => {},
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={this.props.onPress}>
        <View style={[styles.container, { backgroundColor: this.props.itemColor || '#FFF' }]}>
          <View style={[
            styles.newItem,
            { backgroundColor: this.props.isNew === true ? themes.color.pastelBlue : null },
          ]}
          />
          <ProfileImage
            style={styles.profileContainerImage}
            source={this.props.profileImageThumbnail}
          />
          <View style={styles.textContainer}>
            <View style={styles.nameDateContainer}>
              <Text style={styles.name}>{this.props.name}</Text>
              <Text style={styles.date}>{moment(this.props.created).fromNow(true)}</Text>
            </View>
            <Text style={styles.description} numberOfLines={2}>{this.props.message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
