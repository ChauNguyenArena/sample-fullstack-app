import React, { useEffect } from 'react'
import { Page, Toast } from '@shopify/polaris'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import routes from './routes'
import LoadingPage from './components/LoadingPage'

function App(props) {
  const { actions, appLoading, notify } = props

  useEffect(() => {
    console.log('redux :>> ', props)
  }, [props])

  useEffect(() => {
    if (!props.countries?.length) {
      actions.getCountries()
    }
  }, [])

  const toastMarkup = notify?.show && (
    <Toast
      error={notify.error}
      content={notify.message}
      onDismiss={() => {
        if (notify.onDismiss) notify.onDismiss()
        actions.hideNotify()
      }}
      duration={5000}
    />
  )

  return (
    <Layout {...props}>
      <Page>
        <Routes>
          {/* Parent routes */}
          {routes.map((item, index) => (
            <Route key={index} path={item.path} element={<item.component {...props} />} />
          ))}

          {/* Children routes */}
          {routes.map((item, index) =>
            item.childrens.length > 0
              ? item.childrens.map((_item, _index) => (
                  <Route key={_index} path={_item.path} element={<_item.component {...props} />} />
                ))
              : null
          )}
        </Routes>
      </Page>

      {appLoading.loading && !appLoading.action && <LoadingPage />}

      {toastMarkup}
    </Layout>
  )
}

export default App
