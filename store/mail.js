import { getMail, sauverMail } from '~/services/mailServices'

export const state = () => ({
    template: null,
    snackbarMessage: undefined,
    isLoading: false
});

export const getters = {
    template: state => {
        return JSON.parse(JSON.stringify(state.template));
    }
};


export const mutations = {
    setTemplate(state, payload) {
        state.template = payload;
    },
    setSnackbarMessage(state, payload) {
        state.snackbarMessage = payload.message
    },
    setIsLoading(state, payload) {
        state.isLoading = payload.isLoading
    }
};

export const actions = {
    getMail({ commit, dispatch }) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        const callback = mail => {
            commit("setTemplate", mail);
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        };
        getMail(callback, this);
    },
    sauverMail({ commit, dispatch }, payload) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        dispatch("application/setSnackbarMessage", { message: null }, { root: true });
        try {
            sauverMail(payload, this);
            dispatch("application/setSnackbarMessage", { message: "Le Mail est correctement sauvée" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            dispatch("application/setSnackbarMessage", { message: "Une erreur est survenue pendant la sauvergarde du Mail" }, { root: true });
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        }
    }
};
