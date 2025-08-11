import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The booking process was incredibly smooth and the support team was fantastic. Justice Airport is my new go-to for all my travel needs.",
      author: "Samantha R.",
      location: "London, UK",
    },
    {
      quote: "I was worried about shipping my fragile cargo internationally, but their team handled everything with extreme care and professionalism. Everything arrived in perfect condition.",
      author: "Michael B.",
      location: "New York, USA",
    },
    {
      quote: "Finally, an airport service that understands technology and customer service. The real-time updates and live chat are game-changers. Highly recommended!",
      author: "Chen L.",
      location: "Singapore",
    },
  ];

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-400">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            We have worked with thousands of amazing people
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="text-center">
                <blockquote className="text-xl font-semibold leading-8 text-white">
                  <p>“{testimonial.quote}”</p>
                </blockquote>
                <figcaption className="mt-8">
                  <div className="mt-1 text-base">
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-gray-400">{testimonial.location}</div>
                  </div>
                </figcaption>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
