import { getLettres, createLettre, sauverLettre, supprimerLettre, envoyerLettre, sauverNumeroLettre } from '~/services/lettresServices'
import { supprimerArticles } from '~/services/articlesService'

export const state = () => ({
    listLettres: [],
    lettreCourante: null,
    snackbarMessage: undefined,
    isLoading: false
});

export const getters = {
    lettreCourante: state => {
        return JSON.parse(JSON.stringify(state.lettreCourante));
    },
    listLettres: state => {
        return state.listLettres;
    }
};

export const mutations = {
    setLettres(state, payload) {
        state.listLettres = payload;
    },
    setLettreCourante(state, payload) {
        state.lettreCourante = payload;
        state.lettreCourante.email = payload.destinataires.join()
    },
    setSnackbarMessage(state, payload) {
        state.snackbarMessage = payload.message
    },
    setIsLoading(state, payload) {
        state.isLoading = payload.isLoading
    },
    supprimerLettre(state, lettre) {
        state.lettreCourante = null;
        state.listLettres = state.listLettres.filter(l => l.id != lettre.id)
    }
};

export const actions = {
    getLettres({ commit, dispatch }) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        const callback = listLettres => {
            commit("setLettres", listLettres);
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        };
        getLettres(callback, this);
    },
    setLettreCourante({ commit }, payload) {
        commit("setLettreCourante", payload);
    },
    async createLettre({ commit, dispatch }) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        dispatch("application/setSnackbarMessage", { message: null }, { root: true });
        try {
            const result = await createLettre(this);
            commit("setLettreCourante", result);
            dispatch("application/setSnackbarMessage", { message: "La lettre est correctement créé" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            dispatch("application/setSnackbarMessage", { message: "Une erreur est survenue pendant la création de la lettre" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        }
    },
    sauverLettre({ commit, dispatch }, payload) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        dispatch("application/setSnackbarMessage", { message: null }, { root: true });
        try {
            sauverLettre(payload, this);
            commit("setLettreCourante", payload);
            dispatch("application/setSnackbarMessage", { message: "La lettre est correctement sauvée" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            dispatch("application/setSnackbarMessage", { message: "Une erreur est survenue pendant la sauvergarde de la lettre" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        }
    },
    supprimerLettre({ commit, dispatch }, payload) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        dispatch("application/setSnackbarMessage", { message: null }, { root: true });
        try {
            supprimerLettre(payload.id, this);
            supprimerArticles(payload.id, this);
            commit("supprimerLettre", payload.id);
            dispatch("application/setSnackbarMessage", { message: "La lettre est correctement supprimée" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            dispatch("application/setSnackbarMessage", { message: "Une erreur est survenue pendant la suppression de la lettre" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        }
    },
    async envoyerLettre({ commit, dispatch, state }, payload) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        dispatch("application/setSnackbarMessage", { message: "La lettre " + payload.lettre.titre + " #" + payload.lettre.numero + " est en cours d'envoi" }, { root: true });
        try {
            console.debug(payload.lettre)
            await envoyerLettre(payload.lettre, payload.articles, this);
            let message = "La lettre " + payload.lettre.titre + " #" + payload.lettre.numero + " a bien été envoyée"
            let lettreModifiee = null
            const callback = lettre => {
                if (lettre) {
                    lettreModifiee = lettre
                }
            };
            await sauverNumeroLettre(callback, payload.lettre, this);
            commit("setLettreCourante", lettreModifiee);
            dispatch("application/setSnackbarMessage", { message: message }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        } catch (e) {
            dispatch("application/setSnackbarMessage", { message: "Une erreur est survenue pendant l'envoi de la lettre d'info" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
            if (e.response) {
                console.error("Une erreur est survenue pendant l'envoi de la lettre d'info : " + e.response.status + ' - ' + e);
            } else {
                console.error("Une erreur est survenue pendant l'envoi de la lettre d'info : " + e.message + ' - ' + e);
            }
        }
    }
};
