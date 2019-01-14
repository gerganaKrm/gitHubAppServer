var express   = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	request = require("request"),
	chache = require("node-cache");

var app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var pinnedRepos = [
	{
		name: "clarity",
		userName: "",
		commits: "",
		contributors: "",
		releases: "",
		branches: "",
		license: "Other"
	},
	{
		name: "photon",
		userName: "",
		commits: "",
		contributors: "",
		releases: "",
		branches: "",
		license: "Other"
	},
	{
		name: "open-vm-tools",
		userName: "",
		commits: "",
		contributors: "",
		releases: "",
		branches: "",
		license: "Other"
	},
	{
		name: "govmmomi",
		userName: "",
		commits: "",
		contributors: "",
		releases: "",
		branches: "",
		license: "Other"
	},
	{
		name: "pyvmomi",
		userName: "",
		commits: "",
		contributors: "",
		releases: "",
		branches: "",
		license: "Other"
	}
];
app.post('/login', function (req, res) {
	var userData = req.body,
	userExist = findUser(userData);
	console.log("test: " + userExist);
	res.send(userExist)
});
app.get('/repos', function (req, res) {
	res.send(pinnedRepos);
});


app.get('/repoDetails', function (req, res) {
	var url = "https://api.github.com/repos/vmware/" + req.param("repoName") + '/commits';
	var options = {
		url: url,
		method: 'GET',
		headers: {'user-agent': 'node.js'}
	};
	console.log(req.param("repoName"));
	request( options , (error, response, body) => {
		if(error) {
			return console.log(error);
		}
		console.log(url);
		res.send(body);
	});
});

app.get('/repoDescription', function (req, res) {
	var options = {
		url: "https://api.github.com/repos/vmware/" + req.param("repoName") + '/readme',
		method: 'GET',
		headers: {'user-agent': 'node.js'}
	};
	console.log(req.param("repoName"));
	request( options , (error, response, body) => {
		if(error) {
			return console.log(error);
		}
		res.send(body);
	});
});

app.get('/commitPatch', function (req, res) {
	var url = "https://api.github.com/repos/vmware/" + req.param("repoName") + "/commits/" + req.param("sha");
	var options = {
		url: url,
		method: 'GET',
		headers: {
			'user-agent': 'node.js',
			'Content-Type': 'application/vnd.github.VERSION.patch'
		}
	};
	console.log(url);
	request( options , (error, response, body) => {
		if(error) {
			return console.log(error);
		}
		res.send(body);
	});
});


function findUser(user) {
	var testUser = {
		username: "some",
		password: "123"
	};
	console.log(user);
	if (testUser.username === user.user && testUser.password === user.password) {
		return {res: "true"};
	} else {
		return false;
	}
}

app.listen( 3000, function(){
	console.log("listening on port 300")
}) ;