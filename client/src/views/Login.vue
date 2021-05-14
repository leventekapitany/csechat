<template>
    <div class="flex h-full">
        <dark-mode-switch
        class="dark-mode-switch"/>
        
        <login-form
        class="login-form"/>
        
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import DarkModeSwitch from '../components/DarkModeSwitch.vue'

export default {
    name: 'Login',
    data() {
        return {
        }
    },
    methods: {
    },
    components: {
        LoginForm,
        DarkModeSwitch
    }
}
</script>

<style lang="postcss" scoped>
    .dark-mode-switch{
        @apply ml-3 mt-3;
    }
    .login-form{
        margin-top: 15%
    }
</style>