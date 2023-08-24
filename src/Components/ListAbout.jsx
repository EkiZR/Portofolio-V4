/* import React from 'react';

const experienceData = [
  { title: 'Project 1', years: '2 years experience' },
  { title: 'Project 2', years: '2 years experience' },
  { title: 'Project 3', years: '2 years experience' },
];

const certificateData = [
  { title: 'Certificate 1' },
  { title: 'Certificate 2' },
  { title: 'Certificate 3' },
];

const ListAbout = () => {
  return (
    <div className="py-8 px-4 md:px-8">
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-[32%] mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          <ul>
            {experienceData.map((experience, index) => (
              <li key={index} className="mb-2">
                <span className="mr-2">{experience.title}</span>
                <span className="text-gray-500 text-sm">{experience.years}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="w-full md:w-[32%]">
          <h3 className="text-lg font-semibold mb-2">Certificates</h3>
          <ul>
            {certificateData.map((certificate, index) => (
              <li key={index} className="mb-2">
                {certificate.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListAbout;
 */