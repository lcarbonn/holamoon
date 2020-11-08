export const getArticles = (id, callback, context) => {
    let getDoc = context.$fireStore.collection(`articles`).doc(id).get()
        .then(doc => {
            if (!doc.exists) {
                callback([])
            } else {
                callback(doc.data().list.sort((a, b) => b.dateCreation - a.dateCreation))
            }
        })
};

export const supprimerArticles = (id, context) => {
    context.$fireStore.collection(`articles`).doc(id).delete()
};

export const sauverArticles = async (lettreId, articles, context) => {
    let ref = await context.$fireStore.collection(`articles`).doc(lettreId)
    let toSave = {
        list: articles
    }
    await ref.update(toSave)
};

export const filterNouveauxArticles = (articlesOld, articlesNew) => {

    if (articlesOld.length === 0) {
        return articlesNew
    } else {
        const lastArticle = articlesOld[0]
        return articlesNew.filter(item => item.dateCreation > lastArticle.dateCreation)
    }

};
