import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Bookings from '../components/UserProfile/Bookings';
import { AuthContext } from "../context/AuthContext";
import '@testing-library/jest-dom';
import 'whatwg-fetch';

const bookings = [
  {
    _id: 'booking1',
    guide: {
      firstName: 'John',
      lastName: 'Doe',
      mobile: '1234567890',
    },
    Customer: 'user1',
    tourDate: '2022-05-15T00:00:00.000Z',
    tourLocation: 'New York',
    groupSize: 3,
    Status: 'Pending',
  },
  {
    _id: 'booking2',
    guide: {
      firstName: 'Jane',
      lastName: 'Doe',
      mobile: '0987654321',
    },
    Customer: 'user1',
    tourDate: '2022-05-20T00:00:00.000Z',
    tourLocation: 'Paris',
    groupSize: 2,
    Status: 'Approved',
  },
];

describe('Bookings', () => {
  it('displays the correct headings', () => {
    render(
      <AuthContext.Provider value={{ user: { _id: 'user1' } }}>
        <Bookings />
      </AuthContext.Provider>
    );

    expect(screen.getByText('My Bookings')).toBeInTheDocument();
    expect(screen.getByText('Booking Id')).toBeInTheDocument();
    expect(screen.getByText('Guide')).toBeInTheDocument();
    expect(screen.getByText('Contact no')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Group size')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('displays bookings for the current user', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(bookings),
      })
    );

    render(
      <AuthContext.Provider value={{ user: { _id: 'user1' } }}>
        <Bookings />
      </AuthContext.Provider>
    );

    await screen.findByText('booking1');
    expect(screen.getByText('booking1')).toBeInTheDocument();
    expect(screen.getByText('booking2')).toBeInTheDocument();
    expect(screen.queryByText('booking3')).not.toBeInTheDocument();
  });

  it('displays the correct booking details', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(bookings),
      })
    );

    render(
      <AuthContext.Provider value={{ user: { _id: 'user1' } }}>
        <Bookings />
      </AuthContext.Provider>
    );

    await screen.findByText('booking1');
    expect(screen.getByText('booking1')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('5/15/2022')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();

    expect(screen.getByText('booking2')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('0987654321')).toBeInTheDocument();
    expect(screen.getByText('5/20/2022')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });
});
