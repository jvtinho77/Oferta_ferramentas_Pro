import React from 'react';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Premium Tools</h3>
            <p className="text-gray-400 mb-4">
              Acesso a mais de 500 ferramentas premium em um único lugar.
            </p>
            <div className="flex items-center gap-2 text-green-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Garantia de 7 dias</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links Importantes</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Política de Reembolso</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Suporte</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Design & Criação</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Vídeo & Áudio</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Produtividade</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Marketing Digital</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contato@premiumtools.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+55 (11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Premium Tools. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-400">
                Pagamento 100% seguro • SSL Criptografado
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;