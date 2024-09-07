export const emailTemplates = {
    signup: {
        subject: 'Verify Your Email - Unleash Your Creativity with ANVIL AI',
        html: (code: string) => `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                <div style="text-align: center;">
                    <img src="https://anvilai.s3.us-east-2.amazonaws.com/emailCode.png" alt="Anvil AI Logo" style="max-width: 100%; height: auto; border-radius: 10px; margin-bottom: 20px;">
                </div>
                <h1 style="color: #1E90FF; text-align: center;">Welcome to ANVIL AI!</h1>
                <p style="font-size: 16px; color: #333;">Thank you for joining ANVIL AI, where your imagination is forged into reality.</p>
                <p style="font-size: 16px; color: #333;">Before we can start crafting your 3D models, we need to verify your email address. This step ensures that your account is secure and ready to unleash its full potential.</p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #1E90FF; background-color: #f9f9f9; padding: 10px 20px; border-radius: 5px;">${code}</span>
                </div>
                
                <p style="font-size: 16px; color: #333;">At ANVIL AI, we believe that creativity has no limits. With your verified account, you'll have the power to shape your imagination into extraordinary 3D creations.</p>
                
                <h2 style="color: #1E90FF;">Why Verify?</h2>
                <ul style="font-size: 16px; color: #333; padding-left: 20px;">
                    <li>Secure Your Account: Keep your ideas safe with the highest security standards.</li>
                    <li>Access Exclusive Features: Unlock tools that push the boundaries of 3D modeling.</li>
                    <li>Stay Connected: Be the first to know about updates, tips, and new features.</li>
                </ul>
                
                <p style="font-size: 16px; color: #333;">If you didn’t sign up for ANVIL AI, you can safely ignore this email.</p>
                
                <p style="font-size: 16px; color: #333;">Forge On,<br>The ANVIL AI Team</p>
            </div>
        `,
    },
    resetPassword: {
        subject: 'Reset Your Password - Rekindle Your Creative Spark with ANVIL AI',
        html: (code: string) => `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                <div style="text-align: center;">
                    <img src="https://anvilai.s3.us-east-2.amazonaws.com/emailCode.png" alt="Anvil AI Logo" style="max-width: 100%; height: auto; border-radius: 10px; margin-bottom: 20px;">
                </div>
                <h1 style="color: #1E90FF; text-align: center;">Reset Your Password</h1>
                <p style="font-size: 16px; color: #333;">We heard that you've lost access to your ANVIL AI account. Don’t worry; even the most creative minds need a little help sometimes. Let’s get you back on track so you can continue crafting your 3D dreams.</p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #1E90FF; background-color: #f9f9f9; padding: 10px 20px; border-radius: 5px;">${code}</span>
                </div>
                
                <p style="font-size: 16px; color: #333;">Didn’t request a password reset?</p>
                <p style="font-size: 16px; color: #333;">If you didn’t ask to reset your password, you can safely ignore this email. Rest assured; your account remains secure.</p>
                
                <h2 style="color: #1E90FF;">Tips for a Strong Password:</h2>
                <ul style="font-size: 16px; color: #333; padding-left: 20px;">
                    <li>Use a mix of uppercase and lowercase letters.</li>
                    <li>Include numbers and symbols.</li>
                    <li>Avoid using easily guessed words like "password" or your name.</li>
                </ul>
                
                <p style="font-size: 16px; color: #333;">Forge On,<br>The ANVIL AI Team</p>
            </div>
        `,
    },
};
