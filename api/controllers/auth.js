const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { env } = require('../util/constants');

const mailOptions = {
	host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
	pool: true,
	maxConnections: 1,
	rateDelta: 15000,
	rateLimit: 5,
};

var transport = nodemailer.createTransport(mailOptions, function (err, info) {
	if(err)
		console.log(err);
	else
		console.log(info);
});

exports.postLogin = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({username: username});
    if (!user) {
      const error = new Error("Incorrect email/password, please Try again");
      error.statusCode = 422;
      next(error);
    } else {
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        const error = new Error("Incorrect email/password, please Try again");
        error.statusCode = 422;
        next(error);
      } else {
        const token = jwt.sign(
          {
            userId: user._id,
            username: user.username,
            email: user.email,
            avatarKey: user.avatarKey,
          },
          env.JWT_SECRET,
          {expiresIn: '1D'}
        );

        res.status(200).json({token: token, userId: user._id.toString(), username: user.username});
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.passwordReset = async(req, res, next) => {
  const email = req.body.email;

  try {
    crypto.randomBytes(32, async(err, buffer) => {
  		if (err) {
  			throw err;
  		}
  		const token = buffer.toString('hex');
  
  		const user = await User.findOne({email: email});
      
      if (!user) {
        const error = new Error(`Could not find user with email: ${email}.`);
        error.statusCode = 400;
        throw error;
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      await user.save();
      transport.sendMail({
        to: req.body.email,
        from: 'no-reply@zetflix.com',
        subject: 'Password Reset',
        html: `<p>Password reset</p>
          <p>Click this <a href="${env.BASE_URL}/reset/${token}">link</a> to set a new password.</p>`
          });
  		})
  } catch (err) {
    if(err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.postNewPassword = async(req, res, next) => {
	const newPassword = req.body.password;
	const userId = req.body.userId;
	const token = req.body.passwordToken;
	let resetUser;

	try {
    const user = await User.findOne({
    		resetToken: token, 
    		resetTokenExpiration: {$gt: Date.now()}, 
    		_id: userId
    	})
      resetUser = user;
      
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      await resetUser.save();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}