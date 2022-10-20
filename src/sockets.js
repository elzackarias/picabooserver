export default (io) => {
    var Combis = new Array();
    //Whenever someone connects this gets executed
    io.on('connection', function (socket) {
        console.log('A user connected');

        //This function update de location in the react native app, virtualDOM
        socket.on("updateLocation", (coords) => {
            if (coords.os == 'android') { //Filter the OS from this goes, (optional)
                console.log(coords)
                io.emit("coords", coords)
            }
        })

        const msg = {
            status: "Error",
            msg: "Ocurrio un error en el servidor (Something was wrong:c)"
        }
        socket.on("Error", () => {
            io.emit("Error", msg)
        })

        //Whenever someone disconnects this piece of code executed
        socket.on('disconnect', function () {
            console.log('A user disconnected');
        });
    });
}