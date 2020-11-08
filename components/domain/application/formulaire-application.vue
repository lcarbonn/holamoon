<template>
    <div md-layout>
        <md-toolbar class="md-primary">
            <h3 class="md-title"><i>Paramètres Applications</i></h3>
        </md-toolbar>
        <form novalidate
              class="container"
              @submit.prevent>
            <md-field :class="getValidationClass('titre')">
                <md-icon>title</md-icon>
                <label for="titre">Titre</label>
                <md-input name="titre"
                          id="titre"
                          v-model.trim="mdtitre" />
                <span class="md-error"
                      v-if="!$v.form.titre.required">The Title is required</span>
                <span class="md-error"
                      v-else-if="!$v.form.titre.minlength">Invalid Title</span>
            </md-field>
            <md-field :class="getValidationClass('theme')">
                <md-icon>title</md-icon>
                <label for="theme">Theme Light (or Dark)</label>
                <md-select name="theme"
                            id="theme"
                            v-model="mdtheme">
                    <md-option value="default">Light</md-option>
                    <md-option value="dark">Dark</md-option>
                </md-select>
                <span class="md-error"
                      v-if="!$v.form.theme.required">The Theme is required</span>
                <span class="md-error"
                      v-else-if="!$v.form.theme.minlength">Invalid Theme</span>
            </md-field>
            <div class="md-layout ">
                <div class="md-layout-item ">
                    <md-field :class="getValidationClass('primaryColor')">
                        <md-icon>brush</md-icon>
                        <label for="primaryColor">Primary Color</label>
                        <ColorPicker name="primaryColor"
                                    id="primaryColor" v-model="mdprimaryColor"></ColorPicker>
                        <span class="md-error"
                            v-if="!$v.form.primaryColor.required">The Primary Color is required</span>
                        <span class="md-error"
                            v-else-if="!$v.form.primaryColor.minlength">Invalid Primary Color</span>
                    </md-field>
                </div>
                <div class="md-layout-item ">
                    <md-field :class="getValidationClass('accentColor')">
                        <md-icon>brush</md-icon>
                        <label for="accentColor">Accent Color</label>
                        <ColorPicker name="accentColor"
                                    id="accentColor" v-model="mdaccentColor"></ColorPicker>
                        <span class="md-error"
                            v-if="!$v.form.accentColor.required">The Accent Color is required</span>
                        <span class="md-error"
                            v-else-if="!$v.form.accentColor.minlength">Invalid Accent Color</span>
                    </md-field>
                </div>
            </div>

            <md-button type="submit"
                       class="md-raised  md-primary"
                       @click="sauverParametres"
                       :disabled="sending">Sauver</md-button>
            <md-button type="submit"
                       class="md-raised"
                       @click="resetColors"
                       :disabled="sending">Reset</md-button>
            <md-button type="submit"
                       class="md-raised  md-accent"
                       @click="restoreDefault"
                       :disabled="sending">Restore Default</md-button>
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
import { Chrome } from 'vue-color'

export default {
    name: 'FormulaireApplication',
    mixins: [validationMixin],
    components: {
        'ColorPicker':Chrome
    },
    props: {
        titre: {
            type: String,
            default() {
                return ''
            }
        },
        theme: {
            type: String,
            default() {
                return 'default'
            }
        },
        primaryColor: {
            type:String,
            default() {
                return '#ea148d'
            }
        },
        accentColor: {
            type:String,
            default() {
                return '#ffff00'
            }
        }

    },
    data() {
        return {
            sending: false,
            form: {
                titre: "",
                theme: "",
                primaryColor: "",
                accentColor: "",
            },
            lastTitre:"",
            lastPrimaryColor:"",
            lastAccentColor:"",
            lastTheme:""
        }
    },
    mounted() {
        this.lastTitre = this.titre
        this.lastPrimaryColor = this.primaryColor
        this.lastAccentColor = this.accentColor
        this.lastTheme = this.theme
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
                this.$store.dispatch("application/setTitre", value);
            }
        },
        mdtheme: {
            get() {
                this.$v.form.theme.$model = this.theme
                return this.theme
            },
            set(value) {
                this.form.theme = value
                this.$v.form.theme.$touch()
                this.sending = this.$v.$invalid
                this.$material.theming.theme = value
                this.$store.dispatch("application/setTheme", value);
            }
        },
        mdprimaryColor: {
            get() {
                this.$v.form.primaryColor.$model = this.primaryColor
                return this.primaryColor
            },
            set(value) {
                this.form.primaryColor = value.hex
                this.$v.form.primaryColor.$touch()
                this.sending = this.$v.$invalid
                this.$store.dispatch("application/setPrimaryColor", value.hex);
            }
        },
        mdaccentColor: {
            get() {
                this.$v.form.accentColor.$model = this.accentColor
                return this.accentColor
            },
            set(value) {
                this.form.accentColor = value.hex
                this.$v.form.accentColor.$touch()
                this.sending = this.$v.$invalid
                this.$store.dispatch("application/setAccentColor", value.hex);
            }
        },
    },
    validations() {
        return {
            form: {
                titre: {
                    required,
                    minLength: minLength(3)
                },
                theme: {
                    required
                },
                primaryColor: {
                    required
                },
                accentColor: {
                    required
                }
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
        sauverParametres() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.$emit('sauverParametres', {
                    "titre": this.form.titre,
                    "theme": this.form.theme,
                    "primaryColor" : this.form.primaryColor,
                    "accentColor" : this.form.accentColor
                });
            }
        },
        resetColors() {
            this.mdtitre = this.lastTitre
            this.mdprimaryColor = {hex:this.lastPrimaryColor}
            this.mdaccentColor = {hex:this.lastAccentColor}
            this.mdtheme = this.lastTheme
        },
        restoreDefault() {
            this.mdtitre = this.lastTitre
            this.mdprimaryColor = {hex:"#ea148d"}
            this.mdaccentColor = {hex:"#ffff00"}
            this.mdtheme = "default"
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 16px;
}
</style>