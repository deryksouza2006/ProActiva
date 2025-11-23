import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import dev1Image from '../../assets/dev1.jpeg';
import dev2Image from '../../assets/dev2.jpg';
import dev3Image from '../../assets/dev3.jpg';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  rm: string;
  class: string;
  githubUrl: string;
  linkedinUrl: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Deryk de Souza Queiroz",
    role: "Frontend Developer",
    rm: "RM563412",
    class: "1TDSpx",
    githubUrl: "https://github.com/deryksouza2006",
    linkedinUrl: "https://www.linkedin.com/in/deryksouza/",
    image: dev1Image,
  },
  {
    id: 2,
    name: "Vinicius Paschoeto da Silva",
    role: "Data Engineer",
    rm: "RM563089",
    class: "1TDSpx",
    githubUrl: "https://github.com/pasva01",
    linkedinUrl: "https://www.linkedin.com/in/vin%C3%ADcius-paschoeto-785009349/",
    image: dev2Image, // Caminho para a imagem
  },
  {
    id: 3,
    name: "Lucas Gonçalves Viana",
    role: "Backend Developer",
    rm: "RM563254",
    class: "1TDSPX",
    githubUrl: "https://github.com/LucasViana130",
    linkedinUrl: "https://www.linkedin.com/in/lucas-viana-262068367/",
    image: dev3Image, // Caminho para a imagem
  },
  // Adicione mais integrantes conforme necessário
];

const TeamPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Integrantes do Projeto</h1>
        <p className="text-xl text-gray-500">
          Conheça os desenvolvedores por trás do ProActiva
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Imagem do Integrante */}
            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-40 h-40 object-cover rounded-full"
                onError={(e) => {
                  // Fallback caso a imagem não carregue
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback visual caso a imagem não carregue */}
              <div className="hidden w-24 h-24 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h2>
              <p className="text-proactiva-purple font-semibold mb-4">{member.role}</p>

              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p><span className="font-semibold">RM:</span> {member.rm}</p>
                <p><span className="font-semibold">Turma:</span> {member.class}</p>
              </div>

              <div className="flex space-x-4 border-t border-gray-100 pt-4">
                <a 
                  href={member.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-proactiva-purple transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a 
                  href={member.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-proactiva-purple transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;