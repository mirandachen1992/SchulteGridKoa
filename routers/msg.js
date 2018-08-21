const msgRoute = (router) => {
    router.get('/msg', function (ctx, next) {
        let request = ctx.query;
        console.log(request);
        ctx.response.body = request.echostr
    });
}

export default msgRoute;