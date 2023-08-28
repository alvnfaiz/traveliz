import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import komponen yang akan ditampilkan di setiap rute
import Register from '@/pages/auth/Register';
// import About from './About';
// import Contact from './Contact';

function App() {
  return (
    <Router>
      <div>
        {/* Buat navigasi atau komponen lain di atas routing */}
        <Switch>
          <Route path="/register" component={Register} />
          {/* <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} /> */}
          {/* Tambahkan rute lain di sini */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
