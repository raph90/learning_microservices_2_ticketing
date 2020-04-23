# Project 2: Ticketing

## Services
- Auth
- Tickets
  - Ticket creation and editing
- Orders
  - Order creation
- Expiration
  - Cancels orders after 15 mins
- Payments
  - Handles credit card payments

## Structure

There will be a common npm library that we use to define our APIs.

We will use NATS Streaming Server as an event bus.

The front-end will be Next.js