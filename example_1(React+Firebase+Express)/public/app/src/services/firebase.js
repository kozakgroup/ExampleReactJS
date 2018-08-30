import firebase from 'firebase'

const store = firebase.initializeApp({
  apiKey: '',
  databaseURL: '',
  projectId: '',
}).firestore();

store.settings({timestampsInSnapshots: true});

const subjectsCollection = store.collection("subjects");

export default {
  onUpdate(func) {
    subjectsCollection.onSnapshot((snapshot) => func(snapshot.docs.map(doc => Object.assign(doc.data(), {id: doc.id}))));
  }
}
