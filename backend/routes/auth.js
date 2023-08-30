const express = require('express');
const router = express();
const {logOut} = require('../controller/control')
router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get('/login/failed',(req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get('/auth/logout', logOut);

module.exports = router;