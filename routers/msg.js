const msgRoute = (router) => {
    router.get('/msg', function (ctx, next) {
        let query = ctx.query;
        console.log(query);
        ctx.response.body = request.echostr
    });


    router.post('/msg', function (ctx, next) {
        let body = ctx.body;
        console.log(body);
        ctx.response.body = request.echostr
    });
}

export default msgRoute;