const firebaseConfig = {
    apiKey: "AIzaSyBp1xwFjTgton9osZovvI835w3Ua-0jIxY",
    authDomain: "project-8976367532393058456.firebaseapp.com",
    databaseURL: "https://project-8976367532393058456-default-rtdb.firebaseio.com",
    projectId: "project-8976367532393058456",
    storageBucket: "project-8976367532393058456.appspot.com",
    messagingSenderId: "132561117291",
    appId: "1:132561117291:web:6275206ce1645b9b36912e"
};

const model = firebase.initializeApp(firebaseConfig, firebaseConfig.appId);

async function write(value, path) {
    try {
        await model.database().ref(path).set(value)
        return true
    } catch (err) {
        return false
    }
}

async function read(path) {
    let snapshot = await model.database().ref(path).get()
    return snapshot.val()
}

function listen(path, callback) {
    model
        .database()
        .ref(path)
        .on('value', (snapshot) => {
            if (typeof callback === 'function') {
                callback(snapshot.val())
            }
        })
}

; (async () => {
    let result = await write('BBB', 'test')
    console.log(result)

    let response = await read('test')
    console.log(response)

    listen('test', (value) => {
        console.log(value)
    })
})()