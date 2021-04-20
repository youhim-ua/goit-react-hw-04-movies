import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import Navigation from './components/Navigation';
import Container from './components/Container';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviePage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "MoviePage" */),
);
const MovieDetailsPage = lazy(() =>
  import('./views/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */),
);
const NotFound = lazy(() =>
  import('./components/NotFound' /* webpackChunkName: "NotFound" */),
);

class App extends Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
        <Container>
          <Switch>
            <Route exact path={routes.homePage} exact component={HomePage} />
            <Route
              path={routes.movieDetailsPage}
              component={MovieDetailsPage}
            />
            <Route path={routes.movieDetails} component={MoviePage} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Suspense>
    );
  }
}

export default App;
