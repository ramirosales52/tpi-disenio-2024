import Link from "next/link";
import { Button } from 'antd';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className='flex flex-col justify-between items-center min-h-screen'>
      <Header />
      <Link href="/generar-ranking">
        <div className='flex flex-col items-center justify-center w-64 h-80 bg-slate-50 border border-b-4 rounded-lg shadow hover:border-red-950 transition'>
          <div className='flex items-center justify-center h-full w-full border-b-2'>
              <DocumentTextIcon className="size-24"/>
          </div>
          <div className='flex justify-center items-center p-2'>
              <h5>Generar Ranking de Vinos</h5>
          </div>
        </div>
      </Link>
      <Footer />
    </main>
  );
}
