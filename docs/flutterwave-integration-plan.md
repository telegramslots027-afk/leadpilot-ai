# Flutterwave payment integration plan

Status: provider selected; live checkout is NOT enabled.

## Intended first payment flow

Use Flutterwave Standard hosted checkout. The customer enters their name, email and selected written scope on the Ryan Corp site. The server creates a unique payment reference and asks Flutterwave for a hosted checkout URL. The customer pays on Flutterwave's hosted page and returns to Ryan Corp.

Never trust the browser redirect as proof of payment. The server must verify the transaction with Flutterwave and confirm:
- the transaction is successful;
- the Flutterwave transaction reference matches the server-created order;
- the paid amount is at least the expected amount;
- the currency matches the order;
- the order is still unpaid and belongs to that customer.

Only then may the order be marked paid and delivery onboarding begin. Webhooks must have their signature verified and be idempotent. Do not store card numbers or CVVs.

## Launch gates

1. Ryan Corp completes Flutterwave Cameroon onboarding and receives approval for international card payments.
2. Confirm settlement currency, payout account, supported customer currencies, fees, refunds and dispute process with Flutterwave.
3. Add server-only environment variables on the production Node.js host:
   - FLW_SECRET_KEY
   - FLW_WEBHOOK_SECRET_HASH (only if required by the configured webhook scheme)
   - FLW_CURRENCY (set only after account confirmation)
   - APP_BASE_URL
4. Create a durable payment-orders table with unique tx_ref, customer/order association, amount, currency, status and timestamps. Enforce server-side access controls.
5. Implement hosted checkout creation, transaction verification and signed webhook handling.
6. Test success, cancellation, declined card, duplicate webhook, wrong amount, wrong currency, replay and refund scenarios in Flutterwave test mode.
7. Enable live checkout only after KYC approval and a successful small live test payment/refund.

## Commercial guardrails

- Initial offer should be a one-time setup/pilot invoice with clearly written deliverables and acceptance criteria. Do not label it a recurring subscription until recurring billing and cancellation handling are implemented and tested.
- Do not collect payment for the current static FrontDesk prototype. It is a demonstration only and is not yet connected to live AI, persistent lead storage, notifications, customer accounts or business integrations.
- Do not promise a delivery date until scope, customer access, and required integrations have been checked.
- Do not put secret keys in GitHub, browser code, public environment variables, emails or chat.
- If Flutterwave does not approve the account or international card collection, keep checkout disabled and offer an invoice/manual alternative only after verifying a lawful, available receiving method.

## Official references

- Flutterwave Standard hosted checkout: https://developer.flutterwave.com/docs/collections-inflow/flutterwave-standard
- Transaction verification: https://developer.flutterwave.com/docs/transaction-verification
- Webhooks: https://developer.flutterwave.com/docs/webhooks
- Cameroon onboarding: https://flutterwave.com/gb/support/onboarding/onboarding-requirements-for-using-flutterwave-in-cameroon
- International card acceptance: https://flutterwave.com/us/support/payment-methods/pay-with-card
