import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

import ChevronIcon from '@/icons/ChevronIcon';
import CreditsIcon from '@/icons/CreditsIcon';
import HomeIcon from '@/icons/HomeIcon';
import LogoutIcon from '@/icons/LogoutIcon';
import ProfileIcon from '@/icons/ProfileIcon';
import { useRouter } from 'next/router';

export default function Sidebar({ isMobile }: { isMobile: boolean }): JSX.Element {
  const [open, setOpen] = useState(!isMobile);
  const [display, setDisplay] = useState(true);
  const hiddenRoutes = ['/app/plans'];
  const router = useRouter();
  useEffect(() => setOpen(!isMobile), [isMobile]);

  useEffect(() => {
    setDisplay(!hiddenRoutes.reduce((acc, cur) => acc && router.pathname.startsWith(cur), true));
  }, [router.pathname]);

  if (!display) return <></>;

  const sidebarItems = [
    {
      url: '/app/home',
      label: 'Home Page',
      Icon: HomeIcon,
    },
    {
      url: '/app/profile',
      label: 'My Profile',
      Icon: ProfileIcon,
    },
    {
      url: '/app/credits',
      label: 'Course History',
      Icon: CreditsIcon,
    },
  ];

  return (
    <>
      <div
        className={`${
          open ? 'w-[240px] shrink-0' : 'w-auto'
        } flex h-screen max-h-screen flex-col border-r-[1px] border-r-[#e0e0e0] bg-white  transition-all`}
      >
        {!isMobile && (
          <div
            className={`${open ? 'justify-between' : 'justify-center'} flex h-16 items-center p-4`}
          >
            {open && <h4 className="text-primary-900">Planner</h4>}
            <ChevronIcon
              onClick={() => setOpen(!open)}
              className={`h-4 w-4 cursor-pointer ${!open ? '' : 'rotate-180'}`}
              strokeWidth={2.5}
            />
          </div>
        )}
        <ul className="flex flex-col">
          {sidebarItems.map(({ url, label, Icon }, i) => (
            <Link key={url + i} href={url}>
              <li className="flex cursor-pointer items-center gap-6 px-5 py-3">
                <Icon className="h-6 w-6" />
                {open && <span>{label}</span>}
              </li>
            </Link>
          ))}
        </ul>
        <div className="flex-grow"></div>

        <button
          className="flex items-center  gap-6 px-5 pb-5 align-bottom"
          onClick={() => signOut()}
        >
          <LogoutIcon className="h-6 w-6" />
          {open && <span>Log Out</span>}
        </button>
      </div>
    </>
  );
}
