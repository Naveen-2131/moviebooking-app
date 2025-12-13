import { useState, useEffect } from 'react';
import api from '../services/api';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await api.get('/bookings/mybookings');
                setBookings(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
            <div className="space-y-4">
                {bookings.map(booking => (
                    <div key={booking._id} className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex justify-between items-center">
                        <div className="flex gap-4">
                            <img src={booking.showtime.movie.posterUrl} alt="poster" className="w-16 h-24 object-cover rounded-md" />
                            <div>
                                <h3 className="text-xl font-bold">{booking.showtime.movie.title}</h3>
                                <p className="text-gray-400">{booking.showtime.theater.name}</p>
                                <p className="text-sm text-gray-500">{new Date(booking.showtime.startTime).toLocaleString()}</p>
                                <div className="mt-2 flex gap-2">
                                    {booking.seats.map((seat, i) => (
                                        <span key={i} className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">
                                            Row {String.fromCharCode(65 + seat.row)}{seat.col + 1}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-primary">${booking.totalPrice}</div>
                            <div className="text-sm text-green-500 font-medium uppercase tracking-wide mt-1">Confirmed</div>
                            <div className="text-xs text-gray-600 mt-1">ID: {booking._id.slice(-6)}</div>
                        </div>
                    </div>
                ))}
                {bookings.length === 0 && <p className="text-gray-500">No bookings found.</p>}
            </div>
            <div className="mt-8 text-center">
                <a href="/" className="text-primary hover:text-red-400 font-bold">← Back to Home</a>
            </div>
        </div>
    );
};

export default MyBookings;
