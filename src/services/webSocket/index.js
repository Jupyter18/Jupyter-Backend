const socket = (io) =>{
    io.use((socket,next)=>{
        const token = socket.handshake.auth.token;
        if(token == ''){
            console.log('Auth failed');
            next(new Error('Auth failed'));
        }else{
            console.log(token);
            if(token == 'police'){
                socket.user = token;
            }
            next()
        }
       
    })
    io.on('connection', async (socket) => {
        console.log('a user connected',socket.user);
        if(socket.user){
            socket.join('officers');
        }
        socket.on('report',(data)=>{
            console.log(data.key,data.data);
            socket.to('officers').emit('report',data);
        })

        socket.on('disconnect',()=>{
            console.log('a user disconnected');
        })
    });
};

module.exports = socket;