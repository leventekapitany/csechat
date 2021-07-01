<template>
  <form @submit="login" action="http://localhost:5000/api/login" method="post" autocomplete="off"
        class="container flex flex-col w-1/5 mx-auto text-center m-500">
                <label for="username"
                    class="object-center">username</label>
                
                <input type="text" id="username" name="username" v-model="username"
                    class="text-center input">
                
                <label for="password">password</label>
                
                <input type="password" id="password" name="password" v-model="password"
                    class="text-center">
                
                <button type="submit"
                    class="bg-blue-700 w-1/2 mx-auto object-center rounded-lg p-1 mt-4
                    hover:bg-blue-600 text-white">Login</button>
                
                <label
                    :class="{'opacity-100': responseText != ''}"
                    class="text-red-600 font-semibold transition duration-300 ease-in-out
                    opacity-0">
                    {{ responseText }}
                </label>
        </form>
</template>

<script>
import axios from 'axios'

axios.defaults.withCredentials = true
import config from '../config'

export default {
    name: 'LoginForm',
    data() {
        return {
            username: '',
            password: '',
            responseText: '',
            error: ''
        }
    },
    methods: {
        login: function(e) {
            e.preventDefault()

            axios.post(config.api + '/login', {
                username: this.username,
                password: this.password
            })
            .then((res) => {
                console.log(res)
                this.responseHandler(res.data.status)
            })
            .catch((error) => {
                console.log(error)
            })
            
        },

        responseHandler: function(status) {
            switch (status) {
                case 'invalid': {
                    this.responseText = 'Invalid username or password'
                } break
                case 'ok': {
                    this.responseText = 'Succesful Login'
                } break
                case 'error': {
                    this.responseText = 'Database Error'
                } break
            }
        }
    }
}
</script>

<style lang="postcss" scoped>
    input, label{
        @apply mt-2 text-xl;
    }
    input {
       @apply dark:text-black border-2 border-gray-400 rounded-xl; 
    }
    input:focus-visible {
        outline: none;
        box-shadow: 1px 1px 1px 1px grey;
    }
/*     ._visible{
        opacity: 1 !important;
    }
    label{
        transition: opacity 5s;
    } */
</style>