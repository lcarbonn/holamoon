export const utils = {
    methods: {
        getDate(date) {
            if (date) {
                const options = {
                    year: "numeric",
                    month: "2-digit",
                    day: "numeric"
                };
                return new Date(date).toLocaleDateString("fr-FR", options);
            } else {
                return "";
            }
        },
        cloneJsObject(objectToClone) {
            return (objectToClone) ? JSON.parse(JSON.stringify(objectToClone)) : undefined;
        }
    }
};
