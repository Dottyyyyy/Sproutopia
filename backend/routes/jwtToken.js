const sendToken = (user, statuscode, res, message = 'success') => {

    const token = user.getJwtToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,
    }
    res.status(statuscode)
        .json({
            user,
            success: true,
            token,
            message,
        })
}

module.exports = sendToken;