import React from 'react';

export default function About() {
  return (
    <div className="relative w-full h-screen">
          
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>
      <div className="relative z-20 flex flex-col justify-center items-center h-full px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          About Sahand Estate
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-gray-800 leading-relaxed bg-white/60 p-6 rounded-xl shadow-md">
          Sahand Estate is a leading real estate agency that specializes in helping clients buy, sell, 
          and rent properties in the most desirable neighborhoods. Our team of experienced agents is 
          dedicated to providing exceptional service and making the buying and selling process as 
          smooth as possible.
        </p>
        <p className="mt-4 max-w-3xl text-lg text-gray-800 leading-relaxed bg-white/60 p-6 rounded-xl shadow-md">
          Our mission is to help our clients achieve their real estate goals by providing expert advice, 
          personalized service, and a deep understanding of the local market. Whether you are looking to 
          buy, sell, or rent a property, we are here to help you every step of the way.
        </p>
        <p className="mt-4 max-w-3xl text-lg text-gray-800 leading-relaxed bg-white/60 p-6 rounded-xl shadow-md">
          Our team of agents has a wealth of experience and knowledge in the real estate industry, and 
          we are committed to providing the highest level of service to our clients. We believe that 
          buying or selling a property should be an exciting and rewarding experience, and we are 
          dedicated to making that a reality for each and every one of our clients.
        </p>
      </div>
    </div>
  );
}
