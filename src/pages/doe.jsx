import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSignOutAlt } from 'react-icons/fa'; // Biblioteca de ícones

export default function Donate() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Redireciona para a página de login se o usuário não estiver autenticado
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    // Mostra um loader ou mensagem enquanto a sessão está sendo carregada
    return <div>Carregando...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Você precisa estar logado para doar</h1>
          <button
            onClick={() => signIn()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg"
          >
            Entrar com Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Ícone de logout no topo */}
      <button 
        onClick={() => signOut()}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
      >
        <FaSignOutAlt className="w-6 h-6" />
      </button>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex flex-col items-center mb-6">
          {/* Exibe a foto do usuário */}
          <img 
            src={session.user.image} 
            alt={`${session.user.name}'s profile`} 
            className="rounded-full w-24 h-24 mb-4 shadow-lg"
          />
          <h1 className="text-2xl font-bold">Olá, {session.user.name}!</h1>
        </div>

        <p className="text-gray-700 text-lg mb-6">
          Contribua com o valor que desejar e ajude nossa causa. Clique no botão abaixo para doar!
        </p>

        <button 
          onClick={() => window.location.href = 'https://link.mercadopago.com.br/juliano340'}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Doar Qualquer Valor
        </button>

        <p className="text-gray-500 text-sm mt-4">
          Você será redirecionado ao Mercado Pago para concluir a doação.
        </p>
      </div>
    </div>
  );
}
