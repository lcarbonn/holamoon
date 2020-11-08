<template>
    <div class="container">
        <form novalidate
              @submit.prevent>
            <div class="md-layout ">
                <div class="md-layout-item ">
                    <md-field :class="getValidationClass('titre')">
                        <md-icon>description</md-icon>
                        <label for="titre">Titre</label>
                        <md-input name="titre"
                                  id="titre"
                                  v-model.trim="mdtitre" />
                        <span class="md-error"
                              v-if="!$v.form.titre.required">The Titre is required</span>
                        <span class="md-error"
                              v-else-if="!$v.form.titre.minlength">Invalid Titre</span>
                    </md-field>
                </div>
                <div class="md-layout-item ">
                    <md-field :class="getValidationClass('numero')">
                        <md-icon>bookmark</md-icon>
                        <label for="numero">Numéro</label>
                        <md-input name="numero"
                                  id="numero"
                                  type="number"
                                  v-model.number="mdnumero" />
                        <span class="md-error"
                              v-if="!$v.form.numero.required">The numero is required</span>
                        <span class="md-error"
                              v-else-if="!$v.form.numero.minlength">Invalid numero</span>
                    </md-field>
                </div>
            </div>
            <div class="md-layout ">
                <div class="md-layout-item ">
                    <md-field :class="getValidationClass('token')">
                        <md-icon>chat</md-icon>
                        <label for="token">token</label>
                        <md-select name="token"
                                   id="token"
                                   v-model.trim="mdtoken">
                            <md-option v-for="item in tokens"
                                       :key="item.id"
                                       :value="item.id">{{ item.slackName }}</md-option>
                        </md-select>
                        <span class="md-error"
                              v-if="!$v.form.token.required">The token is required</span>
                        <span class="md-error"
                              v-else-if="!$v.form.token.minlength">Invalid token</span>
                    </md-field>
                </div>
                <div class="md-layout-item ">
                    <md-field :class="getValidationClass('hashtag')">
                        <md-icon>#</md-icon>
                        <label for="hashtag">Hashtag</label>
                        <md-input name="hashtag"
                                  id="hashtag"
                                  v-model.trim="mdhashtag" />
                        <span class="md-error"
                              v-if="!$v.form.hashtag.required">The hashtag is required</span>
                        <span class="md-error"
                              v-else-if="!$v.form.hashtag.minlength">Invalid hashtag</span>
                    </md-field>
                </div>
            </div>

            <md-field :class="getValidationClass('email')">
                <md-icon>mail</md-icon>
                <label for="email">Courriels séparés par des virgules</label>
                <md-input name="email"
                          id="email"
                          v-model.trim="mdemail" />
                <span class="md-error"
                      v-if="!$v.form.email.required">The email is required</span>
                <span class="md-error"
                      v-else-if="!$v.form.email.listEmails">Invalid email</span>
            </md-field>

            <md-button type="submit"
                       class="md-raised  md-primary"
                       @click="sauverForm"
                       :disabled="sending">Sauver</md-button>

            <md-button type="submit"
                       @click="supprimerLettre"
                       class="md-raised  ">Supprimer la lettre</md-button>

            <md-button type="submit"
                       @click='envoyerLettre'
                       class="md-raised  md-accent"
                       :disabled="wantSending">Envoyer la lettre</md-button>
        </form>

    </div>
</template>

<script>

import { utils } from '~/mixins/utils';
import { listEmails } from '~/mixins/validator';
import { validationMixin } from 'vuelidate'
import {
    required,
    minLength,
    maxLength
} from 'vuelidate/lib/validators'
import integer from 'vuelidate/lib/validators/integer';

const toLower = text => {
    return text.toString().toLowerCase()
}

export default {
    name: 'FormulaireLettre',
    mixins: [utils, validationMixin],
    props: {
        titre: {
            type: String,
            default() {
                return ''
            }
        },
        numero: {
            type: Number,
            default() {
                return 1
            }
        },
        hashtag: {
            type: String,
            default() {
                return ''
            }
        },
        email: {
            type: String,
            default() {
                return ''
            }
        },
        token: {
            type: String,
            default() {
                return ''
            }
        }
    },
    data() {
        return {
            userSaved: false,
            sending: false,
            isSending: false,
            wantSending: false,
            form: {
                titre: "",
                numero: 1,
                hashtag: "",
                email: "",
                token: "",
            }

        }
    },
    mounted() {
        this.$store.dispatch("tokens/getTokens");
    },
    computed: {
        // due to unmutable props, new v-model for validation
        mdtitre: {
            get() {
                this.$v.form.titre.$model = this.titre
                return this.titre
            },
            set(value) {
                this.form.titre = value
                this.$v.form.titre.$touch()
                this.sending = this.$v.$invalid
            }
        },
        mdnumero: {
            get() {
                this.$v.form.numero.$model = this.numero
                return this.numero
            },
            set(value) {
                this.form.numero = value
                this.$v.form.numero.$touch()
                this.sending = this.$v.$invalid
            }
        },
        mdhashtag: {
            get() {
                this.$v.form.hashtag.$model = this.hashtag
                return this.hashtag
            },
            set(value) {
                this.form.hashtag = value
                this.$v.form.hashtag.$touch()
                this.sending = this.$v.$invalid
            }
        },
        mdemail: {
            get() {
                this.$v.form.email.$model = this.email
                return this.email
            },
            set(value) {
                this.form.email = value
                this.$v.form.email.$touch()
                this.wantSending = (value.length == 0) || (this.$v.$invalid && this.$v.form.email.$invalid)
            }
        },
        mdtoken: {
            get() {
                this.$v.form.token.$model = this.token
                return this.token
            },
            set(value) {
                this.form.token = value
                this.$v.form.token.$touch()
                this.sending = this.$v.$invalid
            }

        },
        tokens() {
            return this.$store.getters['tokens/listTokens']
        }
    },
    validations() {
        if (this.isSending) {
            return {
                form: {
                    titre: {
                        required,
                        minLength: minLength(3)
                    },
                    numero: {
                        required,
                        integer
                    },
                    token: {
                        required
                    },
                    hashtag: {
                        required,
                        minLength: minLength(3)
                    },
                    email: {
                        required,
                        listEmails
                    }
                }
            }
        } else {
            return {
                form: {
                    titre: {
                        required,
                        minLength: minLength(3)
                    },
                    numero: {
                        required,
                        integer
                    },
                    token: {
                        required
                    },
                    hashtag: {
                        required,
                        minLength: minLength(3)
                    },
                    email: {
                        listEmails
                    }
                }
            }
        }
    },
    methods: {
        AlternateLabel(count) {
            let plural = ''

            if (count > 1) {
                plural = 's'
            }

            return `${count} article${plural} sélectionné${plural}`
        },
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        sauverLettre() {
            this.$emit('sauverLettre', {
                "titre": this.form.titre,
                "numero": this.form.numero,
                "hashtag": this.form.hashtag,
                "email": this.form.email,
                "token": this.form.token
            })
        },
        sauverForm() {
            this.isSending = false;
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.sauverLettre()
                this.$emit('getArticlesFromSlack')
            }
        },
        supprimerLettre() {
            this.$emit('supprimerLettre')
        },
        envoyerLettre() {
            this.isSending = true;
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.sauverLettre();
                this.$emit('envoyerLettre')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 16px;
}
</style>