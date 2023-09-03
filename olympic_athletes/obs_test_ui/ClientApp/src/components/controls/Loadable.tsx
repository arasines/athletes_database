import { Suspense } from 'react';
import Loader from './Loader';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);
export default Loadable;
