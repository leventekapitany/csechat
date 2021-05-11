<template>
    <div>
        <form action="http://localhost:5000/api/login" method="post">
            <div>
                <label for="username">username</label>
                <input type="text" id="username" name="username">
            </div>
            <div>
                <label for="password">password</label>
                <input type="password" id="password" name="password">
            </div>
            <div>
                <input type="submit" value="Login">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login'
}
</script>