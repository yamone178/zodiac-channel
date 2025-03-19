import img from '../../../public/assets/images/bg3.jpg';

export default function Guest({ children }) {
    return (
        <div className="flex items-center h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
             <div className="hidden w-1/2 h-screen bg-gray-100 lg:block">
                    <img
                    src={img}
                    alt="Registration illustration opacity-25"
                    
                
                    className="object-cover w-full h-full "
                    />
              </div>


            <div className="flex items-center justify-center w-full p-8 lg:w-1/2">
                {children}
            </div>
        </div>
    );
}
