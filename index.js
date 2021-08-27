require('dotenv').config()

const Express = require('express')
const Morgan = require('morgan')
const Faker = require('faker')


const app = Express()

app.use(Express.json())

app.use(Morgan('combined'))

app.use(headersLogger())

app.use(bodyLogger())


app.post('/login/oauth/access_token', (req, res) => {
  const { client_id = null } = req.body

  if (null == client_id) {
    console.error('client_id is missing')
    return res.sendStatus(400)
  }


  const { client_secret = null } = req.body

  if (null == client_secret) {
    console.error('client_secret is missing')
    return res.sendStatus(400)
  }


  const { code = null } = req.body

  if (null == code) {
    console.error('code is missing')
    return res.sendStatus(400)
  }


  const access_token = process.env.USER_ACCESS_TOKEN

  if (null == access_token) {
    throw new Error('missing USER_ACCESS_TOKEN env var')
  }


  return res.json({
    access_token,
    token_type: 'bearer',
    scope: 'user:email'
  })
})


app.get('/user/emails', (req, res) => {
  const user_primary_email = process.env.USER_PRIMARY_EMAIL
  
  if (null == user_primary_email) {
    throw new Error('missing USER_PRIMARY_EMAIL env var')
  }

  return res.json([
    {
      primary: true,
      email: user_primary_email
    }
  ])
})


app.get('/rate_limit', (req, res) => {
  return res.json({
    resources: {
      core: {
        limit: 60,
        remaining: 56,
        reset: 1629988816,
        used: 4,
        resource: 'core'
      },
      graphql: {
        limit: 0,
        remaining: 0,
        reset: 1629989267,
        used: 0,
        resource: 'graphql'
      },
      integration_manifest: {
        limit: 5000,
        remaining: 5000,
        reset: 1629989267,
        used: 0,
        resource: 'integration_manifest'
      },
      search: {
        limit: 10,
        remaining: 10,
        reset: 1629985727,
        used: 0,
        resource: 'search'
      }
    },
    rate: {
      limit: 60,
      remaining: 56,
      reset: 1629988816,
      used: 4,
      resource: 'core'
    }
  })
})


app.get('/repos/:owner/:repo', (req, res) => {
  return res.json({
    "id": Faker.datatype.number(),
    "node_id": Faker.random.alphaNumeric(24),
    "name": req.params.repo,
    "full_name": [req.params.owner, req.params.repo].join('/'),
    "private": false,
    "owner": {
      "login": req.params.owner,
      "id": Faker.datatype.number(),
      "node_id": Faker.random.alphaNumeric(24),
      "avatar_url": "https://avatars.githubusercontent.com/u/10085488?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/senecajs",
      "html_url": "https://github.com/senecajs",
      "followers_url": "https://api.github.com/users/senecajs/followers",
      "following_url": "https://api.github.com/users/senecajs/following{/other_user}",
      "gists_url": "https://api.github.com/users/senecajs/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/senecajs/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/senecajs/subscriptions",
      "organizations_url": "https://api.github.com/users/senecajs/orgs",
      "repos_url": "https://api.github.com/users/senecajs/repos",
      "events_url": "https://api.github.com/users/senecajs/events{/privacy}",
      "received_events_url": "https://api.github.com/users/senecajs/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "html_url": "https://github.com/senecajs/seneca",
    "description": Faker.lorem.paragraph(),
    "fork": false,
    "url": "https://api.github.com/repos/senecajs/seneca",
    "forks_url": "https://api.github.com/repos/senecajs/seneca/forks",
    "keys_url": "https://api.github.com/repos/senecajs/seneca/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/senecajs/seneca/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/senecajs/seneca/teams",
    "hooks_url": "https://api.github.com/repos/senecajs/seneca/hooks",
    "issue_events_url": "https://api.github.com/repos/senecajs/seneca/issues/events{/number}",
    "events_url": "https://api.github.com/repos/senecajs/seneca/events",
    "assignees_url": "https://api.github.com/repos/senecajs/seneca/assignees{/user}",
    "branches_url": "https://api.github.com/repos/senecajs/seneca/branches{/branch}",
    "tags_url": "https://api.github.com/repos/senecajs/seneca/tags",
    "blobs_url": "https://api.github.com/repos/senecajs/seneca/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/senecajs/seneca/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/senecajs/seneca/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/senecajs/seneca/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/senecajs/seneca/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/senecajs/seneca/languages",
    "stargazers_url": "https://api.github.com/repos/senecajs/seneca/stargazers",
    "contributors_url": "https://api.github.com/repos/senecajs/seneca/contributors",
    "subscribers_url": "https://api.github.com/repos/senecajs/seneca/subscribers",
    "subscription_url": "https://api.github.com/repos/senecajs/seneca/subscription",
    "commits_url": "https://api.github.com/repos/senecajs/seneca/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/senecajs/seneca/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/senecajs/seneca/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/senecajs/seneca/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/senecajs/seneca/contents/{+path}",
    "compare_url": "https://api.github.com/repos/senecajs/seneca/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/senecajs/seneca/merges",
    "archive_url": "https://api.github.com/repos/senecajs/seneca/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/senecajs/seneca/downloads",
    "issues_url": "https://api.github.com/repos/senecajs/seneca/issues{/number}",
    "pulls_url": "https://api.github.com/repos/senecajs/seneca/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/senecajs/seneca/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/senecajs/seneca/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/senecajs/seneca/labels{/name}",
    "releases_url": "https://api.github.com/repos/senecajs/seneca/releases{/id}",
    "deployments_url": "https://api.github.com/repos/senecajs/seneca/deployments",
    "created_at": "2010-10-21T17:09:05Z",
    "updated_at": "2021-08-22T02:49:38Z",
    "pushed_at": "2021-04-19T19:42:49Z",
    "git_url": "git://github.com/senecajs/seneca.git",
    "ssh_url": "git@github.com:senecajs/seneca.git",
    "clone_url": "https://github.com/senecajs/seneca.git",
    "svn_url": "https://github.com/senecajs/seneca",
    "homepage": "http://senecajs.org",
    "size": Faker.datatype.number(),
    "stargazers_count": Faker.datatype.number(),
    "watchers_count": Faker.datatype.number(),
    "language": "HTML",
    "has_issues": true,
    "has_projects": true,
    "has_downloads": true,
    "has_wiki": false,
    "has_pages": false,
    "forks_count": Faker.datatype.number(),
    "mirror_url": null,
    "archived": false,
    "disabled": false,
    "open_issues_count": Faker.datatype.number(),
    "license": {
      "key": "mit",
      "name": "MIT License",
      "spdx_id": "MIT",
      "url": "https://api.github.com/licenses/mit",
      "node_id": "MDc6TGljZW5zZTEz"
    },
    "forks": Faker.datatype.number(),
    "open_issues": Faker.datatype.number(),
    "watchers": Faker.datatype.number(),
    "default_branch": "master",
    "temp_clone_token": null,
    "organization": {
      "login": req.params.owner,
      "id": Faker.datatype.number(),
      "node_id": Faker.random.alphaNumeric(24),
      "avatar_url": "https://avatars.githubusercontent.com/u/10085488?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/senecajs",
      "html_url": "https://github.com/senecajs",
      "followers_url": "https://api.github.com/users/senecajs/followers",
      "following_url": "https://api.github.com/users/senecajs/following{/other_user}",
      "gists_url": "https://api.github.com/users/senecajs/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/senecajs/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/senecajs/subscriptions",
      "organizations_url": "https://api.github.com/users/senecajs/orgs",
      "repos_url": "https://api.github.com/users/senecajs/repos",
      "events_url": "https://api.github.com/users/senecajs/events{/privacy}",
      "received_events_url": "https://api.github.com/users/senecajs/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "network_count": Faker.datatype.number(),
    "subscribers_count": Faker.datatype.number()
  })
})


app.use((req, res) => {
  return res.sendStatus(501)
})


const server = app.listen(9999, () => {
  console.log('GitHub API mock server is listening at %j',
    server.address())
})


function bodyLogger() {
  return (req, res, next) => {
    console.log()
    console.log('body:');
    console.dir(req.body, { depth: 32 })
    console.log()

    return next()
  }
}


function headersLogger() {
  return (req, res, next) => {
    console.log()
    console.log('headers:');
    console.dir(req.headers, { depth: 32 })
    console.log()

    return next()
  }
}

