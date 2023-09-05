import Header from '../UI/Header';
import TicketsList from '../TicketsList';

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <TicketsList />
        </div>
      </main>
    </>
  );
}

export default App;
