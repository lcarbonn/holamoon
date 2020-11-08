import { getToken, getTokens, createToken, sauverToken, supprimerToken } from '~/services/tokensServices'

export const state = () => ({
    listTokens: [],
    tokenCourant: null,
    snackbarMessage: undefined,
    isLoading: false
});

export const getters = {
    tokenCourant: state => {
        return JSON.parse(JSON.stringify(state.tokenCourant));
    },
    listTokens: state => {
        return state.listTokens;
    }
};

export const mutations = {
    setTokens(state, payload) {
        state.listTokens = payload;
    },
    setTokenCourant(state, payload) {
        state.tokenCourant = payload;
    },
    setSnackbarMessage(state, payload) {
        state.snackbarMessage = payload.message
    },
    setIsLoading(state, payload) {
        state.isLoading = payload.isLoading
    },
    supprimerToken(state, token) {
        state.tokenCourant = null;
        state.listTokens = state.listTokens.filter(l => l.id != token.id)
    }
};

export const actions = {
    getTokens({ commit, dispatch }) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        const callback = listTokens => {
            commit("setTokens", listTokens);
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        };
        getTokens(callback, this);
    },
    setTokenCourant({ commit }, payload) {
        commit("setTokenCourant", payload);
    },
    async createToken({ commit, dispatch }) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        dispatch("application/setSnackbarMessage", { message: null }, { root: true });
        try {
            const result = await createToken(this);
            commit("setTokenCourant", result);
            dispatch("application/setSnackbarMessage", { message: "Le Token est correctement créé" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            dispatch("application/setSnackbarMessage", { message: "Une erreur est survenue pendant la création du token" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        }
    },
    sauverToken({ commit, dispatch }, payload) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        dispatch("application/setSnackbarMessage", { message: null }, { root: true });
        try {
            sauverToken(payload, this);
            commit("setTokenCourant", payload);
            dispatch("application/setSnackbarMessage", { message: "Le Token est correctement sauvée" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            dispatch("application/setSnackbarMessage", { message: "Une erreur est survenue pendant la sauvergarde du Token" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        }
    },
    supprimerToken({ commit, dispatch }, payload) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        dispatch("application/setSnackbarMessage", { message: null }, { root: true });
        try {
            supprimerToken(payload.id, this);
            commit("supprimerToken", payload.id);
            dispatch("application/setSnackbarMessage", { message: "Le Token est correctement supprimée" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            dispatch("application/setSnackbarMessage", { message: "Une erreur est survenue pendant la suppression du Token" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        }
    }
};
