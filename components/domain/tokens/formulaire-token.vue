<template>
    <div class="container">
        <form novalidate
              @submit.prevent>
            <div class="md-layout ">
                <md-field :class="getValidationClass('slackName')">
                    <md-icon>chat</md-icon>
                    <label for="slackName">Slack Name</label>
                    <md-input name="slackName"
                              id="slackName"
                              v-model.trim="name" />
                    <span class="md-error"
                          v-if="!$v.form.slackName.required">The Name is required</span>
                    <span class="md-error"
                          v-else-if="!$v.form.slackName.minlength">Invalid Name</span>
                </md-field>
                <md-field :class="getValidationClass('accessToken')">
                    <md-icon>vpn_key</md-icon>
                    <label for="accessToken">Access Token</label>
                    <md-input name="accessToken"
                              id="accessToken"
                              v-model.trim="token" />
                    <span class="md-error"
                          v-if="!$v.form.accessToken.required">The Access Token is required</span>
                    <span class="md-error"
                          v-else-if="!$v.form.accessToken.minlength">Invalid Access Token</span>
                </md-field>
                <md-button type="submit"
                           class="md-raised  md-primary"
                           @click="sauverToken"
                           :disabled="sending">Sauver</md-button>
                <md-button type="submit"
                           @click="supprimerToken"
                           class="md-raised  ">Supprimer le Token</md-button>

            </div>
        </form>
    </div>
</template>

<script>

import { utils } from '~/mixins/utils';
import { validationMixin } from 'vuelidate'
import {
    required,
    minLength,
    maxLength
} from 'vuelidate/lib/validators'
import integer from 'vuelidate/lib/validators/integer';

export default {
    name: 'FormulaireToken',
    mixins: [utils, validationMixin],
    props: {
        slackName: {
            type: String,
            default() {
                return ''
            }
        },
        accessToken: {
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
            form: {
                slackName: "",
                accessToken: ""
            }
        }
    },
    computed: {
        // due to unmutable props, new v-model for validation
        token: {
            get() {
                this.$v.form.accessToken.$model = this.accessToken
                return this.accessToken
            },
            set(value) {
                this.form.accessToken = value
                this.$v.form.accessToken.$touch()
                this.sending = this.$v.$invalid
            }
        },
        name: {
            get() {
                this.$v.form.slackName.$model = this.slackName
                return this.slackName
            },
            set(value) {
                this.form.slackName = value
                this.$v.form.slackName.$touch()
                this.sending = this.$v.$invalid
            }
        },
    },
    validations: {
        form: {
            slackName: {
                required,
                minLength: minLength(3)
            },
            accessToken: {
                required,
                minLength: minLength(3)
            }
        }
    },
    methods: {
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName]
            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        sauverToken() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.$emit('sauverToken', {
                    "slackName": this.form.slackName,
                    "accessToken": this.form.accessToken
                })
            }
        },
        supprimerToken() {
            this.$emit('supprimerToken')
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 16px;
}
</style>