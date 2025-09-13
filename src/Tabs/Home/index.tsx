import { Button, Header } from 'react-aria-components'
import { useState } from 'react'
import { HiOutlineBolt } from 'react-icons/hi2'
import { IoPersonOutline, IoEnterOutline } from 'react-icons/io5'
import { LiaHomeSolid } from 'react-icons/lia'
import { HomePage } from './HomePage'
import { ProfilePage } from './ProfilePage'
import { useAuth } from '../../utils/AuthContext'
//import { BsFillShareFill } from "react-icons/bs";
//import { LiaHeart } from "react-icons/lia";
//import { LiaHeartSolid } from "react-icons/lia";

export const Home = () => {
  const [activePage, setActivePage] = useState<'home' | 'profile'>('home')
  const { logoutUser } = useAuth()

  return (
    <div className="bg-gradient-to-br from-amber-100 via-blue-100 to-amber-200 min-h-screen">
      <Header className="flex flex-row p-6 sticky top-0 bg-gradient-to-tr from-amber-100/70 via-blue-100/70 to-amber-100/70 shadow-md z-10 justify-between">
        <div className="inline-flex">
          <div className="p-1 rounded-full bg-gradient-to-b mr-2 from-orange-200 via-orange-300 to-amber-300">
            <HiOutlineBolt
              className="text-3xl text-amber-500"
              aria-hidden="true"
            />
          </div>
          <h2 className="bg-gradient-to-b from-orange-500 to-amber-400 bg-clip-text text-transparent text-3xl font-bold">
            PokeVista
          </h2>
        </div>

        <nav className="inline-flex items-center">
          <ul className="flex flex-row gap-4">
            <li>
              <Button
                onPress={() => setActivePage('home')}
                className={`text-base font-semibold px-6 py-2 rounded-full transition-transform ${
                  activePage === 'home'
                    ? 'bg-gradient-to-br from-orange-400 w-full to-amber-300 text-white scale-105'
                    : 'hover:scale-110'
                }`}
              >
                <LiaHomeSolid className="inline text-xl mr-2 mb-1" />
                Home
              </Button>
            </li>
            <li className="border-r pr-6">
              <Button
                onPress={() => setActivePage('profile')}
                className={`text-base font-semibold px-6 py-2 rounded-full transition-transform ${
                  activePage === 'profile'
                    ? 'bg-gradient-to-br from-orange-400 w-full to-amber-300 text-white scale-105'
                    : 'hover:scale-110'
                }`}
              >
                <IoPersonOutline className="inline text-lg mr-2 mb-1" />
                Profile
              </Button>
            </li>
            <li className="px-5">
              <Button
                onClick={logoutUser}
                name="SignOut"
                type="button"
                className="px-5 py-1.5 bg-gradient-to-br from-red-600 rounded-full w-full to-red-300 hover:scale-110 cursor-pointer text-base font-semibold text-white"
              >
                <IoEnterOutline className="inline text-2xl mb-1 mr-2" />
                Sign Out
              </Button>
            </li>
          </ul>
        </nav>
      </Header>

      <main className="p-8">
        {activePage === 'home' && <HomePage />}
        {activePage === 'profile' && <ProfilePage />}
      </main>
    </div>
  )
}
