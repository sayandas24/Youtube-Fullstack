import React from 'react'
import Sidebar from '../Layout/Sidebar'
import BasicButton from '../UI/BasicButton'

function ProfileDashboard() {
  return (
    <div className='flex w-full'>
      <Sidebar/>

      <main className='flex gap-5 border border-red-600 flex-col w-[85rem] mx-auto'>
        <section className='w-full'>
            <div className='w-full rounded-xl border border-blue-500 h-[15rem] overflow-hidden'>
                <img src="" alt="" />
            </div>
        </section>
        <section>
            <div className='border flex gap-2'>
                <section className='left border w-[10rem] h-[10rem] rounded-full overflow-hidden'>
                    <img src="" alt="" />
                </section>
                <section className='right'>
                    <h1>Sayn das</h1>
                    <p>
                        <span>username</span>
                        <span>subscribers</span>
                    </p>          
                    <p>About</p>
                    <div className='flex gap-2 items-center'>
                        <BasicButton text={"Edit Profile" }/>
                        <BasicButton text={"Change Password" }/>
                    </div>
                </section>
            </div>
        </section>
        <section></section>
        <section></section>
      </main>
    </div>
  )
}

export default ProfileDashboard
