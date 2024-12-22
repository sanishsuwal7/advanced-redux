import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/car-action';

let isInitial = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {
    // const sendCartData = async () => {
    //   dispatch(uiActions.showNotification({
    //     status: 'pending',
    //     title: 'Sending...',
    //     message: 'Sending cart data!'
    //   }))
    //     const response  = await fetch(
    //       'https://redux-df117-default-rtdb.firebaseio.com/cart.json',
    //       {
    //         method: 'PUT',
    //         body: JSON.stringify(cart)
    //       }
    //     );

    //     if(!response.ok) {
    //       throw new Error('Sending cart data failed');
    //     }

    //     dispatch(uiActions.showNotification({
    //       status: 'success',
    //       title: 'Success...',
    //       message: 'Sent cart data!'
    //     }))

    //     const responseData = await response.json();

    //   };

      
      // sendCartData().catch((error) => {
      //   dispatch(uiActions.showNotification({
      //     status: 'error',
      //     title: 'Error...',
      //     message: 'Sending cart data failed!'
      //   }))
      // })

    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));

  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && (
        <Notification 
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
          {showCart && <Cart />}
          <Products />
      </Layout>
    </Fragment>
    
  );
}

export default App;
