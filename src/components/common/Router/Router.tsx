import { FC, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { withSuspense } from '@/hoc/withSuspense';
import { withPrivate } from '@/hoc/withPrivate';
import Layout from '@/components/common/Layout';
import Loader from '@/components/common/Loader';

const Login = lazy(() => import('@/components/pages/Login'));
const Products = withSuspense(withPrivate(lazy(() => import('@/components/pages/Products'))));
const Product = withSuspense(withPrivate(lazy(() => import('@/components/pages/Product'))));
const Categories = withSuspense(withPrivate(lazy(() => import('@/components/pages/Categories'))));
const Category = withSuspense(withPrivate(lazy(() => import('@/components/pages/Category'))));
const Properties = withSuspense(withPrivate(lazy(() => import('@/components/pages/Properties'))));
const Orders = withSuspense(withPrivate(lazy(() => import('@/components/pages/Orders'))));

const Router: FC = () => (
  <Routes>
    <Route
      path="login"
      element={(
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      )}
    />

    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/products" />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:slug" element={<Product />} />
      <Route path="categories" element={<Categories />} />
      <Route path="categories/:slug" element={<Category />} />
      <Route path="properties" element={<Properties />} />
      <Route path="orders" element={<Orders />} />
      <Route path="*" element={<Navigate to="/products" />} />
    </Route>
  </Routes>
);

export default Router;
