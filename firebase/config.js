const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = require('./key.json');

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'shopping-mall-fb6c6.appspot.com'
});

const bucket = getStorage().bucket();

async function uploadFile(filename) {
    const randomUuid = uuidv4();
    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: randomUuid
        },
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
    };

    // Uploads a local file to the bucket
    return await bucket.upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        metadata: metadata,
    })
    .then(data => {
        let file = data[0];
        const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${randomUuid}`
        return Promise.resolve(url);
    })
}

module.exports = {
    uploadFile
}