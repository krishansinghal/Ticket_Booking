import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TicketBookingABI from '../artifacts/TicketBooking.json';
import './TicketBooking.css';  

const TicketBooking = () => {
    const [availableSeats, setAvailableSeats] = useState([]);
    const [myTickets, setMyTickets] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [error, setError] = useState('');

    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address

    useEffect(() => {
        const loadBlockchainData = async () => {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const ticketBookingContract = new ethers.Contract(contractAddress, TicketBookingABI.abi, signer);
                setContract(ticketBookingContract);
                const accounts = await provider.listAccounts();
                setAccount(accounts[0]);
                fetchAvailableSeats(ticketBookingContract);
                fetchMyTickets(ticketBookingContract, accounts[0]);
            }
        };
        loadBlockchainData();
    }, []);

    const fetchAvailableSeats = async (contract) => {
        const seats = await contract.showAvailableSeats();
        setAvailableSeats(seats);
    };

    const fetchMyTickets = async (contract, account) => {
        const tickets = await contract.myTickets();
        setMyTickets(tickets);
    };

    const bookSeats = async () => {
        if (contract && selectedSeats.length > 0) {
            if (selectedSeats.length > 4) {
                alert("You can only book a maximum of 4 seats at a time.");
                return;
            }

            try {
                // Book the selected seats
                const tx = await contract.bookSeats(selectedSeats);
                
                // Wait for the transaction to be confirmed
                await tx.wait();
    
                // After booking, update the UI
                fetchAvailableSeats(contract);
                fetchMyTickets(contract, account);
    
                // Clear selected seats after booking
                setSelectedSeats([]);
    
            } catch (error) {
                console.error("Error booking seats:", error);
            }
        } else {
            alert("Please select at least one seat before booking.");
        }
    };

    return (
        <div className="ticket-booking-container">
            <h1>Ticket Booking DApp</h1>
            {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
            <h2>Available Seats</h2>
            <div className="available-seats">
                {availableSeats.length === 0 ? ( // Check if there are available seats
                    <p>No available seats at the moment.</p> // Message if no seats are available
                ) : (
                    <ul>
                        {availableSeats.map((seat) => (
                            <li key={seat}>
                                <input
                                    type="checkbox"
                                    value={seat}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            if (selectedSeats.length < 4) {
                                                setSelectedSeats([...selectedSeats, seat]);
                                                setError(''); // Clear error message if selection is valid
                                            } else {
                                                setError('You can only select up to 4 seats.'); // Set error message
                                                e.target.checked = false; // Uncheck the checkbox if limit reached
                                            }
                                        } else {
                                            setSelectedSeats(selectedSeats.filter(s => s !== seat));
                                            setError(''); // Clear error message when deselecting
                                        }
                                    }}
                                />
                                {`Seat ${seat}`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button className="book-button" onClick={bookSeats}>
                Book Seats
            </button>

            <h2>My Tickets</h2>
            <div className="my-tickets">
                <ul>
                    {myTickets.map((ticket) => (
                        <li key={ticket}>{`Seat ${ticket}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TicketBooking;
