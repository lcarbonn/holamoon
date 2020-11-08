export const getLettres = (callback, context) => {
    context.$fireStore.collection(`lettres`).onSnapshot(querySnapshot => {
        const list = [];
        let lettre = {}
        querySnapshot.forEach(doc => {
            lettre = {}
            lettre = doc.data()
            lettre.id = doc.id
            list.push(lettre);
        });
        callback(list);
    });
};

export const createLettre = async (context) => {
    const nouvelleLettre = {
        "titre": "Nouvelle Lettre",
        "numero": 1,
        "destinataires": [],
        "hashtag": "nouvelleLettre",
        "token": "",
    }
    const ref = await context.$fireStore.collection('lettres').add(nouvelleLettre)

    context.$fireStore.collection('articles').doc(ref.id).set(
        {
            list: []
        }
    )
    nouvelleLettre.id = ref.id
    return nouvelleLettre
};

export const sauverLettre = async (lettre, context) => {
    context.$fireStore.collection('lettres').doc(lettre.id).update({
        titre: lettre.titre,
        numero: lettre.numero,
        token: lettre.token,
        hashtag: lettre.hashtag,
        destinataires: lettre.email.split(',')
    })
};

export const sauverNumeroLettre = async (callback, lettre, context) => {
    let lettreRef = context.$fireStore.collection('lettres').doc(lettre.id)

    await lettreRef.update({
        numero: lettre.numero + 1,
    })

    await lettreRef.get()
        .then(doc => {
            let lettreModifiee = doc.data()
            lettreModifiee.id = lettre.id
            callback(lettreModifiee);
        })
};

export const supprimerLettre = async (lettreId, context) => {
    context.$fireStore.collection('lettres').doc(lettreId).delete()
};

export const envoyerLettre = async (lettre, articles, context) => {
    let body = {
        "titre": lettre.titre,
        "numero": lettre.numero,
        "destinataires": lettre.destinataires,
        "articles": articles
    }
    let config =
    {
        headers: {
            "Content-Type": "application/json"
        }
    }

    await context.$axios.post(`/sendLettreDInfo`, body, config);
};
