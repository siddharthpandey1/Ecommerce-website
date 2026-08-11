import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-200 py-10'>
      <div className='max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>

        {/* info */}
        <div>
          <Link to='/'>
            <img src='/Ekart.png' alt='' className='w-32' />
          </Link>

          <p className='mt-2 text-sm'>
            Powering Your World with the Best in Electronics.
          </p>

          <p className='mt-2 text-sm'>
            123 Electronics St, Style City, NY 10001
          </p>

          <p className='text-sm'>
            Email: support@Zaptro.com
          </p>

          <p className='text-sm'>
            Phone: (123) 456-7890
          </p>
        </div>

        {/* customer service link */}
        <div>
          <h3 className='text-xl font-semibold'>Customer Service</h3>

          <ul className='mt-2 text-sm space-y-2'>
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>

        {/* social media links */}
        <div>
          <h3 className='text-xl font-semibold'>Follow Us</h3>

          <div className='flex space-x-4 mt-2 text-lg'>
            <FaFacebook />
            <FaInstagram />
            <FaTwitterSquare />
            <FaPinterest />
          </div>
        </div>

        {/* newsletter subscription */}
        <div>
          <h3 className='text-xl font-semibold'>
            Stay in the Loop
          </h3>

          <p className='mt-2 text-sm'>
            Subscribe to get special offers, free giveaways, and more
          </p>

          <form action='' className='mt-4 flex flex-col sm:flex-row'>
            <input
              type='email'
              placeholder='Your email address'
              className='w-full p-2 rounded-md sm:rounded-l-md sm:rounded-r-none bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-2 sm:mb-0'
            />

            <button
              type='submit'
              className='bg-pink-600 text-white px-4 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-red-700'
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* bottom section */}
      <div className='mt-8 border-t border-gray-700 pt-6 text-center text-sm px-4'>
        <p>
          &copy; {new Date().getFullYear()}{' '}
          <span className='text-pink-600'>EKart</span>.
          All rights reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer