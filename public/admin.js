const socket = io("http://localhost:5000/admin");

window.addEventListener('load', function() {
    var logger = new Vue({
        el: '#logger',
        data: {
            logs: []
        },
        methods: {
            addNewLog(log) {
                let newLog = {
                    message: log
                };
                this.logs.push(newLog)
            }
        }
    })

    socket.on("log", message => {
        console.log(message)
        logger.addNewLog(message)
    })
})