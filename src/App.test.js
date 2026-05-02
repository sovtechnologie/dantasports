import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { store } from './redux/store';

jest.mock('./routes/AppRoutes', () => () => <main>Routes ready</main>);

jest.mock('./utils/getCityName', () => ({
  getCityName: () => Promise.resolve(''),
}));

jest.mock('./utils/locationSearch', () => ({
  googleMapsLoader: {
    importLibrary: () => Promise.resolve({}),
  },
}));

test('renders app navigation', () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByRole('button', { name: /get the app/i })).toBeInTheDocument();
});
