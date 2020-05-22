import app from 'firebase';

import { firebaseConfig } from './config';
// Initialize Firebase

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.db = app.firestore();
        this.auth = app.auth();
        this.function = app.functions();
        // this.cloudFunction = app.auth();
        this.init();
        // setTimeout(() => this.log(), 1000);
    }



    // * Data API *
    data = {};

    init = async () => {
        this.data.contacts = this.db.collection('Contacts');
    };
}

export const fire = new Firebase();
export default Firebase;
