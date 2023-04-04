const apiCaller = async (endpoint, method, data) => {
  let res = await fetch('http://localhost:5000/api/' + endpoint, {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  }).then((response) => response.json())
  if (!res.success) throw res.error
  return res.data
}

const getAll = async (uid) => {
  let res = null,
    items = [],
    page = 1

  while (page >= 1) {
    res = await apiCaller(`${uid}?page=${page}&limit=100`)
    items = items.concat(res.items)

    page = res.page < res.totalPages ? page + 1 : -1
  }

  return items
}

const initCountries = async (uid) => {
  let items = []

  console.log(`👉 Init ${uid}`)

  console.log(`delete ${uid}`)
  items = await getAll(uid)
  for (const item of items) {
    apiCaller(`${uid}/${item.id}`, 'DELETE')
      .then((data) => console.log(`\t ${uid} ${item.name} deleted`))
      .catch((err) => console.log(`\t delete ${uid} ${item.id} failed:`, err.message))
  }

  console.log(`create ${uid}`)
  items = window.data.countries
  for (const item of items) {
    apiCaller(uid, 'POST', item)
      .then((data) => console.log(`\t ${uid} ${item.name} created`))
      .catch((err) => console.log(`\t create ${uid} ${item.name} failed:`, err.message))
  }
}

const initUsers = async (uid) => {
  let items = []

  console.log(`👉 Init ${uid}`)

  console.log(`delete ${uid}`)
  items = await getAll(uid)
  for (const item of items) {
    apiCaller(`${uid}/${item.id}`, 'DELETE')
      .then((data) => console.log(`\t ${uid} ${item.email} deleted`))
      .catch((err) => console.log(`\t delete ${uid} ${item.email} failed:`, err.message))
  }

  let countries = await apiCaller('countries').then((res) => res.items)

  console.log(`create ${uid}`)
  items = window.data.users
  for (const item of items) {
    apiCaller(uid, 'POST', {
      ...item,
      countryId: countries[Math.floor(Math.random() * countries.length)].id,
    })
      .then((data) => console.log(`\t ${uid} ${item.email} created`))
      .catch((err) => console.log(`\t create ${uid} ${item.email} failed:`, err.message))
  }
}

window.mockup = async () => {
  await initCountries(`countries`)
  await initUsers(`users`)
  await initUsers(`customers`)
}
