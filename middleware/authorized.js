export default function({ store, redirect }) {
    if (!store.getters['auth/isAuthorized'] && store.getters['auth/isAuthenticated']) {
        return redirect('/unauthorized');
    }
    if (!store.getters['auth/isAuthorized'] && !store.getters['auth/isAuthenticated']) {
        return redirect('/login');
    }
}
