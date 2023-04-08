import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { user } from '@/interfaces/user';
import { UserProfile } from 'leetcode-query';
import Table from '@/components/LeetCodeTable';
import { LandingPage } from '@/components/LandingPage';
import ActiveDaysTable from '@/components/ActiveDaysTable';
const inter = Inter({ subsets: ['latin'] })

export const dynamic = "force-dynamic";
export default async function Home() {
  return (
    <main className='flex w-full flex-col align-middle justify-center'>
      <LandingPage />
      <Table/>
      <ActiveDaysTable/>
    </main>
  )
}
