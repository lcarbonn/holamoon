export const state = () => ({
    authUser: null
});

export const getters = {
    isAuthenticated: (state) => {
        return !!state.authUser?.uid
    },
    isAuthorized: (state) => {
        return !!state.authUser?.authorized
    }
};

export const mutations = {
    RESET_STORE: (state) => {
        Object.assign(state, { authUser: null })
    },
    SET_AUTH_USER: (state, { authUser, decodedToken }) => {
        state.authUser = {
            uid: authUser.uid,
            email: authUser.email,
            authorized: decodedToken.claims.authorized
        }
    }
};

export const actions = {
    async onAuthStateChanged({ commit }, { authUser }) {
        try {
            if (!authUser) {
                commit('RESET_STORE')
                return
            }
        const decodedToken  = await this.$fireAuthObj().currentUser.getIdTokenResult()
        commit('SET_AUTH_USER', { authUser, decodedToken })
        } catch(e) {
            //console.log(e)
        }
    },
}
