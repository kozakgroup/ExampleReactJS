import {
  AsyncStorage,
  Platform,
} from 'react-native';
import { composeWithDevTools } from 'remote-redux-devtools';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import reducers from './reducers';
import mainSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
];

const enhancer = composeWithDevTools({
  name: Platform.OS,
  hostname: 'localhost',
  port: 5678,
});

const store = createStore(
    reducers,
    enhancer(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(mainSaga);

persistStore(store, {
  storage: AsyncStorage,
  blacklist: [
    'logs',
    'maybeShoutOut',
    'userList',
    'articleDetails',
    'notificationHistory',
    'selectedArticleTagId',
    'maybeChat',
    'currentChat',
  ],
});

export default store;
