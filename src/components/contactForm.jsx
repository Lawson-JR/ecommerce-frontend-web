import React from "react";
import { useForm, ValidationError } from '@formspree/react'; // Make sure this import is correct
import { FaPaperPlane } from 'react-icons/fa'; // Import FaPaperPlane if not already imported

function ContactForm() {
    const [state, handleSubmit] = useForm("mdkonkdl");  // Replace "yourFormspreeKey" with your actual Formspree key
    if (state.succeeded) {
        return <p>Thanks for reaching out!</p>;
    }
    return (
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your email"
          className="w-full p-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500"
          required
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
        />
        <textarea
          id="message"
          name="message"
          cols={40}
          rows={4}
          placeholder="Comment here..."
          className="w-full p-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500"
          required
        />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
        />
        <button
          type="submit"
          disabled={state.submitting}
          className="flex items-center justify-center w-full bg-indigo-400 text-gray-900 font-semibold py-2 rounded-lg hover:bg-indigo-500 transition duration-300"
        >
          Leave a message <FaPaperPlane className="ml-2" />
        </button>
      </form>
    );
}

// Export ContactForm as default
export default ContactForm;