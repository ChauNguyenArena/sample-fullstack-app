import Home from './pages/Home'

import Country from './pages/Countries'
import CountryNew from './pages/Countries/new'
import CountryDetail from './pages/Countries/[id]'

import Customer from './pages/Customers'
import CustomerNew from './pages/Customers/new'
import CustomerDetail from './pages/Customers/[id]'

import Vendor from './pages/Vendors'
import VendorNew from './pages/Vendors/new'
import VendorDetail from './pages/Vendors/[id]'

import Product from './pages/Products'
import ProductNew from './pages/Products/new'
import ProductDetail from './pages/Products/[id]'

export default [
  {
    path: '/',
    title: 'Home',
    exact: true,
    component: Home,
    childrens: [],
  },
  {
    path: '/countries',
    title: 'Countries',
    exact: true,
    component: Country,
    childrens: [
      {
        path: '/countries/new',
        title: 'New country',
        exact: true,
        component: CountryNew,
        childrens: [],
      },
      {
        path: '/countries/:id',
        title: 'Edit country',
        exact: true,
        component: CountryDetail,
        childrens: [],
      },
    ],
  },
  {
    path: '/customers',
    title: 'Customers',
    exact: true,
    component: Customer,
    childrens: [
      {
        path: '/customers/new',
        title: 'New customer',
        exact: true,
        component: CustomerNew,
        childrens: [],
      },
      {
        path: '/customers/:id',
        title: 'Edit customer',
        exact: true,
        component: CustomerDetail,
        childrens: [],
      },
    ],
  },
  {
    path: '/vendors',
    title: 'Vendors',
    exact: true,
    component: Vendor,
    childrens: [
      {
        path: '/vendors/new',
        title: 'New Vendor',
        exact: true,
        component: VendorNew,
        childrens: [],
      },
      {
        path: '/vendors/:id',
        title: 'Edit Vendor',
        exact: true,
        component: VendorDetail,
        childrens: [],
      },
    ],
  },
  {
    path: '/products',
    title: 'Products',
    exact: true,
    component: Product,
    childrens: [
      {
        path: '/products/new',
        title: 'Products Vendor',
        exact: true,
        component: ProductNew,
        childrens: [],
      },
      {
        path: '/products/:id',
        title: 'Edit Product',
        exact: true,
        component: ProductDetail,
        childrens: [],
      },
    ],
  },
]
