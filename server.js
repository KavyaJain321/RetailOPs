const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// --- Middleware ---
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// --- MongoDB Connection ---
let db;
let dataCollection;

async function connectDB() {
    if (db) return;
    if (!MONGO_URI) {
        throw new Error("MONGO_URI environment variable is not set.");
    }
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db('retailops_db'); // You can name your database
        dataCollection = db.collection('app_data');
        console.log('Connected successfully to MongoDB Atlas');

        // Check if data exists, if not, initialize it
        const count = await dataCollection.countDocuments({ _id: "main_data" });
        if (count === 0) {
            await dataCollection.insertOne({
                _id: "main_data", // Use a fixed ID for our single-document store
                orders: [],
                retailers: [],
                products: [],
                payments: [],
                notifications: [],
                templates: {
                    payment_reminder: "Dear {{retailer_name}}, your payment of ₹{{amount}} for Order #{{order_id}} is due on {{due_date}}. Please make the payment at your earliest convenience. Thank you, Shubham Trading Co.",
                    order_confirmation: "Hi {{retailer_name}}, your order #{{order_id}} for ₹{{amount}} has been confirmed. Expected delivery: {{delivery_date}}. Thank you for your business! - Shubham Trading Co.",
                    stock_alert: "Stock Alert: {{product_name}} is running low. Current stock: {{current_stock}} units."
                }
            });
            console.log("Initialized database with default structure.");
        }
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        process.exit(1);
    }
}

// --- API Endpoints ---

// GET endpoint to fetch all application data
app.get('/api/data', async (req, res) => {
    try {
        const data = await dataCollection.findOne({ _id: "main_data" });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch data", error });
    }
});

// POST endpoint to save all application data
app.post('/api/data', async (req, res) => {
    try {
        const newData = req.body;
        delete newData._id; // Remove the frontend's _id before saving
        
        await dataCollection.updateOne(
            { _id: "main_data" },
            { $set: newData },
            { upsert: true } // Creates the document if it doesn't exist
        );
        res.status(200).json({ message: 'Data saved successfully.' });
    } catch (error) {
        res.status(500).json({ message: "Failed to save data", error });
    }
});

// POST endpoint for WhatsApp (no changes needed here)
app.post('/api/whatsapp', (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({ message: 'Phone number and message are required.' });
    }

    // --- REAL-WORLD TWILIO INTEGRATION ---
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

    // Check if Twilio credentials are configured in the .env file
    if (!accountSid || !authToken || !fromNumber || accountSid === "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
        const errorMessage = "Twilio credentials are not configured in the .env file. Falling back to simulation.";
        console.error(errorMessage);
        console.log('--- SIMULATING WHATSAPP ---');
        console.log(`To: ${number}`);
        console.log(`Message: ${message}`);
        console.log('---------------------------');
        // Still return a success to the frontend, but with a warning.
        return res.status(200).json({ message: "Simulation successful. Server is not configured for live messages." });
    }

    const client = twilio(accountSid, authToken);

    client.messages.create({
        body: message,
        from: fromNumber, // Your Twilio WhatsApp number from .env
        to: `whatsapp:${number}` // The recipient's number from the frontend request
    }).then(messageResponse => {
        console.log('Message sent successfully. SID:', messageResponse.sid);
        res.status(200).json({ message: `Message successfully sent to ${number}.` });
    }).catch(err => {
        console.error('Failed to send WhatsApp message via Twilio:', err);
        // Provide a more detailed error message to the frontend if possible
        res.status(500).json({ message: 'Failed to send WhatsApp message.', error: err.message });
    });
});

// --- Server Initialization ---
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`RetailOps server is running on port ${PORT}`);
    });
});