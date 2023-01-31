import './App.css';
import OrdersTable from './components/OrdersTable';
import OrdersNavigationBar from './components/OrdersNavigationBar';
import OrderForm from './components/OrderForm';

const App = () => {
  return (
    <div className="App">
      <h1>Order It!</h1>
      <p>The app for managing all your e-commerce orders.</p>
      <OrdersNavigationBar />
      <OrderForm />
      <OrdersTable />
    </div>
  );
}

export default App;
