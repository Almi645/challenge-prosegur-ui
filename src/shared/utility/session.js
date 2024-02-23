class session {
    isAuthenticated() {
        try {
            const user = JSON.parse(localStorage.getItem('session'));
            return ([undefined, null, ''].includes(user)) ? false : true;
        } catch (error) {
            return false;
        }
    };

    user() {
        const data = JSON.parse(localStorage.getItem('session'));
        return data;
    };

    isAuthorized(url) {
        try {
            const user = this.user();
            
            if ((user === null || user.userName === undefined))
                return false;

            if (user.pages.find(m => m.url === url))
                return true;

            const searchPageRecursive = (param) => {
                if (param.find(m => m.url === url))
                    return true;

                var find = false;
                for (let item of param) {
                    if (searchPageRecursive(item.children)) {
                        find = true;
                        break;
                    }
                }

                return find;
            }

            if (searchPageRecursive(user.pages))
                return true;

            return false;
        } catch (error) {
            return false;
        }
    };
}
export default new session();