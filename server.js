var express   = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	request = require("request"),
	// Add cache
	chache = require("node-cache");

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// TBD pinned repo - api?
//Commits, contributors... - count in table?
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
	var userExist = findUser(req.body);
	res.send(userExist)
});

app.get('/repos', function (req, res) {
	res.send(pinnedRepos);
});

app.get('/repoDetails', function (req, res) {
		var options = {
			url: "https://api.github.com/repos/vmware/" + req.param("repoName") + '/commits',
			method: 'GET',
			headers: {'user-agent': 'node.js'}
		};

	request( options , (error, response, body) => {
		if(error) {
			res.send(error);
		}
		res.send(body);
	});
});

app.get('/repoDescription', function (req, res) {
	var options = {
		url: "https://api.github.com/repos/vmware/" + req.param("repoName") + '/readme',
		method: 'GET',
		headers: {'user-agent': 'node.js'}
	};
	request( options , (error, response, body) => {
		if(error) {
			res.send(error);
		}
		res.send(body);
	});
});

app.get('/commitPatch', function (req, res) {
	var options = {
		url: "https://api.github.com/repos/vmware/" + req.param("repoName") + "/commits/" + req.param("sha"),
		method: 'GET',
		headers: {
			'user-agent': 'node.js',
			'Content-Type': 'application/vnd.github.VERSION.patch'
		}
	};
	request( options , (error, response, body) => {
		if(error) {
			res.send(body);
		}
		res.send(body);
	});
});


function findUser(user) {
	var testUser = {
		username: "some",
		password: "123"
	};

	if (testUser.username === user.user && testUser.password === user.password) {

		return {res: true};
	} else {

		return {res: false};
	}
}

app.listen( 3000, function(){
	console.log("listening on port 3000");
});