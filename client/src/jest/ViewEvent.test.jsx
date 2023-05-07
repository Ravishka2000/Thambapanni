/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import ViewEvents from "../../src/components/Events/ViewEvents"

jest.mock('axios');

describe('ViewEvents', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: [
                {
                    _id: '1',
                    name: 'Event 1',
                    description: 'Event 1 description',
                    date: '2023-05-10T00:00:00.000Z',
                    location: 'Event 1 location',
                    organizer: {
                        firstName: 'John',
                        lastName: 'Doe',
                    },
                },
                {
                    _id: '2',
                    name: 'Event 2',
                    description: 'Event 2 description',
                    date: '2023-05-15T00:00:00.000Z',
                    location: 'Event 2 location',
                    organizer: {
                        firstName: 'Jane',
                        lastName: 'Smith',
                    },
                },
            ],
        });
    });

    it('renders event cards', async () => {
        render(<ViewEvents />);

        await waitFor(() => {
            expect(screen.getByText('Events Organized by Us')).toBeInTheDocument();
        });

        expect(screen.getByText('Event 1')).toBeInTheDocument();
        expect(screen.getByText('Event 2')).toBeInTheDocument();
    });
    
});
