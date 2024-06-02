import Image from 'next/image'
import logo from '../assets/Isologotipo_UTN.png'
import logoBlanco from '../assets/Isologotipo_UTN_Negativo-removebg-preview (1).png'
import Link from 'next/link'

export default function Header() {
  return (
    <div className="w-full h-auto p-2 shadow" style={{backgroundColor: '#4b1b1b'}}>
      <div className='flex justify-between items-center'>
        <Link href={'/'}>
          <Image className='h-16 w-auto' src={ logoBlanco } alt="UTN"/>
        </Link>
        <div className='flex flex-col items-end pr-1'>
          <h1 className='text-white'>CÁTEDRA DE DISEÑO DE SISTEMAS DE INFORMACIÓN</h1>
          <h1 className='text-white'>UNIVERSIDAD TECNOLÓGICA NACIONAL</h1>
          <h1 className='text-white'>FRC - FRVM</h1>
        </div>
      </div>
    </div>
  )
}
