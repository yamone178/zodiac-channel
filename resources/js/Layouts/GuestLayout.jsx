import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import img from '../../../public/assets/images/5fc93d9665413247148749a0852b5bb5.jpg';

export default function Guest({ children }) {
    return (
        <div className="flex items-center h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
             <div className="hidden w-1/2 h-screen bg-gray-100 lg:block">
                    <img
                    src={img}
                    alt="Registration illustration"
                    
                
                    className="object-cover w-full h-full "
                    />
              </div>


            <div className="flex items-center justify-center w-full p-8 lg:w-1/2">
                {children}
            </div>
        </div>
    );
}
