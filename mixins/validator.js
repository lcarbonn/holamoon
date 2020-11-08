import { helpers } from 'vuelidate/lib/validators'

const regexEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

export const listEmails = (value) => {
    let valide = true
    let listEmails = value.split(',')
    listEmails.forEach(email => {
        valide = valide && regexEmail.test(email.trim())
    });
    return !helpers.req(value) || valide
}

export const mailContent = (value) => {
    let valide = true
    if (value.indexOf("*|TITRE|*") == -1) valide = false;
    if (value.indexOf("*|NUMERO|*") == -1) valide = false;
    if (value.indexOf("*|ARTICLE.AUTEUR|*") == -1) valide = false;
    if (value.indexOf("*|ARTICLE.CONTENU|*") == -1) valide = false;
    if (value.indexOf("*|LIST_ARTICLES|*") == -1) valide = false;
    if (value.indexOf("*|END|*") == -1) valide = false;
    return !helpers.req(value) || valide
}

