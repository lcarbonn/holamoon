import { getParametres, sauverParametres } from '~/services/applicationServices'

export const state = () => ({
    titre: "Lune Bleue",
    isLoading: false,
    snackbarMessage: null,
    parametres: null
});


export const mutations = {
    setSnackbarMessage(state, message) {
        state.snackbarMessage = message
    },
    setIsLoading(state, isLoading) {
        state.isLoading = isLoading
    },
    setParametres(state, parametres) {
        state.parametres = parametres
    },
    setTitre(state, titre) {
        state.parametres.titre = titre;
    },
    setPrimaryColor(state, color) {
        state.parametres.primaryColor = color
    },
    setAccentColor(state, color) {
        state.parametres.accentColor = color
    },
    setTheme(state, theme) {
        state.parametres.theme = theme
    }
};

export const getters = {
    snackbarMessage: state => {
        return state.snackbarMessage
    },
    isLoading: state => {
        return state.isLoading
    },
    parametres: state => {
        return JSON.parse(JSON.stringify(state.parametres))
    }
};

export const actions = {
    // setTitre({ commit }, payload) {
    //     commit("setTitre", payload);
    // },
    setSnackbarMessage({ commit }, payload) {
        commit("setSnackbarMessage", payload.message);
    },
    setIsLoading({ commit }, payload) {
        commit("setIsLoading", payload.isLoading);
    },
    getParametres({ commit, dispatch }) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        const callback = parametres => {
            commit("setParametres", parametres);
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        };
        getParametres(callback, this);
    },
    sauverParametres({ commit, dispatch }, payload) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        dispatch("application/setSnackbarMessage", { message: null }, { root: true });
        try {
            sauverParametres(payload, this);
            dispatch("application/setSnackbarMessage", { message: "Les Paramètres sont correctement sauvés" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            dispatch("application/setSnackbarMessage", { message: "Une erreur est survenue pendant la sauvergarde des Paramètres" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        }
    },
    setPrimaryColor({ commit }, color) {
        commit("setPrimaryColor", color);
    },
    setAccentColor({ commit }, color) {
        commit("setAccentColor", color);
    },
    setTheme({ commit }, theme) {
        commit("setTheme", theme);
    },
    setTitre({ commit }, titre) {
        commit("setTitre", titre);
    }
};

