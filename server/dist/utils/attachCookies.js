var attachCookies = function (_a) {
    var res = _a.res, token = _a.token;
    var oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
    });
};
export default attachCookies;
//# sourceMappingURL=attachCookies.js.map