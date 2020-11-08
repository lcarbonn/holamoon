<template>
    <div md-layout>
        <md-toolbar class="md-primary">
            <h3 class="md-title"><i>Template Mail</i></h3>
        </md-toolbar>
        <form novalidate
              class="container"
              @submit.prevent>
            <md-field :class="getValidationClass('content')">
                <div>
                    <quill-editor ref="editor"
                                  name="content"
                                  id="content"
                                  v-model="mdcontent"
                                  :options="editorOption" />
                </div>
                <span class="md-error"
                      v-if="!$v.form.content.required">The Mail Template is required</span>
                <span class="md-error"
                      v-else-if="!$v.form.content.mailContent">Invalid Mail Template : should have *|TITRE|* &
                    *|NUMERO|* & *|LIST_ARTICLES|* & then *|ARTICLE.AUTEUR|* & *|ARTICLE.CONTENU|* & then *|END|*</span>
            </md-field>

            <md-button type="submit"
                       class="md-raised  md-primary"
                       @click="sauverMail"
                       :disabled="sending">Sauver</md-button>
        </form>
    </div>
</template>

<script>

import { utils } from '~/mixins/utils';
import { validationMixin } from 'vuelidate'
import {
    required,
} from 'vuelidate/lib/validators'

import { mailContent } from '~/mixins/validator';

export default {
    name: 'FormulaireMail',
    mixins: [validationMixin],
    props: {
        content: {
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
                content: ""
            },
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'font': [] }],
                        [{ 'align': [] }]
                    ]
                }
            },
        }

    },
    computed: {
        // due to unmutable props, new v-model for validation
        mdcontent: {
            get() {
                this.$v.form.content.$model = this.content
                return this.content
            },
            set(value) {
                this.form.content = value
                this.$v.form.content.$touch()
                this.sending = this.$v.$invalid
            }
        }
    },
    validations() {
        return {
            form: {
                content: {
                    required,
                    mailContent
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
        sauverMail() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.$emit('sauverMail', this.form.content);
            }        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 16px;
}
</style>