import NavBeforeLogin from '@/Components/NavBeforeLogin';
import { Link, Head } from '@inertiajs/react';
import { TbZodiacAquarius, TbZodiacAries, TbZodiacCancer, TbZodiacCapricorn, TbZodiacGemini, TbZodiacLeo, TbZodiacLibra, TbZodiacPisces, TbZodiacSagittarius, TbZodiacScorpio, TbZodiacTaurus, TbZodiacVirgo } from 'react-icons/tb';

export default function Welcome({ heroImg, auth, logoImg }) {

  const signs = [
    {
      id: 1,
      icon: <TbZodiacAries />,
      name: 'Aries',
      date: 'March 21 - April 19',

    },
    {
      id: 2,
      icon: <TbZodiacTaurus />,
      name: 'Taurus',
      date: 'April 20 - May 20',
    },
    {
      id: 3,
      icon: <TbZodiacGemini />,
      name: 'Gemini',
      date: 'May 21 - June 20',
    },
    {
      id: 4,
      icon: <TbZodiacCancer />,
      name: 'Cancer',
      date: 'June 21 - July 22',
    },
    {
      id: 5,
      icon: <TbZodiacLeo />,
      name: 'Leo',
      date: 'July 23 - August 22',
    },
    {
      id: 6,
      icon: <TbZodiacVirgo />,
      name: 'Virgo',
      date: 'August 23 - September 22',
    },
    {
      id: 7,
      icon: <TbZodiacLibra />,
      name: 'Libra',
      date: 'September 23 - October 22',
    },
    {
      id: 8,
      icon: <TbZodiacScorpio />,
      name: 'Scorpio',
      date: 'October 23 - November 21',
    },
    {
      id: 9,
      icon: <TbZodiacSagittarius />,
      name: 'Sagittarius',
      date: 'November 22 - December 21',
    },
    {
      id: 10,
      icon: <TbZodiacCapricorn />,
      name: 'Capricorn',
      date: 'December 22 - January 19',
    },
    {
      id: 11,
      icon: <TbZodiacAquarius />,
      name: 'Aquarius',
      date: 'January 20 - February 18',
    },
    {
      id: 12,
      icon: <TbZodiacPisces />,
      name: 'Pisces',
      date: 'February 19 - March 20',
    }
  ]

  return (
    <>
      <NavBeforeLogin />

      <div className="flex flex-col md:flex-row justify-between bg-gradient-to-b from-black/95 to-purple-950 px-[30px] md:px-[80px] items-center py-[50px] lg:py-[0px]">

        <div className=" w-full lg:w-[600px] text-white">
          <h2 className='mb-5 text-4xl '>Welcome to the Zodiac Channel </h2>
          <p className='mb-5 text-lg text-justify'>
            Join a vibrant community of astrology enthusiasts! Share insights, exchange ideas, and discover how the stars align in your life. Connect, communicate, and let the universe inspire meaningful conversations.              </p>
          <button>
            <Link href="/register" className='px-5 py-2 text-black bg-white rounded-md'>Join Now</Link>
          </button>
        </div>

        <div className=" hidden lg:block w-[500px] py-[60px] px-10">
          <img src={heroImg} alt="" className='w-full' />
        </div>


      </div>

      <section className='py-10 text-black bg-gradient-to-b px-[20px] md:px-[80px] '>
        <h2 className='mb-8 text-2xl font-bold text-center text-purple-950'>Check your Zodiac</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {
            signs.map((sign) => (
              <div key={sign.id} className='flex w-[160px] md:w-[250px] mx-auto flex-col items-center gap-5 p-6 text-black rounded-lg bg-purple-950/35'>
                <p className='flex font-bold items-center justify-center w-10 h-10 text-black rounded-full text-[50px]'>
                  {sign.icon}
                </p>
                <div>
                  <h3 className='text-xl font-bold text-center'>{sign.name}</h3>
                  <p className='text-sm text-center'>{sign.date}</p>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      <section className=' py-3 text-white bg-black/95 px-[80px]'>
        <div>
          <p className='text-center '>Copyright &copy; 2025 Zodiac-Channel </p>
        </div>
      </section>
    </>
  );
}
