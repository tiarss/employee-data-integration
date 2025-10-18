import { useEffect, useState } from 'react'
import { Modal } from './components/modal'
import { Button } from './components/button'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from './service/user'
import FormAdd from './module/form-add/form-add'
import 'react-toastify/dist/ReactToastify.css'
import WebView from './module/web-view'
import MobileView from './module/mobile-view'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const userData = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUsers()
  })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="p-8">
        <div className='flex justify-between pb-8 border-b-2 border-gray-200'>
          <div>
            <h1 className='text-2xl font-bold'>
              Employee Management
            </h1>
            <p className='text-sm text-gray-500'>
              Current roster of all active personel and teams
            </p>
          </div>
          <Button size='small' onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
        </div>

        {userData.isLoading ? <p>Loading...</p> :
          isMobile ? <MobileView userData={userData.data?.data || []} /> : <WebView userData={userData.data?.data || []} />
        }
      </div>
      {isModalOpen &&
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Employee"
        >
          <FormAdd onSubmit={() => setIsModalOpen(false)} />
        </Modal>
      }
    </>
  )
}

export default App
