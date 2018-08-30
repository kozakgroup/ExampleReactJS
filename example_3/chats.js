export const GET_CHATS = 'GET_CHATS';
export const getChats = auth => ({
  type: GET_CHATS,
  payload: {
    auth,
  },
});

export const SET_CHATS = 'SET_CHATS';
export const setChats = payload => ({
  type: SET_CHATS,
  payload,
});

export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
export const setCurrentChat = payload => ({
  type: SET_CURRENT_CHAT,
  payload,
});

export const SET_MESSAGE = 'SET_MESSAGE';
export const setMessageToChat = payload => ({
  type: SET_MESSAGE,
  payload,
});

export const CREATE_CHAT = 'CREATE_CHAT';
export const createChat = (auth, chat, onAfterSaga) => ({
  type: CREATE_CHAT,
  payload: {
    token: auth.token,
    user_id: auth.userId,
    members: {
      members: [{ id: chat.userId }],
    },
    message: chat.message,
    onAfterSaga,
  },
});

export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const createMessage = (auth, chat) => ({
  type: CREATE_MESSAGE,
  payload: {
    user_id: auth.userId,
    token: auth.token,
    chat_id: chat.chat_id,
    message: chat.message,
  },
});

export const GET_CHAT_MESSAGES = 'GET_CHAT_MESSAGES';
export const getChatMessages = (auth, chat, onAfterSaga) => ({
  type: GET_CHAT_MESSAGES,
  payload: {
    token: auth.token,
    user_id: auth.userId,
    chat_id: chat.chat_id,
    onAfterSaga,
  },
});
