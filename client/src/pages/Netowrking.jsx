import React, { useState, useEffect } from 'react';
import { 
  Users, MessageCircle, Award, Globe, Filter, Search, 
  MapPin, Briefcase, Share2, CheckCircle, X
} from 'lucide-react';
import Footer from '../components/Footer';
// Simulated data representing potential connections and mentors
const networkData = [
  {
    id: 1,
    name: "Fatima Ahmed",
    role: "Textile Export Entrepreneur",
    location: "Karachi, Sindh",
    expertise: ["Export Marketing", "Textile Design"],
    mentorAvailable: true,
    connections: 42,
    verifiedSkills: ["International Trade", "Product Development"]
  },
  {
    id: 2,
    name: "Zara Malik",
    role: "Digital Artisan Marketplace Owner",
    location: "Hyderabad, Sindh",
    expertise: ["E-commerce", "Digital Marketing"],
    mentorAvailable: false,
    connections: 28,
    verifiedSkills: ["Social Media Marketing", "Online Sales"]
  },
  {
    id: 3,
    name: "Amina Bhutto",
    role: "Sustainable Handicrafts Founder",
    location: "Sukkur, Sindh",
    expertise: ["Sustainable Business", "Artisan Empowerment"],
    mentorAvailable: true,
    connections: 55,
    verifiedSkills: ["Community Development", "Ethical Business"]
  }
];

// Simulated initial messages for each connection
const initialChats = {
  1: [
    { id: 1, sender: 'Fatima Ahmed', text: 'Hello! Welcome to our professional network.' },
    { id: 2, sender: 'You', text: 'Hi Fatima, I\'m interested in learning more about textile exports.' }
  ],
  2: [
    { id: 1, sender: 'Zara Malik', text: 'Thanks for connecting! How can I help you today?' }
  ],
  3: []
};

const NetworkingPage = () => {
  const [filters, setFilters] = useState({
    location: '',
    expertise: '',
    mentorOnly: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNetwork, setFilteredNetwork] = useState(networkData);

  // Chat state management
  const [activeChatId, setActiveChatId] = useState(null);
  const [chats, setChats] = useState(initialChats);
  const [newMessage, setNewMessage] = useState('');

  // Dynamic filtering logic
  useEffect(() => {
    const results = networkData.filter(profile => {
      const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             profile.role.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !filters.location || 
        profile.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesExpertise = !filters.expertise || 
        profile.expertise.some(exp => 
          exp.toLowerCase().includes(filters.expertise.toLowerCase())
        );
      
      const matchesMentorStatus = !filters.mentorOnly || profile.mentorAvailable;

      return matchesSearch && matchesLocation && matchesExpertise && matchesMentorStatus;
    });

    setFilteredNetwork(results);
  }, [searchTerm, filters]);

  // Function to start a chat
  const startChat = (profileId) => {
    setActiveChatId(profileId);
  };

  // Function to send a message
  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const updatedChats = {
      ...chats,
      [activeChatId]: [
        ...chats[activeChatId],
        {
          id: chats[activeChatId].length + 1,
          sender: 'You',
          text: newMessage
        }
      ]
    };

    // Simulate a response after 1 second
    setChats(updatedChats);
    setNewMessage('');

    // Simulate an auto-response
    setTimeout(() => {
      const profile = networkData.find(p => p.id === activeChatId);
      const autoResponse = [
        `Great message! I'm always happy to discuss ${profile.expertise[0]}.`,
        `I'd be glad to share more about my experience in ${profile.role}.`,
        'Feel free to ask me any questions you might have.'
      ];

      const randomResponse = autoResponse[Math.floor(Math.random() * autoResponse.length)];

      setChats(prevChats => ({
        ...prevChats,
        [activeChatId]: [
          ...prevChats[activeChatId],
          {
            id: prevChats[activeChatId].length + 2,
            sender: profile.name,
            text: randomResponse
          }
        ]
      }));
    }, 1000);
  };

  // Close chat window
  const closeChat = () => {
    setActiveChatId(null);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 font-noto-nastaliq relative">
      <header className="bg-indigo-700 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="mr-3" />  امید | Professional Network
          </h1>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        {/* Search and Filter Section */}
        <div className="mb-8 bg-white shadow-md rounded-lg p-6">
          <div className="flex space-x-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="text"
                placeholder="Search entrepreneurs, skills, locations"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button 
              onClick={() => setFilters(prev => ({...prev, mentorOnly: !prev.mentorOnly}))}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                filters.mentorOnly 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Award size={20} />
              <span>Mentors Only</span>
            </button>
          </div>
        </div>

        {/* Networking Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredNetwork.map(profile => (
            <div 
              key={profile.id} 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    {profile.name}
                    {profile.mentorAvailable && (
                      <CheckCircle 
                        size={20} 
                        className="ml-2 text-green-500" 
                        title="Mentor Available"
                      />
                    )}
                  </h2>
                  <p className="text-gray-600">{profile.role}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startChat(profile.id)}
                    className="bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200"
                  >
                    <MessageCircle size={20} />
                  </button>
                  <button className="bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin size={20} className="mr-2 text-indigo-600" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase size={20} className="mr-2 text-indigo-600" />
                  <span>{profile.connections} Connections</span>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Verified Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.verifiedSkills.map(skill => (
                      <span 
                        key={skill} 
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNetwork.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-xl">
              No entrepreneurs found matching your search criteria.
            </p>
          </div>
        )}
      </main>

      {/* Chat Window */}
      {activeChatId && (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-xl shadow-2xl border">
          <div className="bg-indigo-700 text-white p-4 rounded-t-xl flex justify-between items-center">
            <h3 className="text-lg font-bold">
              {networkData.find(p => p.id === activeChatId).name}
            </h3>
            <button onClick={closeChat} className="hover:bg-indigo-600 p-1 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="p-4 h-80 overflow-y-auto">
            {chats[activeChatId].map(message => (
              <div
                key={message.id}
                className={`mb-3 ${
                  message.sender === 'You'
                    ? 'text-right'
                    : 'text-left'
                }`}
              >
                <span className={`
                  inline-block px-4 py-2 rounded-xl max-w-[80%]
                  ${
                    message.sender === 'You'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }
                `}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default NetworkingPage;