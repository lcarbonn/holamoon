export const createApplication = (context) => {
    const parametres = {
        "titre": "Titre Application",
    }
    context.$fireStore.collection('application').doc('parametres').set(parametres)
    return parametres
};

export const getParametres = async (callback, context) => {
    await context.$fireStore.collection(`application`).doc('parametres').get()
        .then(doc => {
            let parametres = null
            if (doc.exists) {
                parametres = doc.data()
            } else {
                parametres = createApplication(context);
            }
            callback(parametres);
        })
};

export const sauverParametres = async (parametres, context) => {
    context.$fireStore.collection('application').doc('parametres').update({
        titre: parametres.titre,
        theme: parametres.theme,
        primaryColor: parametres.primaryColor,
        accentColor: parametres.accentColor
    })
};

export const supprimerParametres = async (context) => {
    context.$fireStore.collection('application').doc('parametres').delete()
};


