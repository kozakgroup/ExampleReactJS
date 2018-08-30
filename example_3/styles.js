import { StyleSheet } from 'react-native';
import themes from './../../themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: themes.color.shade6,
  },
  textContainer: {
    flex: 2,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  name: {
    fontFamily: themes.fontFamily.Bold,
    fontSize: 18,
    color: themes.color.black,
    marginBottom: 8,
  },
  description: {
    color: themes.color.black,
    fontFamily: themes.fontFamily.Regular,
  },
  icon: {
    width: 90,
    height: 90,
  },
  profileContainerImage: {
    borderRadius: 7,
    width: 50,
    height: 50,
    marginVertical: 15,
    marginLeft: 15,
    alignSelf: 'center',
  },
  newItem: {
    width: 10,
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 15,
    marginRight: 20,
  },
  date: {
    color: themes.color.shade5,
  },
  nameDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
