// test/TicketBooking.test.js
const { expect } = require("chai");

describe("TicketBooking", function () {
    let TicketBooking;
    let ticketBooking;
    let owner;

    beforeEach(async function () {
        TicketBooking = await ethers.getContractFactory("TicketBooking");
        [owner] = await ethers.getSigners();
        ticketBooking = await TicketBooking.deploy();
        await ticketBooking.deployed();
    });

    it("should book seats correctly", async function () {
        await ticketBooking.bookSeats([1, 2, 3]);
        expect(await ticketBooking.checkAvailability(1)).to.be.false;
        expect(await ticketBooking.checkAvailability(2)).to.be.false;
        expect(await ticketBooking.checkAvailability(3)).to.be.false;
    });

    it("should show available seats", async function () {
        await ticketBooking.bookSeats([1, 2]);
        const availableSeats = await ticketBooking.showAvailableSeats();
        expect(availableSeats).to.deep.equal([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    });

    it("should check seat availability", async function () {
        await ticketBooking.bookSeats([1]);
        expect(await ticketBooking.checkAvailability(1)).to.be.false;
        expect(await ticketBooking.checkAvailability(2)).to.be.true;
    });

    it("should return booked tickets for user", async function () {
        await ticketBooking.bookSeats([1, 2]);
        const tickets = await ticketBooking.myTickets();
        expect(tickets).to.deep.equal([1, 2]);
    });

    it("should not allow booking more than 4 tickets", async function () {
        await expect(ticketBooking.bookSeats([1, 2, 3, 4, 5])).to.be.revertedWith("Cannot book more than 4 tickets");
    });
});
