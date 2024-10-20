// App.js
import Header from './components/Header';
import './App.css';
import Theme from './components/Theme'; 

function App() {
  return (
    <>
      <Header />
      <Theme />
      
      <div style={{ height: '1500px', background: '#f8f9fa', paddingTop: '60px' }}> {/* Placeholder content with padding */}
        <h1>Welcome to My App!</h1>
        <p>Scroll down to see the header stick at the top.</p>
      </div>
    </>
  );
}

export default App;
