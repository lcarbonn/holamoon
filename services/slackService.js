export const getArticlesFromSlack = async (context, hashtag, access_token, callback) => {
    let response = {}
    try {
        response = await context.$axios.get(`/getArticlesFromSlack?access_token=${access_token}&hashtag=${hashtag}`);
        callback(response.data)
    } catch (e) {
        console.error('Une erreur est survenue pendant getArticlesFromSlack :  ' + e);
        callback(500)
    }

};



