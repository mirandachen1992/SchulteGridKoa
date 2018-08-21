const msgRoute = (router) => {
    router.get('/msg', function (ctx, next) {
        let request = ctx.query;
        ctx.response.body = request.echostr
    });
}

export default msgRoute;