export const getTokens = (callback, context) => {
    context.$fireStore.collection(`tokens`).onSnapshot(querySnapshot => {
        const list = [];
        let token = {}
        querySnapshot.forEach(doc => {
            token = {}
            token = doc.data()
            token.id = doc.id
            list.push(token);
        });
        callback(list);
    });
};

export const getToken = async (callback, tokenId, context) => {
    let query = await context.$fireStore.collection(`tokens`).doc(tokenId).get()
        .then(doc => {
            let token = doc.data()
            callback(token);
        })
};

export const createToken = async (context) => {
    const nouveauToken = {
        "slackName": "Nouveau Slack",
        "accessToken": ""
    }
    const ref = await context.$fireStore.collection('tokens').add(nouveauToken)
    nouveauToken.id = ref.id
    return nouveauToken
};

export const sauverToken = async (token, context) => {
    context.$fireStore.collection('tokens').doc(token.id).update({
        slackName: token.slackName,
        accessToken: token.accessToken
    })
};

export const supprimerToken = async (tokenId, context) => {
    context.$fireStore.collection('tokens').doc(tokenId).delete()
};


