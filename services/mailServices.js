export const createMail = (context) => {
    const template = {
        "content": "Nouveau Template Mail"
    }
    context.$fireStore.collection('mail').doc('template').set(template)
    return template
};

export const getMail = async (callback, context) => {
    let query = await context.$fireStore.collection(`mail`).doc('template').get()
        .then(doc => {
            let template = null
            if (doc.exists) {
                template = doc.data()
            } else {
                template = createMail(context);
            }
            callback(template);
        })
};

export const sauverMail = async (newContent, context) => {
    context.$fireStore.collection('mail').doc('template').update({
        content: newContent
    })
};

export const supprimerMail = async (context) => {
    context.$fireStore.collection('mail').doc('template').delete()
};


