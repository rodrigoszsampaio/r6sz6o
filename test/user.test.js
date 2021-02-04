const t = require('tap')
const build = require('../app')

t.test('USER', async t => {
  let token = ''
  const app = build()
  t.tearDown(() => app.close())

  t.test('/v1/login', async t => {
    let res = await app.inject({
      method: 'POST',
      url: '/v1/login',
      headers: { 'Content-type': 'application/json' },
      payload: JSON.stringify({ email: '', password: '' })
    })
    t.equal(res.statusCode, 401, 'Unauthorized returns a status code of 401 not found user')

    res = await app.inject({
      method: 'POST',
      url: '/v1/login',
      headers: { 'Content-type': 'application/json' },
      payload: JSON.stringify({ email: 'fastify', password: '123' })
    })
    t.equal(res.statusCode, 401, 'Unauthorized returns a status code of 401 wrong password')
  })

  t.test('/v1/login token', async t => {
    const res = await app.inject({
      method: 'POST',
      url: '/v1/login',
      headers: { 'Content-type': 'application/json' },
      payload: JSON.stringify({ email: 'fastify', password: 'f4st1fy' })
    })
    const payload = JSON.parse(res.payload)
    t.equal(res.statusCode, 200, 'Token returns a status code of 200')
    t.ok(payload.token)
    token = payload.token
  })

  t.test('/v1/users', async t => {
    let res = await app.inject({
      method: 'POST',
      url: '/v1/users',
      headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` },
      payload: JSON.stringify({ email: 'user@crud.me', password: '123' })
    })
    let payload = JSON.parse(res.payload)
    t.equal(res.statusCode, 201, 'POST returns a status code of 201')
    t.ok(payload.userId)

    res = await app.inject({
      method: 'POST',
      url: '/v1/users',
      headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` },
      payload: JSON.stringify({ email: 'user@crud.me', password: '123' })
    })
    payload = JSON.parse(res.payload)
    t.equal(res.statusCode, 409, 'POST returns Email already exists')

    res = await app.inject({
      method: 'GET',
      url: encodeURI('/v1/users?query={"email":"user@crud.me"}'),
      headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
    })
    const userData = JSON.parse(res.payload)
    t.equal(res.statusCode, 200, 'GET returns searched user by email')

    res = await app.inject({
      method: 'DELETE',
      url: `/v1/users/${userData.data.shift()._id}`,
      headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}`}
    })
    t.equal(res.statusCode, 204, 'DELETE returns 204')
  })
})
