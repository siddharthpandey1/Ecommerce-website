import 'dotenv/config'

export const sendOTPMail = async (otp, email) => {
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
                subject: 'Password Reset OTP',
                htmlContent: `<p>Your OTP for password reset is: <b>${otp}</b></p>`
            })
        })

        const data = await res.json()
        if (!res.ok) {
            console.error('Error sending OTP email:', data)
            return
        }
        console.log('OTP Sent Successfully:', data)
    } catch (error) {
        console.error('Error sending OTP email:', error)
    }
}