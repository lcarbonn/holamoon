import { getArticles, sauverArticles, filterNouveauxArticles } from '~/services/articlesService'
import { getArticlesFromSlack } from '~/services/slackService'
import { getToken } from '~/services/tokensServices'

export const state = () => ({
    listArticles: []
});

export const getters = {
    listArticles: state => {
        return JSON.parse(JSON.stringify(state.listArticles));
    }
};

export const mutations = {
    setArticles(state, payload) {
        state.listArticles = payload;
    }
};

export const actions = {
    resetArticles({ commit, dispatch }) {
        let listArticles = []
        commit("setArticles", listArticles);
    },
    getArticles({ commit, dispatch, rootState }, payload) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });

        const callback = listArticles => {
            if (!rootState.lettres.lettreCourante || payload == rootState.lettres.lettreCourante.id) {
                commit("setArticles", listArticles);
                dispatch("getArticlesFromSlack");
            }
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        };
        getArticles(payload, callback, this);
    },
    async getArticlesFromSlack({ commit, dispatch, rootState }) {
        // set consts to avoid data changed from state during traitment
        const lettreCourante = rootState.lettres.lettreCourante;
        const listArticles = rootState.articles.listArticles;
        const lettreId = lettreCourante.id;
        const tokenId = lettreCourante.token;

        if (tokenId.length == 0 || lettreCourante.hashtag.length == 0) {
            commit("setArticles", []);
            return;
        }
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });

        let accessToken = null
        const appelRetour = token => {
            if (token && token.accessToken) {
                accessToken = token.accessToken
            }
        };
        await getToken(appelRetour, tokenId, this);
        if (!accessToken) {
            dispatch("application/setSnackbarMessage", { message: "Le token de cette lettre n'est pas défini, merci de le mettre à jour" }, { root: true });
            commit("setArticles", []);
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
            return;
        }
        const callback = result => {
            if (result === 500) {
                commit("setArticles", []);
                dispatch("application/setSnackbarMessage", { message: "Un erreur est survenue pendant le rafraichissement des articles. Veuillez ré-essayer plus tard s'il vous plait." }, { root: true });
            } else {
                let newArticles = filterNouveauxArticles(listArticles, result)
                let toSave = newArticles.concat(listArticles)
                if (toSave.length > 0) {
                    // check si c'est toujours la même lettre en state
                    if (!rootState.lettres.lettreCourante || lettreId == rootState.lettres.lettreCourante.id) {
                        sauverArticles(lettreId, toSave, this)
                        commit("setArticles", toSave);
                        dispatch("application/setSnackbarMessage", {
                            message: `Nous avons trouvé ${newArticles.length} nouveaux articles.`
                        }, { root: true });
                    }
                } else {
                    dispatch("application/setSnackbarMessage", {
                        message: `Pas de nouveaux articles.`
                    }, { root: true });
                }

            }
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        };
        getArticlesFromSlack(this, lettreCourante.hashtag, accessToken, callback);
    },
    async publierArticles({ commit, dispatch, state }, payload) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        try {
            let articlesTUpdate = JSON.parse(JSON.stringify(state.listArticles)).map(article => {
                if (payload.articles.filter(item => item.dateCreation === article.dateCreation).length !== 0) {
                    article.datePublication = new Date().getTime()
                }
                return article
            })
            await sauverArticles(payload.lettre.id, articlesTUpdate, this);
            commit("setArticles", articlesTUpdate);
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        } catch (e) {
            dispatch("application/setSnackbarMessage", { message: "Une erreur est survenue pendant la publication des articles" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
            if (e.response) {
                console.error("Une erreur est survenue pendant la publication des articles : " + e.response.status + ' - ' + e);
            } else {
                console.error("Une erreur est survenue pendant la publication des articles : " + e.message + ' - ' + e);
            }
        }
    }
};
