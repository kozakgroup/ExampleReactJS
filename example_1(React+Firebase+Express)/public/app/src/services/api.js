const baseApiUrl = 'express-api-url';

export default {
  updateSubject(subject) {
    return fetch(`${baseApiUrl}/${subject.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(subject)
    });
  },

  removeSubject(id) {
    return fetch(`${baseApiUrl}/${id}`, {method: 'DELETE'});
  },

  createSubject(subject) {
    return fetch(`${baseApiUrl}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(subject)
    });
  }
}
