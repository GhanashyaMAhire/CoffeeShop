import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

const emailTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; margin-bottom: 30px; }
    .content { margin-bottom: 30px; }
    .footer { text-align: center; font-size: 14px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="color: #8B4513;">Bean & Brew</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Bean & Brew Coffee Co. All rights reserved.</p>
      <p>123 Coffee Street, Portland, OR 97201</p>
    </div>
  </div>
</body>
</html>
`;

export const sendWelcomeEmail = async (email: string) => {
  try {
    await resend.emails.send({
      from: 'Bean & Brew <noreply@beanandbrew.com>',
      to: email,
      subject: 'Welcome to Bean & Brew!',
      html: emailTemplate(`
        <h2>Welcome to Bean & Brew!</h2>
        <p>Thank you for creating an account with us. We're excited to have you join our coffee-loving community!</p>
        <p>Here's what you can do with your account:</p>
        <ul>
          <li>Track your orders</li>
          <li>Save your favorite products</li>
          <li>Get personalized recommendations</li>
          <li>Access exclusive offers</li>
        </ul>
        <p>Start exploring our selection of premium coffees and teas today.</p>
        <p><a href="https://beanandbrew.com/products" style="color: #8B4513;">Shop Now</a></p>
      `)
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
};

export const sendOrderConfirmationEmail = async (email: string, orderId: string) => {
  try {
    await resend.emails.send({
      from: 'Bean & Brew <noreply@beanandbrew.com>',
      to: email,
      subject: `Order Confirmation #${orderId} - Bean & Brew`,
      html: emailTemplate(`
        <h2>Thank You for Your Order!</h2>
        <p>Your order (${orderId}) has been confirmed and is being processed.</p>
        <p>Order Details:</p>
        <ul>
          <li>Order Number: ${orderId}</li>
          <li>Order Date: ${new Date().toLocaleDateString()}</li>
        </ul>
        <p>We'll send you another email when your order ships.</p>
        <p>You can track your order status by visiting your account dashboard:</p>
        <p><a href="https://beanandbrew.com/account/orders" style="color: #8B4513;">View Order Status</a></p>
      `)
    });
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    throw error;
  }
};

export const sendNewsletterConfirmationEmail = async (email: string) => {
  try {
    await resend.emails.send({
      from: 'Bean & Brew <noreply@beanandbrew.com>',
      to: email,
      subject: 'Welcome to Bean & Brew Newsletter!',
      html: emailTemplate(`
        <h2>Welcome to Our Newsletter!</h2>
        <p>Thank you for subscribing to the Bean & Brew newsletter.</p>
        <p>You'll now receive:</p>
        <ul>
          <li>New product announcements</li>
          <li>Exclusive discounts</li>
          <li>Brewing tips and recipes</li>
          <li>Coffee origin stories</li>
        </ul>
        <p>As a welcome gift, enjoy 10% off your next purchase with code: <strong>WELCOME10</strong></p>
        <p><a href="https://beanandbrew.com/products" style="color: #8B4513;">Shop Now</a></p>
      `)
    });
  } catch (error) {
    console.error('Failed to send newsletter confirmation email:', error);
    throw error;
  }
};

export const sendContactFormEmail = async (email: string, name: string, subject: string, message: string) => {
  try {
    await resend.emails.send({
      from: 'Bean & Brew <noreply@beanandbrew.com>',
      to: 'support@beanandbrew.com',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: emailTemplate(`
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `)
    });

    // Send confirmation to the user
    await resend.emails.send({
      from: 'Bean & Brew <noreply@beanandbrew.com>',
      to: email,
      subject: 'We received your message - Bean & Brew',
      html: emailTemplate(`
        <h2>We Got Your Message!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for contacting Bean & Brew. We've received your message and will get back to you within 24-48 hours.</p>
        <p><strong>Your message details:</strong></p>
        <p>Subject: ${subject}</p>
        <p>Message: ${message}</p>
      `)
    });
  } catch (error) {
    console.error('Failed to send contact form email:', error);
    throw error;
  }
};