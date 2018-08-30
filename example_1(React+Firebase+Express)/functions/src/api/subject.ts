import { Firestore } from "@google-cloud/firestore"

const firestore = new Firestore({
  projectId: 'react-todo-7f184',
  keyFilename: './src/api/key.json',
  timestampsInSnapshots: true
});

const collection = firestore.collection('subjects');

export default class Subject {
  static async delete(req, res) {
    try {
      await firestore.doc(`subjects/${req.params.id}`).delete();
      res.sendStatus(204);
    } catch(e) {
      res.sendStatus(500);
    }
  }

  static async create(req, res) {
    try {
      await collection.add(req.body);
      res.sendStatus(204);
    } catch(e) {
      res.sendStatus(500);
    }
    
  }

  static async update(req, res) {
    try {
      await firestore.doc(`subjects/${req.params.id}`).set(req.body);
      res.sendStatus(204);
    } catch(e) {
      res.sendStatus(500);
    }
  }
}
