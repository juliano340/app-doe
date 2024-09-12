import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  // Se o usuário estiver logado, redireciona para a página de doação
  if (session) {
    router.push('/doe');
    return null;
  }

  // Se o usuário não estiver logado, exibe o botão de login
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Junte-se a nós e faça a diferença!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Sua contribuição pode transformar vidas. Ao doar para nossa ONG, você ajuda a financiar projetos que impactam diretamente nossa comunidade. 
          <strong> Faça o login</strong> para apoiar essa causa e garantir que possamos continuar esse trabalho.
        </p>
        <p className="text-gray-700 text-lg mb-6">
          Ao se conectar, você terá a oportunidade de fazer uma doação de qualquer valor. Cada gesto de solidariedade conta e ajuda a construir um futuro melhor.
        </p>
        <button
          onClick={() => signIn()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg"
        >
          Entrar com Google
        </button>
        <p className="text-gray-500 text-sm mt-4">
          Não leva mais do que alguns segundos para começar a fazer a diferença!
        </p>
      </div>
    </div>
  );
}
