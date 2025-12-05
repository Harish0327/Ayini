# Razorpay Integration Setup

## Installation Commands
```bash
npm install razorpay
```

## Environment Variables (.env)
```
RAZORPAY_KEY_ID=rzp_test_RhAFqkd9RdpZBF
RAZORPAY_KEY_SECRET=qjVHZ6ybG6y0GItEI7tRJnVH
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RhAFqkd9RdpZBF
```

## API Routes Created

### 1. /api/create-order
- Creates Razorpay order
- Converts amount to paise
- Returns order_id and key_id

### 2. /api/verify-payment
- Verifies payment signature using HMAC SHA256
- Validates: `hmac_sha256(order_id + "|" + payment_id, key_secret)`
- Returns success/failure status

## Frontend Integration

### Features Implemented:
✅ Razorpay Checkout script loading
✅ Order creation API call
✅ Payment signature verification
✅ Success/failure handling
✅ Payment cancellation handling
✅ Error handling and user feedback

## Test Payment Flow

1. Add products to cart
2. Click "Proceed to Checkout"
3. Razorpay checkout opens
4. Use test card: 4111 1111 1111 1111
5. Any CVV and future date
6. Payment processes and verifies
7. Redirects to success page

## Production Setup

1. Replace test keys with live keys
2. Update webhook endpoints
3. Add proper error logging
4. Implement order storage in database
5. Add email notifications

## Security Features

✅ Server-side signature verification
✅ HMAC SHA256 validation
✅ Environment variable protection
✅ Error handling without exposing secrets