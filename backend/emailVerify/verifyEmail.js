import 'dotenv/config'

export const verifyEmail = async (token, email) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

    try {
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: { name: 'Ekart', email: process.env.MAIL_USER },
                to: [{ email }],
                subject: 'Email Verification',
                htmlContent: `<p>Hi! There, You have recently visited our website and entered your email.</p>
                    <p>Please follow the given link to verify your email:</p>
                    <p><a href="${frontendUrl}/verify/${token}">${frontendUrl}/verify/${token}</a></p>
                    <p>Thanks</p>`
            })
        })

        const data = await res.json()
        if (!res.ok) {
            console.error('Error sending verification email:', data)
            return
        }
        console.log('Email Sent Successfully:', data)
    } catch (error) {
        console.error('Error sending verification email:', error)
    }
}