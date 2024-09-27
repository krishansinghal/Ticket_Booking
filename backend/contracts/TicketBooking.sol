// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TicketBooking {
    uint8 public constant MAX_SEATS = 20;
    uint8 public constant MAX_TICKETS_PER_USER = 4;
    
    address public owner;
    mapping(uint8 => bool) public seats; // Maps seat number to availability
    mapping(address => uint8[]) public userTickets; // Maps user address to booked tickets

    constructor() {
        owner = msg.sender;
        // Initialize all seats as available
        for (uint8 i = 1; i <= MAX_SEATS; i++) {
            seats[i] = true;
        }
    }

    // To book seats
    function bookSeats(uint8[] calldata seatNumbers) external {
        require(seatNumbers.length <= MAX_TICKETS_PER_USER, "Cannot book more than 4 tickets");
        
        for (uint8 i = 0; i < seatNumbers.length; i++) {
            require(seatNumbers[i] > 0 && seatNumbers[i] <= MAX_SEATS, "Invalid seat number");
            require(seats[seatNumbers[i]], "Seat not available");
            
            seats[seatNumbers[i]] = false; // Mark seat as booked
            userTickets[msg.sender].push(seatNumbers[i]); // Assign booked ticket to user
        }
    }

    // To get available seats
    function showAvailableSeats() external view returns (uint8[] memory) {
        uint8[] memory availableSeats = new uint8[](MAX_SEATS);
        uint8 count = 0;

        for (uint8 i = 1; i <= MAX_SEATS; i++) {
            if (seats[i]) {
                availableSeats[count] = i;
                count++;
            }
        }

        // Resize the array to the actual number of available seats
        assembly {
            mstore(availableSeats, count)
        }

        return availableSeats;
    }

    // To check availability of a seat
    function checkAvailability(uint8 seatNumber) external view returns (bool) {
        require(seatNumber > 0 && seatNumber <= MAX_SEATS, "Invalid seat number");
        return seats[seatNumber];
    }

    // To check tickets booked by the user
    function myTickets() external view returns (uint8[] memory) {
        return userTickets[msg.sender];
    }
}
