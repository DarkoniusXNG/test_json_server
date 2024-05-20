const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;
const authkey = '9AE2940BA48F394CD13CAB9F813E861334C3E6F814425710EC2ED6AA75560898';

server.use(middlewares);
server.use((req, res, next) => {
	if (isAuthorized(req)) {
		next()
	} else {
		res.sendStatus(401);
	}
})
server.use(router);

server.listen(port);

function isAuthorized(req) {
	if (req.method === 'GET') return true;
	if (req.method === 'PATCH' || req.method === 'PUT') return false;
	if (req.method === 'DELETE' || req.method === 'POST') {
		if (!req.headers) return false;
		if (!req.headers['auth-key']) return false;
		if (req.headers['auth-key'] === authkey) return true;
	}
	return false;
}
